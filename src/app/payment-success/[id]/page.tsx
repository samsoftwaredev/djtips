import { EmailReceiptPage } from "@/components";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) return null;
  return <EmailReceiptPage id={id} />;
}
