import { threshold } from "@/data/threshold";
import React from "react";

interface StatusCardProps {
  value: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ value }) => {
  let brightnessStatus = "";
  let backgroundColor = "";
  if (value > threshold.bright) {
    brightnessStatus = "Too Bright";
    backgroundColor = "red-500";
  } else if (value < threshold.dark) {
    brightnessStatus = "Too Dark";
    backgroundColor = "red-500";
  } else {
    brightnessStatus = "OK";
    backgroundColor = "green";
  }

  return (
    <div
      className={`w-40 h-40 rounded-lg justify-center items-center pt-2 shadow-md ${
        threshold.dark <= value && value <= threshold.dark
          ? "bg-green-400"
          : "bg-amber-400"
      }`}
    >
      <div className="text-center font-extrabold text-xl">
        <span
          className={`${
            threshold.dark <= value && value <= threshold.dark
              ? "text-green-900"
              : "text-amber-900"
          }`}
        >
          {brightnessStatus}
        </span>
      </div>
      <div className="text-center font-bold text-lg">Brightness</div>
      <div className={`text-center font-extrabold text-4xl`}>
        {value.toFixed(2)}
      </div>
      <div className="text-center font-bold text-3xl">lux</div>
    </div>
  );
};

export default StatusCard;