"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Paper } from "@mui/material";

export default function TotalTips() {
  const [totalTips, setTotalTips] = useState<number>(0);

  useEffect(() => {
    setTotalTips(333.75);
    // Fetch the total tips from the database or API
  }, []);

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
