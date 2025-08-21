// utils/ganji.ts
type Stem = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;   // 0:甲 ... 9:癸
type Branch = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11; // 0:子 ... 11:亥

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;

// ---- (1) 연주: 입춘 이전이면 year-1을 사용해야 정확함. 여기선 임시 구현(입춘 처리 TODO)
export function getYearPillar(gYear: number): { stem: Stem; branch: Branch } {
    const stem = ((gYear - 4) % 10 + 10) % 10 as Stem;
    const branch = ((gYear - 4) % 12 + 12) % 12 as Branch;
    return { stem, branch };
}

// ---- (2) 일주: JDN(율리우스일수) 기반 60간지
// 기준: 1984-02-02 (Gregorian) = 갑자일(0)
function toJDN(y: number, m: number, d: number): number {
    // Gregorian calendar to JDN
    const a = Math.floor((14 - m) / 12);
    const yy = y + 4800 - a;
    const mm = m + 12 * a - 3;
    return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

const JDN_BASE = toJDN(1984, 2, 2); // 갑자일

export function getDayPillar(y: number, m: number, d: number): { stem: Stem; branch: Branch } {
    const jdn = toJDN(y, m, d);
    const diff = jdn - JDN_BASE;
    const idx = ((diff % 60) + 60) % 60;
    const stem = (idx % 10) as Stem;
    const branch = (idx % 12) as Branch;
    return { stem, branch };
}

// ---- (3) 시주: 현지시 기준 2시간 단위 지지 + 일간 기준 시간
const HOUR_BRANCH_TABLE: Branch[] = [0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 0];
// index = 0..23시 → 지지
// 시간(천간)은 일간별 子시 간을 시작점으로 12지에 따라 1간씩 전진하는 테이블이 필요
const HOUR_STEM_START_BY_DAY_STEM: Stem[] = [
    // 일간=甲[0]이면 子시=甲, 乙[1]이면 子시=丙, ... (전통 테이블 적용)
    0, 2, 4, 6, 8, 0, 2, 4, 6, 8
];

export function getHourPillar(localHour: number, dayStem: Stem): { stem: Stem; branch: Branch } {
    const b = HOUR_BRANCH_TABLE[localHour] as Branch;
    const startStem = HOUR_STEM_START_BY_DAY_STEM[dayStem]; // 子시의 간
    // 지지 b가 子(0)일 때 startStem, 이후 한 지지마다 +1
    const stem = ((startStem + b) % 10) as Stem;
    return { stem, branch: b };
}

// ---- helper: 표기
export function formatPillar(p: { stem: Stem; branch: Branch }) {
    return STEMS[p.stem] + BRANCHES[p.branch];
}
