import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";
import { motion } from "framer-motion";
import { styled } from "@mui/system";

// Styled Components for Neon Theme

const NeonContainer = styled(Paper)({
  backgroundColor: "#121212",
  color: "#fff",
  padding: "20px",
  borderRadius: "10px",
  border: "2px solid #ff00ff",
  boxShadow: "0px 0px 15px #ff00ff",
});

const MotionBox = motion(Box);

const Hero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <NeonContainer elevation={10}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            🎧 TipTunes – Request & Tip Your Favorite Songs!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            DJs can accept song requests and tips from the audience in
            real-time. Request your favorite song and boost its priority with a
            tip!
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button variant="contained">Request a Song</Button>
            <Button variant="contained">Tip the DJ</Button>
          </Box>
        </NeonContainer>
      </MotionBox>
    </Box>
  );
};

export default Hero;
