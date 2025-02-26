import { useNavigate } from "react-router-dom";

const SlotTimes = ({ timeSlots, isBooked }) => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Select a Time Slot</h2>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {timeSlots.map((slot) => (
          <button
            key={slot.id}
            className={`px-6 py-3 rounded-lg font-medium border ${
              isBooked(slot) ? "border-red-700 text-red-700 bg-red-100" : "border-blue-700 text-blue-700 bg-blue-100" 
            }  transition hover:opacity-80`}
            onClick={() => navigate(`/book/${slot.id}`)}
          >
            {slot.time}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SlotTimes;
