"use client";

import { Playlist, PrivateRoutes, StatsTotalAmount } from "@/components";
import Layout from "@/components/Layout/Layout";
import { useAuth } from "@/hooks";
import { Box, Container, Paper } from "@mui/material";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { DataSnapshot, off, onValue, ref } from "firebase/database";
import { db } from "@/constants";
import { Song } from "@/interfaces";

const Dashboard = () => {
  const { user } = useAuth();
  const [imageQRBase64, setImageQRBase64] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
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

  const totalTips = useMemo(() => {
    return songs.reduce((acc, song) => acc + song.tip, 0);
  }, [songs]);

  useEffect(() => {
    const starPlaylistRef = ref(db, "songRequest/" + user?.uid);

    const handelData = (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      // Update UI based on data
      if (data) {
        const songsArray = Object.keys(data).map((key) => ({
          id: key,
          userName: data[key].name,
          songTitle: data[key].songTitle,
          artist: data[key].artist,
          tip: +data[key].tip,
          imageUrl: "https://via.placeholder.com/50",
        }));
        setSongs(songsArray);
      }
    };

    onValue(starPlaylistRef, handelData);

    return () => {
      off(starPlaylistRef);
    };
  }, []);

  return (
    <PrivateRoutes>
      <Layout>
        <Container
          maxWidth="sm"
          sx={{ gap: 4, display: "flex", flexDirection: "column", my: 4 }}
        >
          <h2 className="text-2xl">Dashboard</h2>
          <Box maxWidth={500} width="100%" mx="auto">
            <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
              {imageQRBase64 && (
                <Image
                  onClick={goToSongRequest}
                  width="300"
                  height="300"
                  src={imageQRBase64}
                  alt="Friend Request QR code"
                />
              )}
            </Paper>
          </Box>
          <StatsTotalAmount totalTips={totalTips} />
          <Playlist setSongs={setSongs} songs={songs} />
        </Container>
      </Layout>
    </PrivateRoutes>
  );
};

export default Dashboard;
