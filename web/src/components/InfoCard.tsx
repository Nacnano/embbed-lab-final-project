export enum InfoType {
  Distance = "Distance",
  Luminosity = "Luminosity",
}

interface InfoCardProps {
  value: number;
  type: InfoType;
}

export default function InfoCard({ type, value }: InfoCardProps) {
  let title = "";
  let unit = "";
  let color = "";
  let processedValue = "";

  switch (type) {
    case InfoType.Distance:
      title = "Distance";
      unit = "cm";
      color = "blue-500";
      processedValue =
        2 <= value && value <= 800 ? String(value) : "Out of range";
      break;
    case InfoType.Luminosity:
      title = "Brightness";
      unit = "lux";
      color = "blue-500";
      processedValue = String(value);
      break;
    default:
      title = "untitled";
      unit = "unknown";
      color = "gray-500";
      processedValue = String(value);
      break;
  }

  return (
    <div
      className="w-40 h-40 bg-white rounded-lg justify-center items-center pt-5"
      style={{ boxShadow: "6px 6px 10px -1px rgba(0,0,0,0.15)" }}
    >
      <div className="text-center font-bold text-lg">{title}</div>
      {processedValue == String(value) ? (
        <div>
          <div className={`text-center font-extrabold text-4xl text-${color}`}>
            {processedValue}
          </div>
          <div className={`text-center font-bold text-3xl text-${color}`}>
            {unit}
          </div>
        </div>
      ) : (
        <div className={`text-center font-extrabold text-2xl text-${color}`}>
          {processedValue}
        </div>
      )}
    </div>
  );
}
