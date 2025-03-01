"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { TextField, Button, Box, Snackbar, Alert } from "@mui/material";
import { ref, push, set } from "firebase/database";
import { db } from "@/constants";
import { useRouter } from "next/navigation";

interface EmailFormData {
  email: string;
}

const EmailForm = ({ id }: { id: string }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailFormData>();
  const router = useRouter();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const paymentIntent = urlParams.get("payment_intent");
  const amount = urlParams.get("amount");

  const onSubmit: SubmitHandler<EmailFormData> = async (data) => {
    try {
      // Push the email to the "emails" node in your Firebase Realtime Database
      const emailRef = ref(db, "emails/" + id);
      await set(push(emailRef), {
        email: data.email,
        createdAt: new Date().toISOString(),
        paymentIntent: paymentIntent,
        amount: amount,
      });

      // Show the success message
      setOpenSnackbar(true);

      setTimeout(() => {
        // Reset the form after submission
        reset();
      }, 2000);
    } catch (error) {
      console.error("Error saving email:", error);
    }
  };

  if (paymentIntent === null) {
    router.push("/song-request");
    return null;
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 4 }}
    >
      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
            message: "Enter a valid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          We&apos;ll send you a receipt shortly!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default EmailForm;
