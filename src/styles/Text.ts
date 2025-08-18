import { SxProps } from "@mui/material";

export const rootSx: SxProps = {
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    padding: '10px',
};

export const completedTextSx: SxProps = {
    textDecoration: 'line-through',
};