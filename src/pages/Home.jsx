import { useEffect, useState } from "react";
import axios from "axios";
import useTimeSlots from "../hooks/useTimeSlots";
import SlotTimes from "../components/SlotTimes";
import DateCalendar from "../components/Calendar";
import { formatISO } from "date-fns";

const Home = () => {
  const [appointments, setAppointments] = useState([]);
  const [value, onChange] = useState(new Date());

  const timeSlots = useTimeSlots(value, 9, 17, 30);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(process.env.APP_URL + "appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  const isBooked = (slot) => {
    return appointments.some((a) => {
      const appointmentTime = new Date(a.timeSlot);
      const slotTime = new Date(slot.dateTime);
      return (
        !isNaN(appointmentTime) &&
        !isNaN(slotTime) &&
        appointmentTime.getTime() === slotTime.getTime()
      );
    });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-16 p-4 md:p-8 ">
      <DateCalendar value={value} onChange={onChange} />
      <div className="w-full md:w-2/3">
        <SlotTimes timeSlots={timeSlots} isBooked={isBooked} />
      </div>
    </div>
  );
};

export default Home;
