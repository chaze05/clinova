import { useMemo } from "react";

export default function TimeDropdown({
  disabledTimes = [],onChange,classes
}: {
  disabledTimes?: string[];
  onChange?: any;
  classes:string;
}) {
  // generate 30-min slots
  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    const timeValue = e.target.value;
    onChange(timeValue);
  }
  
  const timeSlots = useMemo(() => {
    const slots: string[] = [];

    for (let hour = 8; hour < 17; hour++) {
      for (const min of [0, 30]) {
        const h = hour.toString().padStart(2, "0");
        const m = min.toString().padStart(2, "0");
        slots.push(`${h}:${m}`);
      }
    }

    return slots;
  }, []);

  return (
    <select className={`w-full border p-3 rounded ${classes}`} onChange={handleChange}>
      <option value="">Select Time</option>

      {timeSlots.map((time) => {
        const isDisabled = disabledTimes.includes(time);

        return (
          <option key={time} value={time} disabled={isDisabled}>
            {formatTime(time)}
          </option>
        );
      })}
    </select>
  );
}

// optional formatting: 13:30 → 1:30 PM
function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date();
  date.setHours(h, m);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}