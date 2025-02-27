"use client";
// system imports
import { useForm, SubmitHandler } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { ImFacebook, ImTwitter, ImGoogle } from "react-icons/im";

// custom imports
import {
  TextField,
  Button,
  IconButton,
  Typography,
  Paper,
  Box,
  CircularProgress,
} from "@mui/material";
import { UserFormValues } from "@/interfaces";
import { emailSchema, passwordSchema, displayNameSchema } from "@/constants";
import { useAuth, useTheme } from "@/hooks";
import { toastify } from "@/utils/swal";
import Link from "next/link";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/navigation";

const Registration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormValues>();
  const router = useRouter();

  const { SignUp, loading } = useAuth();
  const { theme } = useTheme();

  const onSuccess = () => {
    toastify({
      message: "Registered successfully!",
      toast_type: "success",
      toast_theme: theme === "dark" ? "dark" : "light",
    });
    router.push("/dashboard");
  };
  const handleLogin: SubmitHandler<UserFormValues> = (creds) => {
    SignUp(creds, onSuccess);
  };

  return (
    <Layout>
      <Box maxWidth={400} mx="auto" mt={4}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" color="primary" gutterBottom>
            <FaUserCircle />
          </Typography>

          <form onSubmit={handleSubmit(handleLogin)}>
            <TextField
              fullWidth
              label="Name"
              margin="normal"
              {...register("displayName", displayNameSchema)}
              error={!!errors.displayName}
              helperText={errors.displayName?.message}
            />

            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email", emailSchema)}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              {...register("password", passwordSchema)}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
              startIcon={
                loading ? <CircularProgress size={20} /> : <RiLoginCircleFill />
              }
              disabled={loading}
            >
              Register
            </Button>
          </form>

          <Typography variant="body2" sx={{ mt: 2 }}>
            Already have an account?
            <Link
              href="/login"
              style={{
                textDecoration: "none",
                color: "#1976D2",
                marginLeft: "5px",
              }}
            >
              Login here
            </Link>
          </Typography>

          <Box display="flex" justifyContent="center" mt={2}>
            {[ImGoogle, ImFacebook, ImTwitter].map((Icon, index) => (
              <IconButton key={index} color="primary" sx={{ mx: 1 }}>
                <Icon size={24} />
              </IconButton>
            ))}
          </Box>
        </Paper>
      </Box>
    </Layout>
  );
};

export default Registration;
