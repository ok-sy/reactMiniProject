import React, { useMemo, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";

type StemIdx = 0|1|2|3|4|5|6|7|8|9;
type BranchIdx = 0|1|2|3|4|5|6|7|8|9|10|11;

const STEMS = [
  { ch: "甲", el: "wood", yy: "yang" },
  { ch: "乙", el: "wood", yy: "yin"  },
  { ch: "丙", el: "fire", yy: "yang" },
  { ch: "丁", el: "fire", yy: "yin"  },
  { ch: "戊", el: "earth",yy: "yang" },
  { ch: "己", el: "earth",yy: "yin"  },
  { ch: "庚", el: "metal",yy: "yang" },
  { ch: "辛", el: "metal",yy: "yin"  },
  { ch: "壬", el: "water",yy: "yang" },
  { ch: "癸", el: "water",yy: "yin"  },
] as const;

const BRANCHES = [
  { ch: "子", el: "water", hidden: [9] },
  { ch: "丑", el: "earth", hidden: [5,9,7] },
  { ch: "寅", el: "wood",  hidden: [0,2,4] },
  { ch: "卯", el: "wood",  hidden: [1] },
  { ch: "辰", el: "earth", hidden: [4,1,9] },
  { ch: "巳", el: "fire",  hidden: [2,6,4] },
  { ch: "午", el: "fire",  hidden: [3,5] },
  { ch: "未", el: "earth", hidden: [5,3,1] },
  { ch: "申", el: "metal", hidden: [6,8,4] },
  { ch: "酉", el: "metal", hidden: [7] },
  { ch: "戌", el: "earth", hidden: [4,7,3] },
  { ch: "亥", el: "water", hidden: [8,0] },
] as const;

function toJDN(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}
const JDN_BASE = toJDN(1984, 2, 2);

function getYearPillar(year: number) {
  const stem = ((year - 4) % 10 + 10) % 10 as StemIdx;
  const branch = ((year - 4) % 12 + 12) % 12 as BranchIdx;
  return { stem, branch };
}

function getDayPillar(y: number, m: number, d: number) {
  const jdn = toJDN(y, m, d);
  const diff = jdn - JDN_BASE;
  const idx = ((diff % 60) + 60) % 60;
  const stem = (idx % 10) as StemIdx;
  const branch = (idx % 12) as BranchIdx;
  return { stem, branch };
}

export default function SajuPage() {
  const [date, setDate] = useState("1994-07-15");

  const { yearP, dayP } = useMemo(() => {
    const [y, m, d] = date.split("-").map(Number);
    return {
      yearP: getYearPillar(y),
      dayP: getDayPillar(y, m, d)
    };
  }, [date]);

  return (
    <Box p={3}>
      <Card>
        <CardHeader title="사주팔자 MVP" />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="출생일"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography>
                연주: {STEMS[yearP.stem].ch}{BRANCHES[yearP.branch].ch}
              </Typography>
              <Typography>
                일주: {STEMS[dayP.stem].ch}{BRANCHES[dayP.branch].ch}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}
