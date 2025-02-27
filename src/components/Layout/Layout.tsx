import { Box, Container } from "@mui/material";
import Navbar from "../Navbar";

interface Props {
  children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ padding: "2rem 0" }}>
        {children}
      </Container>
      Layout
    </Box>
  );
};

export default Layout;
