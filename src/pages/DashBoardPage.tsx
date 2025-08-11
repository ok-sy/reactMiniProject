import { Box, Typography } from "@mui/material";
import GitHubCalendar from 'react-github-calendar';


export default function DashBoardPage() {
    return (
        <Box sx={{ p: 2, bgcolor: '#fff', borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
                About Mini Projects
            </Typography>
            <Typography variant="body1" color="text.secondary">
                This project showcases various mini applications built with React and Material-UI.
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1} mb={2}>
                Version: 1.0.0
            </Typography>
            <GitHubCalendar username="ok-sy" />
        </Box>
    );
}