import { SongRequestForm } from "@/components";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      {params.id}
      <SongRequestForm />
    </div>
  );
}
