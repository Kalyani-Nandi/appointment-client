import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DateCalendar from "../components/Calendar";
import BookingDetailsForm from "../components/BookingDetailsForm";
import useSlotDetails from "../hooks/useSlotDetails";

const BookAppointment = () => {
  const { timeSlot } = useParams();
  const navigate = useNavigate();

  const { date, time, duration, fullDateTime } = useSlotDetails(timeSlot, 30);

  const encodedDateTime = new Date(fullDateTime).toISOString();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  useEffect(() => {
    if (!encodedDateTime) return;

    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}appointments/${encodedDateTime}`
        );
        setFormData(data || { firstName: "", lastName: "", phoneNumber: "" });
      } catch (err) {
        console.error("Error fetching appointment:", err);
        setIsEdit(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [encodedDateTime]);

  const handleChange = (e) => {
    const { name, value } = e.target || e;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (value) setFormError("");
  };

  const formatFieldName = (name) => {
    return (
      name.charAt(0).toUpperCase() +
      name
        .slice(1)
        .replace(/([A-Z])/g, " $1")
        .trim()
    );
  };

  const validateForm = () => {
    for (const key in formData) {
      if (!formData[key]) {
        setFormError(`${formatFieldName(key)} is required`);
        return false;
      }
    }
    if (!/^\+91\d{10}$/.test(formData.phoneNumber)) {
      setFormError("Phone number is invalid !");
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!encodedDateTime || !validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}appointments`, {
        timeSlot: encodedDateTime,
        ...formData,
      });
      navigate("/");
    } catch (err) {
      console.error("Error saving appointment:", err);
    }
  };

  const handleClear = async () => {
    if (!encodedDateTime) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}appointments/${encodedDateTime}`
      );
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  if (loading)
    return (
      <div className="flex flex-col gap-6 items-center min-h-screen justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-4">
        Book Appointment: {new Date(fullDateTime).toDateString()} {time}
      </h1>

      <div className="rounded-lg shadow-md bg-white w-full max-w-4xl">
        <div className="flex flex-col md:flex-row md:items-start items-center justify-between gap-6 p-4 md:p-8">
          <div className="w-full md:w-2/3">
            <BookingDetailsForm
              formData={formData}
              handleChange={handleChange}
              handleClear={handleClear}
              timeSlot={timeSlot}
              date={date}
              time={time}
              duration={duration}
              isEdit={isEdit}
            />

            {formError && <div className="text-red-500 mt-2">{formError}</div>}
          </div>

          <DateCalendar
            value={new Date(fullDateTime)}
            maxDate={new Date(fullDateTime)}
          />
        </div>

        <div className="flex justify-end gap-4 mt-6 p-8">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;