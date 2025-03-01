"use client";
import { Alert, Container, Typography, TextField, Button } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import Layout from "../Layout";

const EmailReceiptPage = ({ id }: { id: string }) => {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle email submission logic here
    console.log("Email submitted:", email);
  };

  return (
    <Layout isNotDj={true}>
      <Container maxWidth="sm" sx={{ textAlign: "center", mt: 4 }}>
        <Alert severity="success" sx={{ mb: 2 }}>
          Payment successful!
        </Alert>
        <Typography component="h1">Email Receipt</Typography>
        <Typography component="p">
          Enter your email to receive a receipt for your payment.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            type="email"
            required
            sx={{ mr: 2 }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Send Receipt
          </Button>
        </form>

        <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
          <Link href={"/song-request/" + id}>Request Another Song</Link>
        </Button>
      </Container>
    </Layout>
  );
};

export default EmailReceiptPage;
