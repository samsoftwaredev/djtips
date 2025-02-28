"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Typography,
  Alert,
  Paper,
} from "@mui/material";
import { SongRequestFormData } from "@/interfaces";

interface Props {
  onSubmit: (data: SongRequestFormData, callback: () => void) => void;
}

const SongRequestForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SongRequestFormData>({
    defaultValues: {
      name:
        typeof window !== "undefined"
          ? localStorage.getItem("userName") || ""
          : "",
      songTitle: "",
      artist: "",
      tip: "",
    },
  });
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmitForm: SubmitHandler<SongRequestFormData> = (data) => {
    localStorage.setItem("userName", data.name);
    onSubmit(data, () => {
      reset({
        name: data.name,
        songTitle: "",
        artist: "",
        tip: "",
      });
      setSuccess(true);
    });
  };

  return (
    <Box maxWidth={400} mx="auto" my={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Song Request
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            🎉 Success! Thanks for the TIP. Feel free to request another song.
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmitForm)}>
          <TextField
            fullWidth
            label="Artist Name"
            margin="normal"
            {...register("artist", { required: "Artist name is required" })}
            error={!!errors.artist}
            helperText={errors.artist?.message}
          />

          <TextField
            fullWidth
            label="Song Title"
            margin="normal"
            {...register("songTitle", { required: "Song title is required" })}
            error={!!errors.songTitle}
            helperText={errors.songTitle?.message}
          />

          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />

          <TextField
            select
            fullWidth
            label="Tip Amount"
            margin="normal"
            {...register("tip", { required: "Please select a tip amount" })}
            error={!!errors.tip}
            helperText={errors.tip?.message}
          >
            <MenuItem value="">Select a tip</MenuItem>
            <MenuItem value="3">$3</MenuItem>
            <MenuItem value="5">$5</MenuItem>
            <MenuItem value="10">$10</MenuItem>
          </TextField>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Make Payment & Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SongRequestForm;
