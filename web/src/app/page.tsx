"use client";

import StatusCard from "@/components/BrightnessCard";
import InfoCard, { InfoType } from "@/components/InfoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBar from "@/components/StatusBar";
import { Info } from "@/types/Info";
import Image from "next/image";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState<Info>();

  const thresholdColors = {
    "Too Dark": "blue",
    OK: "green",
    "Too Bright": "red",
  };
  const colorStops = [0, 20, 100, 100];
  const brightnessStatus = "Too Dark";

  const renderThumb = () => (
    <div
      style={{
        height: "20px",
        width: "20px",
        borderRadius: "50%",
        border: `2px solid ${thresholdColors[brightnessStatus]}`,
        boxShadow: "0px 2px 6px #AAA",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    />
  );

  useEffect(() => {
    // TODO : add database connection instead of mock data
    const mockData = {
      luminosity: 800,
      distance: 2,
    };
    setData(mockData);
  }, []);

  const brightness = data
    ? data.luminosity / (4 * Math.PI * data.distance ** 2)
    : -1;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 items-center">
      <h1 className="text-3xl text-center font-bold mb-8">
        Bus Stop Brightness
      </h1>
      {/* <StatusBar /> */}

      {data ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <StatusCard value={brightness} />
          <div className="flex flex-row p-5 justify-center items-center gap-5 bg-gray-300 rounded-lg">
            <InfoCard type={InfoType.Distance} value={data.distance} />
            <InfoCard type={InfoType.Luminosity} value={data.luminosity} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}

      <div className="flex flex-col py-5 items-center">
        Gen Phy 2 goes bruhhhh
        <Image
          src={"/lumens-vs-lux-diagram.jpg"}
          alt={"lumens-vs-lux-diagram"}
          width={400}
          height={800}
        />
      </div>
    </div>
  );
};

export default Home;
