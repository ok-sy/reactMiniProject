/**
 * SajuApp.withFortune.tsx — 사주(연/일/시 + 오행/십신) + 오늘의 운세
 */
import React, { useMemo, useState } from "react";
import {
  Box, Card, CardHeader, CardContent, Grid, TextField,
  Typography, Divider, Stack, Paper, Chip
} from "@mui/material";

type StemIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type BranchIdx = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
type YinYang = "yang" | "yin";
type Element = "wood" | "fire" | "earth" | "metal" | "water";

const STEMS = [
  { ch: "甲", el: "wood", yy: "yang" },
  { ch: "乙", el: "wood", yy: "yin" },
  { ch: "丙", el: "fire", yy: "yang" },
  { ch: "丁", el: "fire", yy: "yin" },
  { ch: "戊", el: "earth", yy: "yang" },
  { ch: "己", el: "earth", yy: "yin" },
  { ch: "庚", el: "metal", yy: "yang" },
  { ch: "辛", el: "metal", yy: "yin" },
  { ch: "壬", el: "water", yy: "yang" },
  { ch: "癸", el: "water", yy: "yin" },
] as const;

const BRANCHES = [
  { ch: "子", el: "water", hidden: [9] },
  { ch: "丑", el: "earth", hidden: [5, 9, 7] },
  { ch: "寅", el: "wood", hidden: [0, 2, 4] },
  { ch: "卯", el: "wood", hidden: [1] },
  { ch: "辰", el: "earth", hidden: [4, 1, 9] },
  { ch: "巳", el: "fire", hidden: [2, 6, 4] },
  { ch: "午", el: "fire", hidden: [3, 5] },
  { ch: "未", el: "earth", hidden: [5, 3, 1] },
  { ch: "申", el: "metal", hidden: [6, 8, 4] },
  { ch: "酉", el: "metal", hidden: [7] },
  { ch: "戌", el: "earth", hidden: [4, 7, 3] },
  { ch: "亥", el: "water", hidden: [8, 0] },
] as const;

const GREGORIAN_MONTH_TO_BRANCH: BranchIdx[] = [
  2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1,
];

const HOUR_TO_BRANCH: BranchIdx[] = [
  0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
];

const HOUR_STEM_START_BY_DAY_STEM: Record<StemIdx, StemIdx> = {
  0: 0,
  5: 0,
  1: 2,
  6: 2,
  2: 4,
  7: 4,
  3: 6,
  8: 6,
  4: 8,
  9: 8,
} as any;

type TenGod =
  | "비견"
  | "겁재"
  | "식신"
  | "상관"
  | "편재"
  | "정재"
  | "편관"
  | "정관"
  | "편인"
  | "정인";

function generates(a: Element, b: Element) {
  return (
    (a === "wood" && b === "fire") ||
    (a === "fire" && b === "earth") ||
    (a === "earth" && b === "metal") ||
    (a === "metal" && b === "water") ||
    (a === "water" && b === "wood")
  );
}

function overcomes(a: Element, b: Element) {
  return (
    (a === "wood" && b === "earth") ||
    (a === "fire" && b === "metal") ||
    (a === "earth" && b === "water") ||
    (a === "metal" && b === "wood") ||
    (a === "water" && b === "fire")
  );
}

function toJDN(y: number, m: number, d: number) {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return (
    d +
    Math.floor((153 * mm + 2) / 5) +
    365 * yy +
    Math.floor(yy / 4) -
    Math.floor(yy / 100) +
    Math.floor(yy / 400) -
    32045
  );
}

const JDN_BASE = toJDN(1984, 2, 2);

function getYearPillar(year: number) {
  return {
    stem: (((year - 4) % 10) + 10) % 10 as StemIdx,
    branch: (((year - 4) % 12) + 12) % 12 as BranchIdx,
  };
}

function getDayPillar(y: number, m: number, d: number) {
  const j = toJDN(y, m, d);
  const idx = ((j - JDN_BASE) % 60 + 60) % 60;
  return {
    stem: (idx % 10) as StemIdx,
    branch: (idx % 12) as BranchIdx,
  };
}

