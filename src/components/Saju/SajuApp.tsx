/**
 * SajuApp.tsx — 사주(연/월/일/시 일부) + 오행/십신 분포 MVP
 * - 정확한 월주는 절기(24절기) 경계가 필요합니다. 현재는 임시: 양력월→지지(寅~丑) 매핑만 제공합니다(표시용).
 * - 연주: 입춘 고려 없이 단순 (year-4) 모듈러. 실사용 시 입춘(대개 2/3~5) 이전 출생은 전년도 처리 필요.
 * - 일주: JDN 기준 갑자(1984-02-02)로부터 60간지 인덱스 계산.
 * - 시주: 일간에 따른 子시 간 시작표 + 2시간 단위 지지.
 * - 십신: 일간 기준 오행 상생/상극 + 음양 동일/상이로 판정.
 *
 * TODO(정밀화):
 *  - 절기(입춘/입절) 시각 테이블 연결하여 연/월주 정확화
 *  - 대운 시작연령(절기까지 경과 일수 기반) 및 세운/월운/일운
 */
import React, { useMemo, useState } from "react";
import {
  Box, Card, CardHeader, CardContent, Grid, TextField,
  Typography, Divider, Stack, Paper, Chip, Tooltip, Button
} from "@mui/material";

// -------------------- Types & Tables --------------------
type StemIdx = 0|1|2|3|4|5|6|7|8|9;     // 甲..癸
type BranchIdx = 0|1|2|3|4|5|6|7|8|9|10|11; // 子..亥
type YinYang = "yang" | "yin";
type Element = "wood" | "fire" | "earth" | "metal" | "water";

const STEMS: ReadonlyArray<{ch:string; el:Element; yy:YinYang}> = [
  { ch: "甲", el: "wood", yy: "yang" }, // 0
  { ch: "乙", el: "wood", yy: "yin"  }, // 1
  { ch: "丙", el: "fire", yy: "yang" }, // 2
  { ch: "丁", el: "fire", yy: "yin"  }, // 3
  { ch: "戊", el: "earth",yy: "yang" }, // 4
  { ch: "己", el: "earth",yy: "yin"  }, // 5
  { ch: "庚", el: "metal",yy: "yang" }, // 6
  { ch: "辛", el: "metal",yy: "yin"  }, // 7
  { ch: "壬", el: "water",yy: "yang" }, // 8
  { ch: "癸", el: "water",yy: "yin"  }, // 9
];

const BRANCHES: ReadonlyArray<{ch:string; el:Element; hidden:StemIdx[]}> = [
  { ch: "子", el: "water", hidden: [9] },      // 癸
  { ch: "丑", el: "earth", hidden: [5,9,7] },  // 己癸辛
  { ch: "寅", el: "wood",  hidden: [0,2,4] },  // 甲丙戊
  { ch: "卯", el: "wood",  hidden: [1] },      // 乙
  { ch: "辰", el: "earth", hidden: [4,1,9] },  // 戊乙癸
  { ch: "巳", el: "fire",  hidden: [2,6,4] },  // 丙庚戊
  { ch: "午", el: "fire",  hidden: [3,5] },    // 丁己
  { ch: "未", el: "earth", hidden: [5,3,1] },  // 己丁乙
  { ch: "申", el: "metal", hidden: [6,8,4] },  // 庚壬戊
  { ch: "酉", el: "metal", hidden: [7] },      // 辛
  { ch: "戌", el: "earth", hidden: [4,7,3] },  // 戊辛丁
  { ch: "亥", el: "water", hidden: [8,0] },    // 壬甲
];

// 월지 임시 매핑(절입 미고려): 1월=寅, 2=卯 ... 12=丑
const GREGORIAN_MONTH_TO_BRANCH: BranchIdx[] = [2,3,4,5,6,7,8,9,10,11,0,1];

// 시지: 23~01 子, 01~03 丑, ... 21~23 亥
const HOUR_TO_BRANCH: BranchIdx[] = [
  0,0, // 00,01 -> 子 (실제는 23~00이 子지만 단순화: 00~01 also 子)
  1,1, // 02,03 -> 丑
  2,2, // 04,05 -> 寅
  3,3, // 06,07 -> 卯
  4,4, // 08,09 -> 辰
  5,5, // 10,11 -> 巳
  6,6, // 12,13 -> 午
  7,7, // 14,15 -> 未
  8,8, // 16,17 -> 申
  9,9, // 18,19 -> 酉
  10,10, // 20,21 -> 戌
  11,11  // 22,23 -> 亥
];

