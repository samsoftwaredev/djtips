import Navbar from "../Navbar";

interface Props {
  children?: React.ReactNode;
  IsDjUser?: boolean;
}

const Layout = ({ children, IsDjUser = true }: Props) => {
  return (
    <>
      <Navbar IsDjUser={IsDjUser} />
      {children}
    </>
  );
};

export default Layout;
