"use client";
import { Alert, Container, Typography, Button } from "@mui/material";
import Link from "next/link";
import Layout from "../Layout";
import EmailForm from "../EmailForm";
import { useMemo } from "react";

const EmailReceiptPage = ({ id }: { id: string }) => {
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get("amount");

  const msgPriority = useMemo(() => {
    if (amount === "10") return "Your song will be played soon.";
    if (amount === "5")
      return "Your song will be played in the next few minutes.";
    if (amount === "3") return "Your song will be played eventually.";
  }, []);

  return (
    <Layout isNotDj={true}>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Thanks for the tip! Your song request has been submitted.{" "}
          {msgPriority}
        </Alert>
        <Typography variant="h4" component="h1">
          Email Receipt
        </Typography>
        <Typography component="p">
          Enter your email to receive a receipt for your payment.
        </Typography>
        <EmailForm id={id} />

        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          <Link href={"/song-request/" + id}>Request Another Song</Link>
        </Button>
      </Container>
    </Layout>
  );
};

export default EmailReceiptPage;
