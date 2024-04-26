import React, { CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

export default function LoadingSpinner() {
  return (
    <MoonLoader
      color="gray"
      cssOverride={override}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
}
