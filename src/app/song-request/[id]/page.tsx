"use client";

import { ref, push } from "firebase/database";
import { db } from "@/constants";

import { SongRequestForm } from "@/components";
import { useEffect } from "react";
import { SongRequestFormData } from "@/interfaces";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const getPlayList = async () => {
    const { id } = await params;
    console.log(id);
  };

  const onSubmit = async (data: SongRequestFormData, callback: () => void) => {
    const { id } = await params;
    push(ref(db, "songRequest/" + id), {
      ...data,
    })
      .then(() => {
        callback();
        console.log("Data written successfully!");
      })
      .catch((error) => {
        console.error("Error writing data:", error);
      });
  };

  useEffect(() => {
    getPlayList();
  }, []);

  return (
    <div>
      <SongRequestForm onSubmit={onSubmit} />
    </div>
  );
}
