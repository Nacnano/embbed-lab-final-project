"use client";

import StatusCard from "@/components/BrightnessCard";
import InfoCard, { InfoType } from "@/components/InfoCard";
import { Info } from "@/types/Info";
import { useState, useEffect } from "react";

const Home = () => {
  const [data, setData] = useState<Info>();

  useEffect(() => {
    // TODO : add database connection instead of mock data
    const mockData = {
      id: "1",
      luminosity: 400,
      distance: 3,
      lastUpdated: "2024-04-26 10:30:00",
    };
    setData(mockData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center mb-8">Bus Stop Brightness</h1>

      {data ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <StatusCard
            value={data.luminosity / (4 * Math.PI * data.distance ** 2)}
          />
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
