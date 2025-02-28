"use client";
import { useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function TotalTips() {
  const [totalTips, setTotalTips] = useState<number>(125.75);

  return (
    <Box maxWidth={500} width="100%" mx="auto" m={4}>
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