function getMonthBranch(m: number): BranchIdx {
  return GREGORIAN_MONTH_TO_BRANCH[m - 1];
}

function getHourPillar(h: number, ds: StemIdx) {
  const b = HOUR_TO_BRANCH[h];
  const s = HOUR_STEM_START_BY_DAY_STEM[ds];
  return {
    stem: ((s + b) % 10) as StemIdx,
    branch: b,
  };
}

function tenGodOf(d: StemIdx, o: StemIdx): TenGod {
  const D = STEMS[d],
    O = STEMS[o];

  if (D.el === O.el) return D.yy === O.yy ? "비견" : "겁재";
  if (generates(D.el, O.el)) return D.yy === O.yy ? "식신" : "상관";
  if (generates(O.el, D.el)) return D.yy === O.yy ? "정인" : "편인";
  if (overcomes(D.el, O.el)) return D.yy === O.yy ? "정재" : "편재";
  if (overcomes(O.el, D.el)) return D.yy === O.yy ? "정관" : "편관";
  return "비견";
}

function todayFortuneByRelation(rel: TenGod) {
  switch (rel) {
    case "식신":
    case "상관":
      return "오늘은 표현력이 살아나는 날, 연애운 상승💕";
    case "정재":
    case "편재":
      return "실속과 금전운이 강한 날💰";
    case "정관":
    case "편관":
      return "성공·승진운이 좋은 날📈";
    case "정인":
    case "편인":
      return "학습·내실 다지기에 좋은 날📚";
    case "비견":
    case "겁재":
    default:
      return "사람들과 협력하면 좋은 성과🤝";
  }
}

function PillarView({
  title,
  stem,
  branch,
}: {
  title: string;
  stem: StemIdx;
  branch: BranchIdx;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 1.25 }}>
      <Typography variant="overline">{title}</Typography>
      <Typography variant="h5">
        {STEMS[stem].ch}
        {BRANCHES[branch].ch}
      </Typography>
    </Paper>
  );
}

function CountChips({
  title,
  counts,
}: {
  title: string;
  counts: Record<string, number>;
}) {
  return (
    <Paper variant="outlined" sx={{ p: 1 }}>
      <Typography variant="subtitle2">{title}</Typography>
      <Stack direction="row" gap={1}>
        {Object.entries(counts).map(([k, v]) => (
          <Chip key={k} label={`${k} ${v}`} />
        ))}
      </Stack>
    </Paper>
  );
}

export default function SajuApp() {
  const [date, setDate] = useState("1994-07-15");
  const [time, setTime] = useState("14:30");

  const data = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    const [hh] = time.split(":").map(Number);

    const yearP = getYearPillar(y);
    const dayP = getDayPillar(y, m, d);
    const hourP = getHourPillar(hh, dayP.stem);
    const monthB = getMonthBranch(m);

    const now = new Date();
    const todayP = getDayPillar(
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate()
    );

    const relation = tenGodOf(dayP.stem, todayP.stem);
    const fortune = todayFortuneByRelation(relation);

    return { yearP, dayP, hourP, monthB, todayP, fortune };
  }, [date, time]);

  return (
    <Box p={3}>
      <Card>
        <CardHeader title="사주 운세 (오늘의 운세 포함)" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <TextField
                  label="출생일"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="출생시각"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={4}>
              <PillarView
                title="연주"
                stem={data.yearP.stem}
                branch={data.yearP.branch}
              />
            </Grid>

            <Grid item xs={4}>
              <PillarView
                title="일주"
                stem={data.dayP.stem}
                branch={data.dayP.branch}
              />
            </Grid>

            <Grid item xs={4}>
              <PillarView
                title="시주"
                stem={data.hourP.stem}
                branch={data.hourP.branch}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2 }}>
                <Typography variant="h6">오늘의 운세</Typography>
                <Typography>{data.fortune}</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
