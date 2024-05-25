import { threshold } from "@/data/threshold";
import React from "react";

interface StatusCardProps {
  value: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ value }) => {
  let luminosityStatus = "";
  let backgroundColor = "";

  if (value > threshold.bright) {
    luminosityStatus = "Too Bright";
    backgroundColor = "bg-red-500";
  } else if (value < threshold.dark) {
    luminosityStatus = "Too Dark";
    backgroundColor = "bg-red-500";
  } else if (value == threshold.error) {
    luminosityStatus = "Error";
    backgroundColor = "bg-red-500";
  } else {
    luminosityStatus = "OK";
    backgroundColor = "bg-green-400";
  }

  return (
    <div
      className={`inline-block min-w-min max-w-full px-4 py-2 rounded-lg shadow-md ${backgroundColor}`}
    >
      <div className="flex flex-col items-center">
        <div className="text-center font-extrabold text-xl">
          <span
            className={`${
              backgroundColor === "bg-green-400"
                ? "text-green-900"
                : "text-red-900"
            }`}
          >
            {luminosityStatus}
          </span>
        </div>
        <div className="text-center font-bold text-lg">Luminosity</div>
        <div className="text-center font-extrabold text-4xl">
          {value != threshold.error ? value.toFixed(2) : "out of range"}
        </div>
        <div className="text-center font-bold text-3xl">lumen</div>
      </div>
    </div>
  );
};

export default StatusCard;