// 일간별 子시의 천간 시작 (전통 규칙)
// 甲己→甲, 乙庚→丙, 丙辛→戊, 丁壬→庚, 戊癸→壬
const HOUR_STEM_START_BY_DAY_STEM: Record<StemIdx, StemIdx> = {
  0:0, 5:0,   // 甲/己
  1:2, 6:2,   // 乙/庚
  2:4, 7:4,   // 丙/辛
  3:6, 8:6,   // 丁/壬
  4:8, 9:8    // 戊/癸
} as any;

// 십신 레이블
type TenGod =
 | "비견" | "겁재"
 | "식신" | "상관"
 | "편재" | "정재"
 | "편관" | "정관"
 | "편인" | "정인";

// 오행 상생/상극 규칙
function generates(a: Element, b: Element) {
  return (
    (a==="wood"  && b==="fire") ||
    (a==="fire"  && b==="earth") ||
    (a==="earth" && b==="metal") ||
    (a==="metal" && b==="water") ||
    (a==="water" && b==="wood")
  );
}
function overcomes(a: Element, b: Element) {
  return (
    (a==="wood"  && b==="earth") ||
    (a==="fire"  && b==="metal") ||
    (a==="earth" && b==="water") ||
    (a==="metal" && b==="wood") ||
    (a==="water" && b==="fire")
  );
}

// -------------------- Core Calc --------------------
// Gregorian → JDN
function toJDN(y:number,m:number,d:number):number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}
const JDN_BASE = toJDN(1984,2,2); // 갑자일 기준

function getYearPillar(year:number) {
  const stem = ((year - 4) % 10 + 10) % 10 as StemIdx;
  const branch = ((year - 4) % 12 + 12) % 12 as BranchIdx;
  return { stem, branch };
}
function getDayPillar(y:number,m:number,d:number) {
  const jdn = toJDN(y,m,d);
  const idx = ((jdn - JDN_BASE) % 60 + 60) % 60;
  const stem = (idx % 10) as StemIdx;
  const branch = (idx % 12) as BranchIdx;
  return { stem, branch };
}
// 임시 월주(절입 미고려): 지지만 매핑, 월간은 연간에서 파생하는 정식 룰이 있으나 여기선 표시용으로 생략
function getMonthBranch(gMonth:number): BranchIdx {
  return GREGORIAN_MONTH_TO_BRANCH[gMonth - 1];
}
// 시주
function getHourPillar(hour:number, dayStem:StemIdx) {
  const b = HOUR_TO_BRANCH[Math.max(0,Math.min(23,hour))];
  const startStem = HOUR_STEM_START_BY_DAY_STEM[dayStem];
  const stem = ((startStem + b) % 10) as StemIdx;
  return { stem, branch: b };
}

// 십신 판정(일간 vs 타 간)
function tenGodOf(dayStem:StemIdx, otherStem:StemIdx): TenGod {
  const d = STEMS[dayStem], o = STEMS[otherStem];
  if (d.el === o.el) {
    return (d.yy === o.yy) ? "비견" : "겁재";
  }
  if (generates(d.el, o.el)) {
    return (d.yy === o.yy) ? "식신" : "상관";
  }
  if (generates(o.el, d.el)) {
    return (d.yy === o.yy) ? "정인" : "편인";
  }
  if (overcomes(d.el, o.el)) {
    return (d.yy === o.yy) ? "정재" : "편재";
  }
  if (overcomes(o.el, d.el)) {
    return (d.yy === o.yy) ? "정관" : "편관";
  }
  // 이론상 모든 관계가 위에 걸림
  return "비견";
}

// -------------------- UI Helpers --------------------
function PillarView({title, stem, branch}: {title:string; stem:StemIdx; branch:BranchIdx}) {
  return (
    <Paper variant="outlined" sx={{p:1.25}}>
      <Typography variant="overline">{title}</Typography>
      <Typography variant="h5" fontWeight={700}>{STEMS[stem].ch}{BRANCHES[branch].ch}</Typography>
      <Typography variant="body2">{STEMS[stem].el} · {STEMS[stem].yy}</Typography>
      <Typography variant="body2">장간: {BRANCHES[branch].hidden.map(h=>STEMS[h].ch).join(" ")}</Typography>
    </Paper>
  );
}

function CountChips({title, counts}:{title:string; counts:Record<string, number>}){
  return (
    <Paper variant="outlined" sx={{p:1}}>
      <Typography variant="subtitle2" gutterBottom>{title}</Typography>
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {Object.entries(counts).map(([k,v])=> (
          <Chip key={k} label={`${k} ${v}`} />
        ))}
      </Stack>
    </Paper>
  );
}

