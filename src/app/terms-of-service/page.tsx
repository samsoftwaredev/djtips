import React from "react";
import { Box, Typography, Paper, Button } from "@mui/material";

const TermsOfService: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#000",
        padding: "20px",
      }}
    >
      <Box>
        <Paper elevation={10}>
          <Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
            📜 TipTunes Terms of Service
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            1. Introduction
          </Typography>
          <Typography variant="body2">
            Welcome to TipTunes! By accessing or using our platform, you agree
            to be bound by these Terms of Service (&quot;Terms&quot;). If you do
            not agree, please do not use TipTunes. These Terms govern your use
            of our services, including song requests, tipping, and interactions
            with DJs and other users.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            2. Eligibility
          </Typography>
          <Typography variant="body2">
            To use TipTunes, you must be at least 18 years old or the age of
            majority in your jurisdiction. By using TipTunes, you confirm that
            you meet this requirement.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            3. User Responsibilities
          </Typography>
          <Typography variant="body2">
            As a user of TipTunes, you agree to: - Provide accurate account
            information. - Respect DJs, other users, and community guidelines. -
            Refrain from abusive, offensive, or illegal activity. - Not engage
            in fraudulent tipping or payment disputes.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            4. DJ Responsibilities
          </Typography>
          <Typography variant="body2">
            DJs using TipTunes must: - Honor song requests when tips are
            received. - Clearly communicate if a request cannot be fulfilled. -
            Not exploit or manipulate the tipping system. - Adhere to copyright
            laws when playing music.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            5. Payments & Tips
          </Typography>
          <Typography variant="body2">
            - Users can tip DJs to request songs. - All tips are voluntary and
            non-refundable. - TipTunes may take a small transaction fee to
            support platform operations. - DJs are responsible for reporting
            earnings for tax purposes.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            6. Content & Copyright Policy
          </Typography>
          <Typography variant="body2">
            - TipTunes does not own or control the music played by DJs. - Users
            and DJs are responsible for ensuring their content complies with
            copyright laws. - If a copyright holder requests removal of
            unauthorized content, we may take action.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            7. Account Termination & Violations
          </Typography>
          <Typography variant="body2">
            We reserve the right to suspend or terminate accounts that violate
            these Terms, including: - Harassment, hate speech, or abusive
            behavior. - Fraudulent tipping or chargebacks. - Repeated copyright
            violations.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            8. Liability Disclaimer
          </Typography>
          <Typography variant="body2">
            - TipTunes is a platform for facilitating song requests and tipping;
            we are not liable for any disputes between users and DJs. - We do
            not guarantee that requested songs will be played. - TipTunes is not
            responsible for technical failures, unauthorized access, or service
            interruptions.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            9. Modifications to Terms
          </Typography>
          <Typography variant="body2">
            We may update these Terms at any time. Users will be notified of
            significant changes, and continued use of the platform constitutes
            acceptance of the updated Terms.
          </Typography>

          <Typography variant="h6" sx={{ mt: 2 }}>
            10. Contact Information
          </Typography>
          <Typography variant="body2">
            If you have any questions about these Terms, please contact us at:
            📧 support@tiptunes.com
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button variant="contained">Accept Terms</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default TermsOfService;
