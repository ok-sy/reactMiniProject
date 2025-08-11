'use client';
import { useMemo, useState } from "react";
import {
  AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu.js';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports.js";
import AssessmentIcon from "@mui/icons-material/Assessment.js";
import InfoIcon from "@mui/icons-material/Info.js";
import Tetris from "../components/Tetris/Tetris";

const drawerWidth = 260;

type ViewKey = 'tetris' | 'dashboard' | 'about';

export default function MainPage() {
  const [open, setOpen] = useState(true);
  const [view, setView] = useState<ViewKey>('tetris');

  const menus = useMemo(() => ([
    { key: 'tetris' as const, label: 'Tetris', icon: <SportsEsportsIcon /> },
    { key: 'dashboard' as const, label: 'Dashboard', icon: <AssessmentIcon /> },
    { key: 'about' as const, label: 'About', icon: <InfoIcon /> },
  ]), []);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", width: '100vw', bgcolor: "#f3f3f3" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{ bgcolor: "#222", color: "#fff", zIndex: (t) => t.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton edge="start" onClick={() => setOpen(v => !v)} sx={{ mr: 2, color: "#fff" }}>
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
          <Typography variant="h6" noWrap>Mini Projects</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            borderRight: "1px solid #e5e5e5",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ p: 2 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>프로젝트</Typography>
          <Divider sx={{ mb: 1.5 }} />
          <List>
            {menus.map(m => (
              <ListItem key={m.key} disablePadding>
                <ListItemButton
                  selected={view === m.key}
                  onClick={() => setView(m.key)}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>{m.icon}</ListItemIcon>
                  <ListItemText primary={m.label} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          px: { xs: 1.5, md: 3 },
          py: 3,
          transition: (t) => t.transitions.create("margin", {
            easing: t.transitions.easing.sharp,
            duration: t.transitions.duration.enteringScreen,
          }),
          // ml: open ? `${drawerWidth}px` : 0,
        }}
      >
        <Toolbar />

        {/* 카드 컨테이너 */}
        <Box sx={{
          p: { xs: 1.5, md: 2 },
          bgcolor: "#fff",
          borderRadius: 3,
          boxShadow: "0 1px 2px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.08)",
        }}>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
            {menus.find(m => m.key === view)?.label}
          </Typography>

          {view === 'tetris' && <Tetris />}

          {view === 'dashboard' && (
            <Box sx={{ color: 'text.secondary' }}>
              대시보드 자리(추후 그래프/표 삽입)
            </Box>
          )}

          {view === 'about' && (
            <Box sx={{ color: 'text.secondary' }}>
              Mini Projects 소개/버전/링크 등
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}
