import { threshold } from "@/data/threshold";

export default function StatusBar() {
  return (
    <>
      <div className="flex w-full h-8 rounded my-5">
        <div
          className="h-full bg-amber-500 rounded-l-lg"
          style={{ width: "30%" }}
        ></div>
        <div className="h-full bg-green-500" style={{ width: "40%" }}></div>
        <div
          className="h-full bg-red-500 rounded-r-lg"
          style={{ width: "30%" }}
        ></div>
      </div>
    </>
  );
}
