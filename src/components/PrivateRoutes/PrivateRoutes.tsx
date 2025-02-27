"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";

interface Props {
  children?: React.ReactNode;
}

const PrivateRoutes = ({ children }: Props) => {
  const { user } = useAuth();
  if (!user) {
    redirect("/login");
  }

  return <> {children} </>;
};

export default PrivateRoutes;
