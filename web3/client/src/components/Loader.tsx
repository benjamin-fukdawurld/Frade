import React from "react";

type Props = {};

export default function Loader({}: Props) {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-700" />
    </div>
  );
}
