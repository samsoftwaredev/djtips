"use client";

import { PrivateRoutes } from "@/components";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/hooks";
import { Box } from "@mui/material";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useAuth();
  const [imageQRBase64, setImageQRBase64] = useState("");
  const router = useRouter();
  const textQR = window.location.origin + "/song-request/" + user?.uid;

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

  const goToSongRequest = () => {
    router.push("/song-request/" + user?.uid);
  };

  return (
    <PrivateRoutes>
      <Layout>
        <h2 className="text-2xl">Dashboard</h2>
        <Box display="flex" justifyContent="center">
          <Image
            onClick={goToSongRequest}
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
