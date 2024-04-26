interface InfoCardProps {
  id: string;
  brightness: number;
  distance: number;
  lastUpdated: string;
}

// not sure if this will be used
export default function InfoCard({
  id,
  brightness,
  distance,
  lastUpdated,
}: InfoCardProps) {
  return (
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
}
