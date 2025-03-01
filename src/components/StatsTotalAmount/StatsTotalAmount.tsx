"use client";
import { Box, Typography, Paper } from "@mui/material";

interface Props {
  totalTips: number;
}

export default function TotalTips({ totalTips }: Props) {
  return (
    <Box maxWidth={500} width="100%" mx="auto">
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Total Tips
        </Typography>
        <Typography variant="h3" fontWeight="bold" color="green">
          ${totalTips.toFixed(2)}
        </Typography>
      </Paper>
    </Box>
  );
}
