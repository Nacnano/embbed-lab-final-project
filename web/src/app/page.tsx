"use client";

import StatusCard from "@/components/BrightnessCard";
import InfoCard, { InfoType } from "@/components/InfoCard";
import { Info } from "@/types/Info";
import { mock } from "node:test";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState<Info>();

  useEffect(() => {
    // TODO : add database connection instead of mock data
    const mockData = {
      id: "1",
      luminosity: 800,
      distance: 2,
      lastUpdated: "2024-04-26 10:30:00",
    };
    setData(mockData);
  }, []);

  const brightness = data
    ? data.luminosity / (4 * Math.PI * data.distance ** 2)
    : -1;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center mb-8">Bus Stop Brightness</h1>

      {data ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <StatusCard value={brightness} />
          <div className="flex flex-row justify-center items-center gap-5">
            <InfoCard type={InfoType.Distance} value={data.distance} />
            <InfoCard type={InfoType.Luminosity} value={data.luminosity} />
          </div>
        </div>
      ) : (
        "Loading, please wait"
      )}
    </div>
  );
};

export default Home;
