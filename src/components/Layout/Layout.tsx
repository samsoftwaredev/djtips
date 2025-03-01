import Navbar from "../Navbar";

interface Props {
  children?: React.ReactNode;
  isNotDj?: boolean;
}

const Layout = ({ children, isNotDj = false }: Props) => {
  return (
    <>
      <Navbar isNotDj={isNotDj} />
      {children}
    </>
  );
};

export default Layout;
