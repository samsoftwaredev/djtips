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

interface FormData {
  name: string;
  songTitle: string;
  artist?: string;
  tip: string;
}

export default function SongRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("userName", data.name);
    reset({
      name: data.name,
      songTitle: "",
      artist: "",
      tip: "",
    });
    setSuccess(true);
  };

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Song Request Form
        </Typography>

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            🎉 Success! Thanks for the TIP. Feel free to request another song.
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            label="Your Name"
            margin="normal"
            {...register("name", { required: "Name is required" })}
            error={!!errors.name}
            helperText={errors.name?.message}
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
            label="Artist Name (Optional)"
            margin="normal"
            {...register("artist")}
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
            Submit
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
