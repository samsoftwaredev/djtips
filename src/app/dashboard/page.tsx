"use client";

import { Playlist, PrivateRoutes } from "@/components";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/hooks";
import { Box, Container } from "@mui/material";
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
        <Container>
          <h2 className="text-2xl">Dashboard</h2>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image
              onClick={goToSongRequest}
              width="350"
              height="350"
              src={imageQRBase64}
              alt="Friend Request QR code"
            />
            <Playlist />
          </Box>
        </Container>
      </Layout>
    </PrivateRoutes>
  );
};

export default Dashboard;
