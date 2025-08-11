'use client';
import { Box, Chip, Divider, Grid, Stack, Typography } from '@mui/material';

export function ProfileCard() {
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        borderRadius: 3,
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        p: { xs: 2, md: 3 },
        maxWidth: 960,
        mx: 'auto',
      }}
    >
      {/* 헤더 */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={1} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between">
        <Typography variant="h5" fontWeight={800}>옥승엽</Typography>
        <Typography variant="body2" color="text.secondary">
          +82 010-***-**** · oso79@naver.com
        </Typography>
      </Stack>

      {/* 간단 소개 */}
      <Box mt={3}>
        <Typography variant="subtitle1" fontWeight={700}>간단 소개</Typography>
        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={1}>
          <Typography variant="body2">
            안녕하세요. 대규모/금융권 SI·SM 프로젝트 경험과 React/TypeScript 기반 프론트엔드 개발 역량을 갖추고 있습니다.
          </Typography>
          <Typography variant="body2">
            다양한 언어/플랫폼(JAVA, JS, SQL, LINUX, REACT, TYPESCRIPT 등)과 형상관리(GIT, SVN) 경험이 있습니다.
          </Typography>
        </Stack>
      </Box>

      {/* 경력 */}
      <Box mt={4}>
        <Typography variant="subtitle1" fontWeight={700}>경력 <Typography component="span" color="text.secondary" fontWeight={400} ml={0.5}>3년 4개월</Typography></Typography>
        <Divider sx={{ my: 1.5 }} />
        <Stack spacing={2}>
          <JobItem
            title="크레디트라인"
            period="2022.05 - 재직 중 (3년 4개월)"
            role="프론트 / API개발"
            bullets={[
              '현대카드 정보변환프로세스 API 개발 (React, TS)',
              '미니게임 테트리스 리액트 프로젝트 (AWS, Git)',
              '하이패스 단말기 어플리케이션 화면 개발(이미지 편집/업로드 UI)',
            ]}
          />
          <JobItem
            title="현대카드 정보처리 고도화"
            period="2023.04 - 2024.07"
            role="운영/개발"
            bullets={[
              '리눅스 운영 및 배치, 권한 세팅',
              '데이터 추출/정비 및 쿼리 검증(ORACLE)',
            ]}
          />
          <JobItem
            title="현대백화점 자사프로젝트"
            period="2023.02 - 2024.02"
            role="운영/개발"
            bullets={[
              '고객앱/웹 6개 API 화면 구축 및 성능개선',
              'BXM, NEXACRO, DOCKER, ORACLE 환경',
            ]}
          />
          <JobItem
            title="현대카드 정보보안 포탈 구축 프로젝트"
            period="2024.11 - 2025.07"
            role="개발"
            bullets={[
              '정보보안 포탈 JAVA 배치 인프라 환경 구축 및 프로그램 개발',
              'JAVA, Linux, MSSQL, Maria, Oracle, Splunk, API 환경',
            ]}
          />
        </Stack>
      </Box>

      {/* 학력 & 스킬 */}
      <Grid container spacing={3} mt={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={700}>학력</Typography>
          <Divider sx={{ my: 1.5 }} />
          <Typography fontWeight={700}>호남대학교</Typography>
          <Typography variant="body2" color="text.secondary">2013.02 - 2019.07 · 관광경영</Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={700}>스킬</Typography>
          <Divider sx={{ my: 1.5 }} />
          <Stack direction="row" flexWrap="wrap" gap={1}>
            {['JavaScript', 'TypeScript', 'React', 'Next.js', 'HTML', 'CSS', 'Node.js', 'SQL', 'Linux', 'Docker'].map((s) => (
              <Chip key={s} label={s} size="small" sx={{ borderRadius: 1.5 }} />
            ))}
          </Stack>
        </Grid>
      </Grid>

      {/* 자격/외국어/링크 */}
      <Grid container spacing={3} mt={0}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={700}>수상/자격증</Typography>
          <Divider sx={{ my: 1.5 }} />
          <Stack spacing={1}>
            <LineItem primary="SQLD" secondary="2022.06" />
            <LineItem primary="워드프로세서 2급" secondary="2018.03" />
            <LineItem primary="운전면허증" secondary="2019.03" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle1" fontWeight={700}>외국어</Typography>
          <Divider sx={{ my: 1.5 }} />
          <LineItem primary="중국어 회화" secondary="일상 회화" />
          <Box mt={3}>
            <Typography variant="subtitle1" fontWeight={700}>링크</Typography>
            <Divider sx={{ my: 1.5 }} />
            <Typography variant="body2" color="primary.main" sx={{ wordBreak: 'break-all' }}>
              Notion · <a href='https://www.notion.so/okbro/Coding-bd0830a5e05e4f778e48ffd2de804508'>https://www.notion.so/okbro/Coding-...</a>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

/* 하위 구성요소 */

function JobItem({
  title,
  period,
  role,
  bullets,
}: {
  title: string;
  period: string;
  role: string;
  bullets: string[];
}) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: '1px solid #f0f2f5',
        bgcolor: '#fafafa',
      }}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" gap={1}>
        <Typography fontWeight={700}>{title}</Typography>
        <Typography variant="body2" color="text.secondary">{period}</Typography>
      </Stack>
      <Typography variant="body2" color="text.secondary" mt={0.5}>
        역할: {role}
      </Typography>
      <Stack component="ul" sx={{ m: 0, pl: 2 }} mt={1} spacing={0.5}>
        {bullets.map((b, i) => (
          <Typography component="li" variant="body2" key={i}>{b}</Typography>
        ))}
      </Stack>
    </Box>
  );
}

function LineItem({ primary, secondary }: { primary: string; secondary?: string }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Typography variant="body2" fontWeight={600}>{primary}</Typography>
      {secondary && <Typography variant="body2" color="text.secondary">· {secondary}</Typography>}
    </Stack>
  );
}


export default function AboutPage() {

  return (

    <ProfileCard />

  );
}
