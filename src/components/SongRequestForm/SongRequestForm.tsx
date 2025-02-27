"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

// Define the form data type
interface FormData {
  name: string;
  songTitle: string;
  artist?: string;
  tip: string;
}

export default function SongRequestForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: localStorage.getItem("userName") || "",
      songTitle: "",
      artist: "",
      tip: "",
    },
  });
  const [success, setSuccess] = useState<boolean>(false);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log("Form Data:", data);
    localStorage.setItem("userName", data.name);
    reset({
      name: data.name,
      songTitle: "",
      artist: "",
      tip: "",
    });
    setSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">Song Request Form</h2>

      {success && (
        <div className="p-4 bg-green-100 text-green-700 rounded">
          🎉 Success! Thanks for the TIP. Feel free to request another song.
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Your Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Song Title</label>
          <input
            type="text"
            {...register("songTitle", { required: "Song title is required" })}
            className="w-full mt-1 p-2 border rounded"
          />
          {errors.songTitle && (
            <p className="text-red-500 text-sm">{errors.songTitle.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Artist Name (Optional)
          </label>
          <input
            type="text"
            {...register("artist")}
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tip Amount</label>
          <select
            {...register("tip", { required: "Please select a tip amount" })}
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Select a tip</option>
            <option value="3">$3</option>
            <option value="5">$5</option>
            <option value="10">$10</option>
          </select>
          {errors.tip && (
            <p className="text-red-500 text-sm">{errors.tip.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
