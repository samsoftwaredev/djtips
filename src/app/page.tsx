"use client";

import Layout from "@/components/Layout/Layout";
import styles from "./page.module.css";
import { Button, styled, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

const NeonButton = styled(Button)({
  background: "linear-gradient(45deg, #ff00ff, #00ffff)",
  color: "#fff",
  fontWeight: "bold",
  padding: "10px 20px",
  boxShadow: "0px 0px 10px #ff00ff",
  transition: "all 0.3s",
  "&:hover": {
    boxShadow: "0px 0px 20px #ff00ff",
    transform: "scale(1.05)",
  },
});

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <div
        className={styles.background}
        style={{ backgroundImage: 'url("/dj.jpg")' }}
      >
        <div className={styles.centeredText}>
          <Typography fontSize="1em" fontWeight="900">
            Request & Tip Your Favorite Songs!
          </Typography>
          <Typography mb={3} p={1} fontSize=".6em" fontWeight="300">
            DJs can accept song requests and tips from the audience in
            real-time. Request your favorite song and boost its priority with a
            tip!
          </Typography>
          <NeonButton onClick={() => router.push("/signup")}>
            Start For Free
          </NeonButton>
        </div>
      </div>
    </Layout>
  );
}
