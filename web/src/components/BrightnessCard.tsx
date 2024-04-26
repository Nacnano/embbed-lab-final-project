import React from "react";

interface StatusCardProps {
  value: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ value }) => {
  let brightnessStatus = "";
  if (value > 80) {
    brightnessStatus = "Too Bright";
  } else if (value < 20) {
    brightnessStatus = "Too Dark";
  } else {
    brightnessStatus = "OK";
  }

  return (
    <div className="w-40 h-40 bg-white rounded-lg justify-center items-center pt-5 shadow-md">
      <div className="text-center font-bold text-lg">Brightness</div>
      <div
        className={`text-center font-extrabold text-5xl text-blue-500"
        }`}
      >
        {value.toFixed(2)}
      </div>
      <div className="text-center font-bold text-4xl text-blue-500">lux</div>

      <div className="text-center font-bold">
        <span
          className={`${
            value > 80
              ? "text-red-500"
              : value < 20
              ? "text-blue-500"
              : "text-green-500"
          }`}
        >
          {brightnessStatus}
        </span>
      </div>
    </div>
  );
};

export default StatusCard;
