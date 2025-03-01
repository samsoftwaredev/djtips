"use client";
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
import { ref, update } from "firebase/database";
import { db } from "@/constants";
import { useAuth } from "@/hooks";
import { Song } from "@/interfaces";
import { formatCurrency } from "@/utils";

interface Props {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
}

const Playlist = ({ songs, setSongs }: Props) => {
  const { user } = useAuth();
  const visibleSongs = songs.filter((song) => song.visible !== false);

  const hideSong = (id: string) => {
    setSongs(songs.filter((song) => song.id !== id));
    update(ref(db, "songRequest/" + user?.uid + "/" + id), {
      visible: false,
      updateAt: new Date().toISOString(),
    })
      .then(() => {
        console.log("Data updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <Box maxWidth={500} width="100%" mx="auto">
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Song Requested
        </Typography>
        {visibleSongs.length === 0 && (
          <Typography variant="body1" color="textSecondary">
            No songs in the queue.
          </Typography>
        )}
        <List>
          {visibleSongs.map((song, index) => {
            let priorityStyles = "";
            if (song.tip === 5) priorityStyles = "orange";
            else if (song.tip === 10) priorityStyles = "red";
            return (
              <ListItem
                key={song.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => hideSong(song.id)}
                  >
                    <IoMdClose />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar
                    style={{ background: priorityStyles }}
                    src={song.imageUrl}
                    alt={song.userName}
                  />
                </ListItemAvatar>
                <ListItemText
                  style={{ color: priorityStyles }}
                  primaryTypographyProps={{ fontWeight: "bold" }}
                  primary={`#${index + 1} - ${song.songTitle} by ${
                    song.artist
                  }`}
                  secondary={
                    `Requested by: ${song.userName} ` + formatCurrency(song.tip)
                  }
                />
              </ListItem>
            );
          })}
        </List>
      </Paper>
    </Box>
  );
};

export default Playlist;
