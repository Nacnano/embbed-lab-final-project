"use client";

import StatusCard from "@/components/BrightnessCard";
import InfoCard, { InfoType } from "@/components/InfoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBar from "@/components/StatusBar";
import { Info } from "@/types/Info";
import Image from "next/image";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { calculateLuminosity, calculateLux } from "@/utils/physics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const Home = () => {
  const [brightness, setBrightness] = useState<number>();
  const [distance, setDistance] = useState<number>();

  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);

  useEffect(() => {
    const Ref = ref(database, "sensor");

    const unsub1 = onValue(Ref, (snapshot) => {
      const data = snapshot.val() as String;
      console.log(data);

      const [distanceData, adcData] = data ? data.split(",") : ["-1", "-1"];

      const brightnessData = calculateLux(parseInt(adcData));

      setDistance(parseInt(distanceData));
      setBrightness(brightnessData);
    });
    return () => {
      unsub1();
    };
  }, []);

  const valid = distance != undefined && brightness != undefined;

  const luminosty = valid ? calculateLuminosity(distance, brightness) : -1;

  return (
    <div className="flex flex-col container mx-auto px-4 py-8 items-center">
      <h1 className="text-3xl text-center font-bold mb-8">
        Bus Stop Brightness
      </h1>

      {valid ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <StatusCard value={luminosty} />
          <div className="flex flex-row p-5 justify-center items-center gap-5 bg-gray-300 rounded-lg">
            <InfoCard type={InfoType.Distance} value={distance} />
            <InfoCard type={InfoType.Luminosity} value={brightness} />
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}

      <div className="flex flex-col py-10 items-center">
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
