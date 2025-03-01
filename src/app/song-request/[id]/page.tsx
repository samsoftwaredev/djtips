import { SongRequestPage } from "@/components";

export default async function Page({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  return <SongRequestPage id={id} />;
}
