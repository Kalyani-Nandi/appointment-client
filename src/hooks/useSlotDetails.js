import { useEffect, useMemo } from "react";
import { parse, format } from "date-fns";
import { useNavigate } from "react-router-dom";

const useSlotDetails = (id, interval = 30) => {
  const navigate = useNavigate();

  const isValidDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return !isNaN(date.getTime());
  };

  useEffect(() => {
    if (!id) {
      console.error("Missing time slot ID.");
      navigate("/not-found");
      return;
    }

    const [dateTimePart] = id.split("-");
    if (!isValidDateTime(parse(dateTimePart, "yyyyMMddHHmm", new Date()))) {
      console.error("Invalid time slot format:", id);
      navigate("/not-found");
    }
  }, [id, navigate]);

  const slotDetails = useMemo(() => {
    if (!id) return null;

    try {
      const [dateTimePart] = id.split("-");
      const parsedDate = parse(dateTimePart, "yyyyMMddHHmm", new Date());

      if (isNaN(parsedDate)) {
        console.error("Error: Failed to parse date.");
        return null;
      }

      const fullDateTime = parsedDate.toString();
      const date = format(parsedDate, "yyyy-MM-dd");
      const time = format(parsedDate, "hh:mm a");
      const encodedDateTime = format(parsedDate, "yyyy-MM-dd'T'HH:mm");

      const endTime = new Date(parsedDate.getTime() + interval * 60000);
      const duration = `${time} - ${format(endTime, "hh:mm a")}`;

      return { date, time, encodedDateTime, duration, fullDateTime };
    } catch (error) {
      console.error("Error parsing slot ID:", error);
      return null;
    }
  }, [id, interval]);

  return slotDetails;
};

export default useSlotDetails;
