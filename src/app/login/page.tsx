"use client";
// system imports
import { useForm, SubmitHandler } from "react-hook-form";
import { MdEmail, MdPassword } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { RiLoginCircleFill } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  TextField,
  Button,
  Typography,
  IconButton,
  Box,
  Paper,
  Divider,
} from "@mui/material";
import { ImFacebook, ImTwitter, ImGoogle } from "react-icons/im";

// custom imports
import { LoginFormValues } from "@/interfaces";
import { ThemeSwitch } from "@/components";
import { useAuth, useTheme } from "@/hooks";
import { emailSchema, passwordSchema } from "@/constants";
import { toastify } from "@/utils/swal";
import Layout from "@/components/Layout/Layout";

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const { SignIn, SignInWithGoogle, loading } = useAuth();
  const { theme } = useTheme();

  const onSuccess = () => {
    toastify({
      message: "Logged in successfully!",
      toast_type: "success",
      toast_theme: theme === "dark" ? "dark" : "light",
    });
    router.push("/dashboard");
  };
  const handleLogin: SubmitHandler<LoginFormValues> = (creds) => {
    SignIn(creds, onSuccess);
  };

  return (
    <Layout>
      <ThemeSwitch />
      <Paper
        elevation={3}
        sx={{ padding: 3, maxWidth: 400, margin: "auto", marginTop: 5 }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <FaUserCircle size={50} />
        </Box>
        <form onSubmit={handleSubmit(handleLogin)}>
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            {...register("email", emailSchema)}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputProps={{ startAdornment: <MdEmail /> }}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            {...register("password", passwordSchema)}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{ startAdornment: <MdPassword /> }}
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            startIcon={<RiLoginCircleFill />}
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
        </form>
        <Typography variant="body2" textAlign="center" mt={2}>
          Don&apos;t have an account?
          <Link
            href="/signup"
            style={{ marginLeft: 4, color: "#1976d2", fontWeight: "bold" }}
          >
            Register here
          </Link>
        </Typography>
        <Divider sx={{ my: 3 }}>OR</Divider>
        <Box display="flex" justifyContent="center" gap={2}>
          <IconButton
            color="primary"
            onClick={() => SignInWithGoogle(onSuccess)}
          >
            <ImFacebook />
          </IconButton>
          <IconButton color="primary">
            <ImTwitter />
          </IconButton>
          <IconButton color="primary">
            <ImGoogle />
          </IconButton>
        </Box>
      </Paper>
    </Layout>
  );
};

export default Login;
