import * as React from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Stack,
  Divider,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SpaIcon from "@mui/icons-material/Spa";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SavingsIcon from "@mui/icons-material/Savings";
import TodayIcon from "@mui/icons-material/Today";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import WcIcon from "@mui/icons-material/Wc";
import StyleIcon from "@mui/icons-material/Style";
import CasinoIcon from "@mui/icons-material/Casino";
import FavoriteIcon from "@mui/icons-material/Favorite";

// Landing-style page for Saju/Fortune features
// Place this file at: pages/saju/index.tsx  (Next.js pages router)
export default function SajuLanding() {
  const theme = useTheme();

  // helper: common feature card
  const FeatureCard = ({
    title,
    desc,
    href,
    icon,
  }: {
    title: string;
    desc: string;
    href?: string;
    icon: React.ReactNode;
  }) => {
    const content = (
      <CardActionArea
        sx={{
          p: 2,
          height: "100%",
          display: "flex",
          alignItems: "stretch",
        }}
      >
        <Stack
          justifyContent="space-between"
          spacing={2}
          sx={{
            p: 2.5,
            width: "100%",
            bgcolor: "primary.main",
            color: "primary.contrastText",
            borderRadius: 2,
            boxShadow: 2,
            transition: "transform .2s ease, box-shadow .2s ease",
            "&:hover": { transform: "translateY(-3px)", boxShadow: 6 },
          }}
        >
          <Stack spacing={1}>
            <Typography variant="h6" fontWeight={800}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              {desc}
            </Typography>
          </Stack>

          <Box
            sx={{
              alignSelf: "flex-end",
              width: 44,
              height: 44,
              borderRadius: 1.2,
              bgcolor: "rgba(255,255,255,.2)",
              display: "grid",
              placeItems: "center",
            }}
          >
            {icon}
          </Box>
        </Stack>
      </CardActionArea>
    );

    return (
      <Card elevation={0} sx={{ bgcolor: "transparent" }}>
        {href ? (
          <Link href={href} style={{ textDecoration: "none" }}>
            {content}
          </Link>
        ) : (
          content
        )}
      </Card>
    );
  };

  const ItemCard = ({
    title,
    href,
    icon,
  }: {
    title: string;
    href?: string;
    icon: React.ReactNode;
  }) => {
    const content = (
      <CardActionArea sx={{ p: 1.5 }}>
        <Stack
          direction="row"
          spacing={1.5}
          alignItems="center"
          sx={{
            p: 2,
            borderRadius: 1.5,
            border: `1px solid ${theme.palette.divider}`,
            transition: "background .2s ease, transform .15s ease",
            "&:hover": { background: theme.palette.action.hover, transform: "translateY(-1px)" },
          }}
        >
          <Box
            sx={{
              width: 36,
              height: 36,
              display: "grid",
              placeItems: "center",
              borderRadius: 1,
              bgcolor: "action.selected",
            }}
          >
            {icon}
          </Box>
          <Typography fontWeight={600}>{title}</Typography>
        </Stack>
      </CardActionArea>
    );

    return (
      <Card elevation={0} sx={{ bgcolor: "transparent" }}>
        {href ? (
          <Link href={href} style={{ textDecoration: "none", color: "inherit" }}>
            {content}
          </Link>
        ) : (
          content
        )}
      </Card>
    );
  };

  return (
    <Box sx={{ px: { xs: 2, md: 4 }, py: 5, maxWidth: 1200, mx: "auto" }}>
      {/* 정통운세 */}
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        정통운세
      </Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="월간종합운세"
            desc="이달의 총론과 재물, 애정, 건강, 기인 등 7가지 테마를 설정하여 안내해드려요."
            icon={<CalendarMonthIcon htmlColor="#fff" />}
            href="/saju/monthly"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="평생운세"
            desc="나의 운명을 미리 알고 활용해보세요."
            icon={<SpaIcon htmlColor="#fff" />}
            href="/saju/life"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="2025 신토정비결"
            desc="길흉지사를 분석해드리니, 한 해를 새롭게 살아가는 이정표가 되시기를."
            icon={<AutoAwesomeIcon htmlColor="#fff" />}
            href="/saju/2025-tjb"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FeatureCard
            title="2025 부자되기"
            desc="나의 타고난 부자운은 과연 얼마나 될까요?"
            icon={<SavingsIcon htmlColor="#fff" />}
            href="/saju/2025-wealth"
          />
        </Grid>
      </Grid>

      {/* 생활운세 */}
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
        생활운세
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        생활 속 나의 운세를 확인하시고 적극 활용해보세요.
      </Typography>
      <Grid container spacing={1.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="오늘의 종합운세" icon={<TodayIcon />} href="/saju/today" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="주간종합운세" icon={<DateRangeIcon />} href="/saju/weekly" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="오늘의 타로" icon={<StyleIcon />} href="/tarot/today" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 로또운세" icon={<CasinoIcon />} href="/lotto/premium" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 궁합보기" icon={<FavoriteIcon />} href="/love/premium-match" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 운세보기" icon={<AutoAwesomeIcon />} href="/saju/premium" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 일일운" icon={<TodayIcon />} href="/saju/premium-daily" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 주간운" icon={<DateRangeIcon />} href="/saju/premium-weekly" />
        </Grid>
      </Grid>

      {/* 애정/궁합 */}
      <Typography variant="h6" fontWeight={900} sx={{ mb: 1 }}>
        애정/궁합
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        나의 운명의 상대는 어떤 사람인지 확인해보세요.
      </Typography>
      <Grid container spacing={1.5}>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="내사랑 반쪽찾기" icon={<FavoriteBorderIcon />} href="/love/half" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="운명의 배우자" icon={<WcIcon />} href="/love/spouse" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="프리미엄 궁합보기" icon={<FavoriteIcon />} href="/love/premium-match" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ItemCard title="커플 궁합 리포트" icon={<FavoriteBorderIcon />} href="/love/couple-report" />
        </Grid>
      </Grid>

      <Divider sx={{ my: 5 }} />

      {/* Footer note or CTA */}
      <Stack alignItems="center" spacing={1}>
        <Typography variant="body2" color="text.secondary">
          ※ 일부 서비스는 준비 중일 수 있습니다. (샘플 랜딩 UI)
        </Typography>
      </Stack>
    </Box>
  );
}
