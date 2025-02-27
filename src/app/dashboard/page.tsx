"use client";

import { PrivateRoutes } from "@/components";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/hooks";
import { Box } from "@mui/material";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const { user } = useAuth();
  const [imageQRBase64, setImageQRBase64] = useState("");
  const textQR = window.location.origin + user?.uid + user?.displayName;

  const generateQR = async () => {
    try {
      const base64Image = await QRCode.toDataURL(textQR);
      setImageQRBase64(base64Image);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQR();
  }, []);

  return (
    <PrivateRoutes>
      <Layout>
        <h2 className="text-2xl">Dashboard</h2>
        <Box display="flex" justifyContent="center">
          <Image
            width="200"
            height="200"
            src={imageQRBase64}
            alt="Friend Request QR code"
          />
        </Box>
      </Layout>
    </PrivateRoutes>
  );
};

export default Dashboard;
