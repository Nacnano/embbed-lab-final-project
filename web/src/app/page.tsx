"use client";

import { Info } from "@/types/Info";
import { useState, useEffect } from "react";

interface InfoCardProp {
  id: string;
  brightness: number;
  lastUpdated: string;
}

const InfoCard = ({ id, brightness, lastUpdated }: InfoCardProp) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold mb-2">Bus Stop {id}</h2>
    <p className="mb-2">
      Brightness: <span className="font-bold">{brightness}%</span>
    </p>
    <p>
      Last Updated: <span>{lastUpdated}</span>
    </p>
  </div>
);

const Home = () => {
  const [data, setData] = useState<Info>();

  useEffect(() => {
    const mockData = {
      id: "1",
      brightness: 80,
      distance: 15,
      lastUpdated: "2024-04-26 10:30:00",
    };
    setData(mockData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-center mb-8">Bus Stop Brightness</h1>

      {data ? (
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div
            className="w-40 h-40 bg-white  rounded-lg justify-center items-center pt-5 "
            style={{ boxShadow: "6px 6px 10px -1px rgba(0,0,0,0.15)" }}
          >
            <div className="text-center font-bold text-lg">Distance</div>
            <div className="text-center font-extrabold text-5xl text-blue-500">
              {data.distance ? data.distance : "0"}
            </div>
            <div className="text-center font-bold text-4xl text-blue-500">
              meter
            </div>
          </div>

          <div
            className="w-40 h-40 bg-white  rounded-lg justify-center items-center pt-5 "
            style={{ boxShadow: "6px 6px 10px -1px rgba(0,0,0,0.15)" }}
          >
            <div className="text-center font-bold text-lg">Brightness</div>
            <div className="text-center font-extrabold text-5xl text-red-500">
              {data.brightness ? data.brightness : "0"}
            </div>
            <div className="text-center font-bold text-4xl text-red-500">
              lux
            </div>
          </div>
        </div>
      ) : (
        "Loading"
      )}
    </div>
  );
};

export default Home;
