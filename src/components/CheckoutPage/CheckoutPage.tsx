"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/utils/swal";
import { Box, Button } from "@mui/material";
import Loader from "../Loader";

const CheckoutPage = ({
  amount,
  onPaymentSuccess,
  djId,
}: {
  amount: number;
  onPaymentSuccess: () => Promise<unknown>;
  djId: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    await onPaymentSuccess();

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url:
          window.location.origin + `/payment-success/${djId}?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return <Loader />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Box style={{ minHeight: "600px" }}>
        {clientSecret && <PaymentElement />}
      </Box>
      {errorMessage && <div>{errorMessage}</div>}

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 4 }}
        disabled={!stripe || loading}
      >
        {!loading ? `TIP $${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

export default CheckoutPage;
