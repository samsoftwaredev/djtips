"use client";

import Layout from "@/components/Layout/Layout";
import styles from "./page.module.css";

export default function Home() {
  return (
    <Layout>
      <div
        className={styles.background}
        style={{ backgroundImage: 'url("/dj.jpg")' }}
      >
        <div className={styles.centeredText}>
          <div>Play the music the crowd wants.</div>
          <div>Get paid while you do it!</div>
        </div>
      </div>
    </Layout>
  );
}
