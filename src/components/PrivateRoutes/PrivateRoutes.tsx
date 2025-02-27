"use client";

import { useAuth } from "@/hooks";
import { redirect } from "next/navigation";
import PageLoading from "../PageLoading";

interface Props {
  children?: React.ReactNode;
}

const PrivateRoutes = ({ children }: Props) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoading />;

  if (!user) redirect("/login");

  return children;
};

export default PrivateRoutes;
