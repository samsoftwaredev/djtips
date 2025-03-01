import { Box, CircularProgress } from "@mui/material";

const PageLoading = () => {
  return (
    <Box
      justifyContent={"center"}
      display={"flex"}
      alignItems={"center"}
      height={"100vh"}
    >
      <CircularProgress size={20} />
    </Box>
  );
};

export default PageLoading;
