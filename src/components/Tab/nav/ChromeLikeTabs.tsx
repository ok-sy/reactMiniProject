// src/components/Tab/nav/ChromeLikeTabs.tsx
'use client';

/**
 * ChromeLikeTabs
 * - 크롬 느낌의 탭 UX:
 *    1) 탭 라벨 드래그로 순서 변경
 *    2) 탭 라벨을 상단 DropZone으로 드래그&드롭 → 모달(Dialog)로 "떼어내기"
 *    3) 모달에서 "다시 붙이기" 버튼 → 원래 탭바로 복귀
 *
 * 핵심 React 포인트
 * - items: 탭바에 붙어있는 탭 목록 (Controlled Tabs)
 * - activeId: 현재 활성 탭 id (MUI Tabs value)
 * - detached: 모달로 분리된 탭 목록 (여러 개 허용)
 * - DnD: dnd-kit의 DndContext + SortableContext + useSortable
 * - DropZone: 드랍 위치가 'DETACH_ZONE'이면 모달로 이동
 */

import { useMemo, useState } from 'react';
import {
    Box, Tabs, Tab, IconButton, Tooltip, Typography, Stack,
    Dialog, DialogTitle, DialogContent, DialogActions, Button, useTheme, alpha
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TabIcon from '@mui/icons-material/Tab';
import CloseIcon from '@mui/icons-material/Close';

import {
    DndContext, DragEndEvent, PointerSensor, useSensor, useSensors,
    closestCenter, KeyboardSensor, DragOverEvent, DragStartEvent, useDroppable
} from '@dnd-kit/core';
import {
    SortableContext, useSortable, arrayMove, sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';


/** 탭 데이터 타입 */
export type TabItem = {
    id: string;              // 고유 ID (정렬/식별용, 변경 금지)
    label: string;           // 라벨
    content: React.ReactNode;// 콘텐츠(탭 본문)
};

/** 모달로 분리된 탭 구조 */
type Detached = {
    id: string;
    label: string;
    content: React.ReactNode;
    open: boolean;           // 모달 열림 상태
};

/** DropZone의 가상 id */
const DETACH_ZONE_ID = 'DETACH_ZONE';

type Props = {
    initialItems: TabItem[];
    initialActiveId?: string;
    storageKey?: string;     // 탭 순서 로컬 저장 키
};

export default function ChromeLikeTabs({
    initialItems,
    initialActiveId,
    storageKey = 'chrome-like-tabs'
}: Props) {
    /** 1) 탭 목록 상태 (초기 순서 복원 로직 포함 가능) */
    const [items, setItems] = useState<TabItem[]>(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (raw) {
                const order: string[] = JSON.parse(raw);
                const map = new Map(initialItems.map(i => [i.id, i]));
                const restored: TabItem[] = [];
                order.forEach(id => { const it = map.get(id); if (it) restored.push(it); map.delete(id); });
                return restored.concat([...map.values()]); // 신규 탭은 뒤에
            }
        } catch { }
        return initialItems;
    });

    /** 2) 활성 탭 id (Controlled Tabs의 value) */
    const [activeId, setActiveId] = useState<string>(initialActiveId ?? (initialItems[0]?.id ?? ''));

    /** 3) 모달로 분리된 탭 목록 (여러 개 허용) */
    const [detached, setDetached] = useState<Detached[]>([]);

    /** 4) DnD 센서: 포인터 + 키보드 (접근성) */
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    /** 5) 정렬 가능한 id 리스트 (dnd-kit가 필요로 함) */
    const ids = useMemo(() => items.map(i => i.id), [items]);

    /** 6) 드래그 상태에 따라 상단 DropZone 강조 (선택적 피드백용) */
    const [dragging, setDragging] = useState(false);

    /** 7) 탭 선택 핸들러 */
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        console.log('Tab changed:', newValue);
        setActiveId(newValue);   // 새 탭 id를 state에 반영
    };
    /** 8) 드래그 시작/오버/끝 이벤트 */
    const onDragStart = (_e: DragStartEvent) => setDragging(true);

    const onDragOver = (_e: DragOverEvent) => {
        // 필요 시 over.id 체크하여 DropZone 위인지 상태로 표현 가능
    };

    const onDragEnd = (e: DragEndEvent) => {
        setDragging(false);
        const { active, over } = e;
        if (!over) return;

        // A) 상단 DropZone이면 → 모달로 떼어내기
        if (over.id === DETACH_ZONE_ID) {
            detachTabToModal(String(active.id));
            return;
        }

        // B) 일반 정렬: 위치 변경
        if (active.id !== over.id) {
            const oldIndex = items.findIndex(i => i.id === active.id);
            const newIndex = items.findIndex(i => i.id === over.id);
            if (oldIndex >= 0 && newIndex >= 0) {
                const next = arrayMove(items, oldIndex, newIndex);
                setItems(next);
                try { localStorage.setItem(storageKey, JSON.stringify(next.map(i => i.id))); } catch { }
            }
        }
    };
    /** 9) 버튼으로 모달로 떼기 */
    const detachTabToModal = (id: string) => {
        const tab = items.find(i => i.id === id);
        if (!tab) return;

        // 탭바에서 제거
        setItems(prev => prev.filter(i => i.id !== id));

        // 활성 탭이었으면 보정
        if (activeId === id) {
            const rest = items.filter(i => i.id !== id);
            setActiveId(rest[0]?.id ?? '');
        }

        // 모달 추가
        setDetached(prev => [...prev, { id: tab.id, label: tab.label, content: tab.content, open: true }]);
    };

    /** 10) 모달에서 다시 붙이기 */
    const dockFromModal = (id: string) => {
        const d = detached.find(x => x.id === id);
        if (!d) return;
        setItems(prev => {
            const exists = prev.some(i => i.id === id);
            return exists ? prev : [...prev, { id: d.id, label: d.label, content: d.content }];
        });
        setActiveId(id);
        setDetached(prev => prev.filter(x => x.id !== id)); // 모달 제거
    };

    /** 11) 모달 닫기(완전 제거) */
    const closeModalOnly = (id: string) => {
        setDetached(prev => prev.filter(x => x.id !== id));
    };

    return (
        <Box>
            {/* 상단 드롭존: 드래그 중일 때 시각적 강조 → 여기에 드롭하면 모달로 분리 */}
            <DetachDropZone active={dragging} />

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                modifiers={[restrictToHorizontalAxis]} // 가로 드래그 제한
            >
                {/* SortableContext: 정렬 가능한 항목 id 배열 제공 */}
                <SortableContext items={ids}>
                    <Tabs
                        value={activeId}
                        onChange={(_, v) => setActiveId(String(v))}
                        variant="scrollable"
                        scrollButtons="auto"
                    >
                        {items.map(it => (
                            <SortableTabLabel
                                key={it.id}
                                id={it.id}
                                label={it.label}
                                selected={activeId === it.id}
                                onActivate={(id) => setActiveId(id)}          // ✅ 아이콘 눌러도 활성화 보장
                                onDetach={() => detachTabToModal(it.id)}      // 원하는 액션(모달로 떼기 등)
                            />
                        ))}
                    </Tabs>
                </SortableContext>

                {/* 실제 DropZone 타겟 (보이지 않는 드랍 타겟) */}
                <DropTarget id={DETACH_ZONE_ID} />
            </DndContext>

            {/* 탭 본문: 활성 탭만 렌더 */}
            <Box role="tabpanel" sx={{ mt: 1 }}>
                {items.find(i => i.id === activeId)?.content ?? (
                    <Typography color="text.secondary">선택된 탭이 없습니다.</Typography>
                )}
            </Box>

            {/* 떼어진 탭들(모달 여러 개 허용) */}
            {detached.map(d => (
                <Dialog
                    key={d.id}
                    open={d.open}
                    onClose={(_, reason) => {
                        if (reason === 'backdropClick') {
                            // ⬅️ 모달 바깥쪽 클릭 시: 닫기 X, 탭바로 복귀(도킹)
                            dockFromModal(d.id);
                            return;
                        }
                        // ESC 등 다른 경우엔 기존처럼 닫기 동작 유지(원하면 여기도 도킹으로 바꿔도 됨)
                        closeModalOnly(d.id);
                    }}
                    fullWidth
                    maxWidth="lg"
                >

                    <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TabIcon fontSize="small" />
                        <Typography variant="subtitle1" fontWeight={700} sx={{ flex: 1 }}>{d.label}</Typography>
                        <Stack direction="row" spacing={1}>
                            <Button size="small" variant="outlined" onClick={() => dockFromModal(d.id)}>
                                다시 붙이기
                            </Button>
                            <IconButton size="small" onClick={() => closeModalOnly(d.id)}>
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Stack>
                    </DialogTitle>
                    <DialogContent dividers sx={{ bgcolor: '#fff' }}>
                        {d.content}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => dockFromModal(d.id)}>다시 붙이기</Button>
                        <Button color="error" onClick={() => closeModalOnly(d.id)}>닫기</Button>
                    </DialogActions>
                </Dialog>
            ))}
        </Box>
    );
}

