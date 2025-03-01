"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { convertToSubcurrency } from "@/utils/swal";
import { CheckoutPage } from "@/components";
import { push, ref } from "firebase/database";
import { db } from "@/constants";
import { SongRequestFormData } from "@/interfaces";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Button, Paper } from "@mui/material";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

const PaymentRequest = ({
  song,
  djId,
  handleBack,
}: {
  song: SongRequestFormData;
  djId: string;
  handleBack: () => void;
}) => {
  const onPaymentSuccess = async () => {
    return new Promise((resolve, reject) => {
      push(ref(db, "songRequest/" + djId), {
        ...song,
      })
        .then(() => {
          console.log("Data written successfully!");
          resolve("Success");
        })
        .catch((error) => {
          console.error("Error writing data:", error);
          reject(error);
        });
    });
  };

  return (
    <Paper elevation={3} sx={{ m: 2, p: 1 }}>
      <Elements
        stripe={stripePromise}
        options={{
          appearance: {
            theme: "night",
          },
          mode: "payment",
          amount: convertToSubcurrency(+song.tip),
          currency: "usd",
        }}
      >
        <Button
          color="inherit"
          onClick={handleBack}
          sx={{ mr: 1 }}
          startIcon={<ArrowBackIosIcon />}
        >
          Back
        </Button>
        <CheckoutPage
          djId={djId}
          amount={+song.tip}
          onPaymentSuccess={onPaymentSuccess}
        />
      </Elements>{" "}
    </Paper>
  );
};

export default PaymentRequest;
