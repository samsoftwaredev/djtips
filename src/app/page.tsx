"use client";

import Layout from "@/components/Layout/Layout";
import styles from "./page.module.css";
import { Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <Layout>
      <div
        className={styles.background}
        style={{ backgroundImage: 'url("/dj.jpg")' }}
      >
        <div className={styles.centeredText}>
          <Typography fontSize="1.2em" fontWeight="100">
            Spin the beats they love.
          </Typography>
          <Typography fontSize="1.9em" fontWeight="900">
            Get paid and keep the party alive!
          </Typography>
          <Button>Start For Free</Button>
        </div>
      </div>
    </Layout>
  );
}