/** 드래그 가능한 탭 라벨 (정렬 + 아이콘으로 분리) */
function SortableTabLabel({
    id, label, selected, onActivate, onDetach,
}: {
    id: string;
    label: string;
    selected: boolean;
    onActivate: (id: string) => void;
    onDetach: () => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.7 : 1,
    };

    return (
        <Tab
            ref={setNodeRef}
            value={id}                 // Tabs.value와 동일한 문자열
            // aria-selected는 굳이 수동 지정 불필요 (MUI가 알아서)
            style={style}
            onClick={() => onActivate(id)} // 클릭 시 활성화
            sx={{ minHeight: 40 }}
            // ⛔️ 여기엔 더 이상 {...attributes} {...listeners} 넣지 않음!
            label={
                <Stack direction="row" alignItems="center" gap={1}>
                    {/* 드래그 핸들: 여기만 dnd-listeners 부착 */}
                    <span
                        {...attributes}
                        {...listeners}
                        style={{ display: 'inline-flex', cursor: 'grab' }}
                        aria-label="drag-handle"
                    >
                        {/* 원하면 DragIndicator 아이콘 사용 */}
                        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
                            <circle cx="9" cy="7" r="1" /><circle cx="9" cy="12" r="1" /><circle cx="9" cy="17" r="1" />
                            <circle cx="15" cy="7" r="1" /><circle cx="15" cy="12" r="1" /><circle cx="15" cy="17" r="1" />
                        </svg>
                    </span>

                    {/* 탭 라벨: 클릭하면 Tabs.onChange가 정상 실행 */}
                    <span style={{ pointerEvents: 'auto' }}>{label}</span>

                    {/* 모달 아이콘: 활성화 후 분리 */}
                    <IconButton
                        size="small"
                        onClick={(e) => {
                            // 탭 변경 → 모달로 분리 순서 유지
                            onActivate(id);
                            onDetach();
                            e.stopPropagation(); // (선택) 아이콘 클릭이 탭 선택 이벤트와 섞이지 않게
                        }}
                    >
                        <OpenInNewIcon fontSize="inherit" />
                    </IconButton>
                </Stack>
            }
        />
    );
}

/** 상단 시각적 DropZone (드래그 중일 때만 강조) */
function DetachDropZone({ active }: { active: boolean }) {
    const theme = useTheme();
    return (
        <Box
            sx={{
                height: 8,
                borderRadius: 4,
                mx: 1,
                mb: 0.5,
                transition: 'all .15s ease',
                background: active
                    ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.4)}, ${alpha(theme.palette.secondary.main, 0.4)})`
                    : alpha(theme.palette.text.disabled, 0.2),
            }}
            aria-hidden
        />
    );
}

/**
 * 드랍 타겟: 실제로는 보이지 않지만 DnD의 over 판정을 위해 필요
 * - position: fixed 로 상단 얇은 영역을 타겟으로 둔다.
 * - id는 DETACH_ZONE_ID여야 위 onDragEnd에서 식별 가능
 */

function DropTarget({ id }: { id: string }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <Box
            ref={setNodeRef}                           // ✅ 이 DOM을 Droppable로 인식
            sx={{
                position: 'fixed', top: 0, left: 0, right: 0,
                height: 24, zIndex: 1,
                pointerEvents: 'none',                   // 드래그 판정엔 문제 없음
            }}
        />
    );
}
