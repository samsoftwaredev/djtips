"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { IoMdClose } from "react-icons/io";
import { DataSnapshot, off, onValue, ref, remove } from "firebase/database";
import { db } from "@/constants";
import { useAuth } from "@/hooks";

interface Song {
  id: string;
  artist: string;
  userName: string;
  songTitle: string;
  tip: number;
  imageUrl?: string;
}

const initialSongs: Song[] = [];

export default function SongQueue() {
  const { user } = useAuth();
  const [songs, setSongs] = useState<Song[]>(initialSongs);

  const removeSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
    remove(ref(db, "songRequest/" + user?.uid + "/" + id))
      .then(() => {
        console.log("Data removed successfully!");
      })
      .catch((error) => {
        console.error("Error removing data:", error);
      });
  };

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
      console.log("songRequest NEW: ", data); // This will print the value of stars
    };
    onValue(starPlaylistRef, handelData);

    return () => {
      off(starPlaylistRef);
    };
  }, []);

  return (
    <Box maxWidth={500} width="100%" mx="auto" m={4}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Song Requested
        </Typography>
        {songs.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No songs in the queue.
          </Typography>
        )}
        <List>
          {songs.map((song, index) => (
            <ListItem
              key={song.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => removeSong(song.id)}
                >
                  <IoMdClose />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar src={song.imageUrl} alt={song.songTitle} />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ fontWeight: "bold" }}
                primary={`#${index + 1} - ${song.songTitle} by ${song.artist}`}
                secondary={`Requested by: ${song.userName}`}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}
