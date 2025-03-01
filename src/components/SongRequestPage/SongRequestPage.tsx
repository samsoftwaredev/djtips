"use client";

import { SongRequestFormData } from "@/interfaces";
import { Container, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import SongRequestForm from "../SongRequestForm";
import PaymentRequest from "../PaymentRequest";
import Layout from "../Layout";

const SongRequestPage = ({ id }: { id: string }) => {
  const [song, setSong] = useState<SongRequestFormData | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onSubmit = async (data: SongRequestFormData) => {
    setSong(data);
    setActiveStep(1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Layout IsDjUser={false}>
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Stepper
          sx={{ width: "100%" }}
          activeStep={activeStep}
          alternativeLabel
        >
          <Step key="Song Request">
            <StepLabel>Song Request</StepLabel>
          </Step>
          <Step key="Payment">
            <StepLabel>Submit</StepLabel>
          </Step>
        </Stepper>

        {activeStep === 0 && (
          <SongRequestForm onSubmit={onSubmit} song={song} />
        )}
        {activeStep === 1 && song && (
          <PaymentRequest
            song={song}
            djId={id as string}
            handleBack={handleBack}
          />
        )}
      </Container>
    </Layout>
  );
};

export default SongRequestPage;
