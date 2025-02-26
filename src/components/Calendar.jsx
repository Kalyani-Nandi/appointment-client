import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function DateCalendar({ value, onChange, maxDate }) {
  const today = new Date();

  return (
    <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {maxDate ? "Selected Date" : "Select a Date"}
      </h2>

      <Calendar
        onChange={onChange}
        value={value}
        minDate={maxDate ?? today}
        maxDate={maxDate ?? null}
        className="w-full"
      />

      <p className="mt-4 text-gray-600">
        Selected Date: {value.toDateString()}
      </p>
    </div>
  );
}
