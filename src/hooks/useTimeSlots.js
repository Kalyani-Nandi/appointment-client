import { useState, useEffect } from "react";
import {
  format,
  isBefore,
  startOfDay,
  setHours,
  setMinutes,
  setSeconds,
} from "date-fns";

const useTimeSlots = (date, startHour, endHour, interval) => {
  const [slots, setSlots] = useState([]);

  

  useEffect(() => {
    const generateTimeSlots = () => {
      const newSlots = [];

      const today = startOfDay(new Date());

      const selectedDate = startOfDay(new Date(date));

      if (isBefore(selectedDate, today)) {
        setSlots([]);
        return;
      }

      const currentDate = setSeconds(
        setMinutes(setHours(new Date(date), 0), 0),
        0
      );

      for (let hour = startHour; hour < endHour; hour++) {
        for (let minutes = 0; minutes < 60; minutes += interval) {
          const slotTime = new Date(currentDate);
          slotTime.setHours(hour, minutes, 0);

          const dateTime = format(slotTime, "yyyy-MM-dd'T'HH:mm");
          const id = `${format(slotTime, "yyyyMMddHHmm")}-${Math.random()
            .toString(36)
            .substring(2, 8)}`;

          const time = format(slotTime, "hh:mm a");

          newSlots.push({ id, dateTime, time });
        }
      }

      setSlots(newSlots);
    };

    generateTimeSlots();
  }, [date, startHour, endHour, interval]);

  return slots;
};

export default useTimeSlots;
