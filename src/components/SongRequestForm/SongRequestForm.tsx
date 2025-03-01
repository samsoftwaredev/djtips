"use client";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  RadioGroup,
  FormLabel,
  FormControl,
  Radio,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { SongRequestFormData } from "@/interfaces";

interface Props {
  onSubmit: (data: SongRequestFormData) => void;
  song: SongRequestFormData | null;
}

const SongRequestForm = ({ onSubmit, song }: Props) => {
  const defaultTipAmount = "5";
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SongRequestFormData>({
    defaultValues: {
      name:
        typeof window !== "undefined"
          ? localStorage.getItem("userName") || ""
          : "",
      songTitle: song?.songTitle || "",
      artist: song?.artist || "",
      tip: song?.tip || defaultTipAmount, // default tip as a string
    },
  });

  const onSubmitForm: SubmitHandler<SongRequestFormData> = (data) => {
    localStorage.setItem("userName", data.name);
    onSubmit(data);
  };

  return (
    <Box maxWidth={400} mx="auto" my={4}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Song Request
        </Typography>

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

          <Controller
            name="tip"
            control={control}
            rules={{ required: "Please select a tip amount" }}
            render={({ field }) => (
              <FormControl
                component="fieldset"
                error={!!errors.tip}
                margin="normal"
              >
                <FormLabel component="legend">Tip Amount</FormLabel>
                <RadioGroup row {...field}>
                  {[
                    { value: "3", label: "$3" },
                    { value: "5", label: "$5" },
                    { value: "10", label: "$10" },
                  ].map(({ value, label }) => (
                    <FormControlLabel
                      key={value}
                      value={value}
                      control={<Radio />}
                      label={label}
                    />
                  ))}
                </RadioGroup>
                {errors.tip && (
                  <FormHelperText>{errors.tip.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Request Song
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default SongRequestForm;
