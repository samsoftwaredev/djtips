"use client";

import { SongRequestForm } from "@/components";
import { useEffect } from "react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const getPlayList = async () => {
    const { id } = await params;
    console.log(id);
  };

  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <div>
      <SongRequestForm />
    </div>
  );
}
