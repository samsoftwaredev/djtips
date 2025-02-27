"use client";
import { useState } from "react";
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

interface Song {
  id: number;
  userName: string;
  songTitle: string;
  artist: string;
  imageUrl: string;
}

const initialSongs: Song[] = [
  {
    id: 1,
    userName: "Alice",
    songTitle: "Shape of You",
    artist: "Ed Sheeran",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    userName: "Bob",
    songTitle: "Blinding Lights",
    artist: "The Weeknd",
    imageUrl: "https://via.placeholder.com/50",
  },
  {
    id: 3,
    userName: "Charlie",
    songTitle: "Someone Like You",
    artist: "Adele",
    imageUrl: "https://via.placeholder.com/50",
  },
];

export default function SongQueue() {
  const [songs, setSongs] = useState<Song[]>(initialSongs);

  const removeSong = (id: number) => {
    setSongs(songs.filter((song) => song.id !== id));
  };

  return (
    <Box maxWidth={500} mx="auto" m={4}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Song Queue
        </Typography>
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