// -------------------- Page --------------------
export default function SajuApp(){
  const [date, setDate] = useState("1994-07-15"); // YYYY-MM-DD
  const [time, setTime] = useState("14:30");      // HH:mm (로컬시간, KST 등)
  const [note, setNote] = useState("※ 월주는 절기 미반영(표시용). 실사용 시 절기 테이블 연결 권장.");

  const data = useMemo(()=>{
    const [y,m,d] = date.split("-").map(Number);
    const [hh] = time.split(":").map(Number);

    const yearP = getYearPillar(y);
    const dayP  = getDayPillar(y,m,d);
    const hourP = getHourPillar(hh, dayP.stem);
    const monthB = getMonthBranch(m);

    // 십신/오행 집계(천간 + 각 지지의 장간 포함)
    const stems: StemIdx[] = [yearP.stem, dayP.stem, hourP.stem];
    // 월간은 생략, 장간까지 포함
    const hiddenStems: StemIdx[] = [
      ...BRANCHES[yearP.branch].hidden,
      ...BRANCHES[monthB].hidden,
      ...BRANCHES[dayP.branch].hidden,
      ...BRANCHES[hourP.branch].hidden,
    ];

    const tenGodCounts: Record<TenGod, number> = {
      비견:0, 겁재:0, 식신:0, 상관:0, 편재:0, 정재:0, 편관:0, 정관:0, 편인:0, 정인:0
    };
    const elemCounts: Record<Element, number> = {
      wood:0, fire:0, earth:0, metal:0, water:0
    };

    // 천간들 십신/오행 집계
    stems.forEach(s => {
      if (s !== dayP.stem) {
        const tg = tenGodOf(dayP.stem, s);
        tenGodCounts[tg]++;
      }
      elemCounts[STEMS[s].el]++;
    });
    // 장간들 십신/오행 집계
    hiddenStems.forEach(s => {
      const tg = tenGodOf(dayP.stem, s);
      tenGodCounts[tg]++;
      elemCounts[STEMS[s].el]++;
    });

    return {
      yearP, dayP, hourP, monthB,
      tenGodCounts, elemCounts
    };
  }, [date, time]);

  return (
    <Box p={3} maxWidth={1000} mx="auto">
      <Card>
        <CardHeader title="사주 운세 — MVP (연/일/시 + 오행·십신 분포)"
          subheader={note}
        />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="출생일 (양력)"
                  type="date"
                  value={date}
                  onChange={(e)=>setDate(e.target.value)}
                  InputLabelProps={{shrink:true}}
                />
                <TextField
                  label="출생시각"
                  type="time"
                  value={time}
                  onChange={(e)=>setTime(e.target.value)}
                  InputLabelProps={{shrink:true}}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}><Divider/></Grid>

            <Grid item xs={12} md={3}>
              <PillarView title="연주" stem={data.yearP.stem} branch={data.yearP.branch} />
            </Grid>
            <Grid item xs={12} md={3}>
              <Paper variant="outlined" sx={{p:1.25}}>
                <Typography variant="overline">월주(지지만)</Typography>
                <Typography variant="h5" fontWeight={700}>—{BRANCHES[data.monthB].ch}—</Typography>
                <Typography variant="body2">※ 절입 미반영(임시)</Typography>
                <Typography variant="body2">장간: {BRANCHES[data.monthB].hidden.map(h=>STEMS[h].ch).join(" ")}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3}>
              <PillarView title="일주" stem={data.dayP.stem} branch={data.dayP.branch} />
            </Grid>
            <Grid item xs={12} md={3}>
              <PillarView title="시주" stem={data.hourP.stem} branch={data.hourP.branch} />
            </Grid>

            <Grid item xs={12}><Divider sx={{my:1}}/></Grid>

            <Grid item xs={12} md={6}>
              <CountChips title="오행 분포(천간+장간)" counts={{
                목: data.elemCounts.wood,
                화: data.elemCounts.fire,
                토: data.elemCounts.earth,
                금: data.elemCounts.metal,
                수: data.elemCounts.water
              } as any} />
            </Grid>

            <Grid item xs={12} md={6}>
              <CountChips title="십신 분포(일간 기준)" counts={data.tenGodCounts as any} />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{p:1.25}}>
                <Typography variant="subtitle2" gutterBottom>간단 해석(예시 규칙)</Typography>
                <ul style={{marginTop:0}}>
                  <li>오행 과다/부족: 가장 높은/낮은 오행을 중심으로 환경·생활습관 보정 제안</li>
                  <li>일간이 강(비견/겁재·인성↑)이면 관성·재성 활용, 약하면 인성·비겁 보강</li>
                  <li>정밀 해석은 월주(절입), 대운/세운까지 반영 필요</li>
                </ul>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
