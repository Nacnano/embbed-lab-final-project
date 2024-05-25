"use client";

import StatusCard from "@/components/StatusCard";
import InfoCard, { InfoType } from "@/components/InfoCard";
import LoadingSpinner from "@/components/LoadingSpinner";
import StatusBar from "@/components/StatusBar";
import { Info } from "@/types/Info";
import Image from "next/image";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { calculateLuminosity, calculateLux } from "@/utils/physics";
import { membersList } from "@/data/memberList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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

      const [distanceData, resistanceData] = data
        ? data.split(",")
        : ["-1", "-1"];

      const brightnessData = calculateLux(parseInt(resistanceData));

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
    <div className="flex flex-col container mx-auto px-4 py-8 items-center text-center">
      <h1 className="text-3xl font-bold mb-2">Bus Stop Brightness</h1>

      <div className="flex flex-col w-1/3 items-center mt-5 mb-2 py-2 px-4  bg-gray-400 rounded-md text-xl font-medium">
        <a className="font-bold">NOTE : This project is currently offline.</a>
        Please view GitHub repository or contact members for more information
      </div>

      <a
        href="https://github.com/nacnano/embbed-lab-final-project"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-row items-center py-2 text-lg font-semibold gap-2 hover:text-blue-400"
      >
        View on GitHub
        <a className="text-3xl">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </a>

      <div className="flex flex-col text-lg pb-5">
        <a className="font-semibold text-xl">Made by</a>
        {membersList.map((member) => (
          <a key={member} className="font-normal">
            {member}
          </a>
        ))}
      </div>

      {valid ? (
        <div className="flex flex-col justify-center items-center gap-5">
          <StatusCard value={luminosty} />
          <div className="flex flex-row p-5 justify-center items-center gap-5 bg-gray-300 rounded-lg">
            <InfoCard type={InfoType.Distance} value={distance} />
            <InfoCard
              type={InfoType.Luminosity}
              value={Number(brightness.toFixed(2))}
            />
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
