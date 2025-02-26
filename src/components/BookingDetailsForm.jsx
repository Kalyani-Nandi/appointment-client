import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineAccessTime } from "react-icons/md";
import { SiGooglemeet } from "react-icons/si";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const BookingDetailsForm = ({
  formData,
  handleClear,
  handleChange,
  duration,
  date,
  time,
  isEdit,
}) => {
  const { firstName, lastName, phoneNumber } = formData || {};

  return (
    <div className="max-w-xl w-full space-y-6">
      <div className="w-full flex justify-between border-b">
        <h2 className="text-2xl font-bold text-gray-800 pb-4">
          {isEdit ? "Appointment Details" : "Book Appointment"}
        </h2>
        {isEdit && <button
          type="button"
          onClick={handleClear}
          className="px-4 py-2 text-red-600"
        >
          Clear
        </button>}
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <FaUserCircle className="text-6xl text-gray-500" />
          <div>
            <p className="text-xl font-semibold text-gray-800">
              {firstName || "Guest"} {lastName || ""}
            </p>
            <p className="text-gray-600">📞 {phoneNumber || "Not Provided"}</p>
          </div>
        </div>

        <div className="space-y-4">
          {["firstName", "lastName"].map((field) => (
            <input
              key={field}
              type="text"
              name={field}
              value={formData[field] || ""}
              onChange={handleChange}
              placeholder={field.replace(/([A-Z])/g, " $1").trim()}
              required
              className="w-full p-2 border rounded"
            />
          ))}
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber || ""}
            onChange={(value) =>
              handleChange({ target: { name: "phoneNumber", value } })
            }
            defaultCountry="IN"
            required
            className="w-full p-2 border rounded focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-700">
          <MdOutlineAccessTime className="text-2xl" />
          <p>
            Duration: <span className="font-medium">{duration} minutes</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <SiGooglemeet className="text-2xl" />
          <p>
            Platform: <span className="font-medium">Google Meet</span>
          </p>
        </div>

        <div className="flex items-center gap-3 text-gray-700">
          <MdOutlineAccessTime className="text-2xl" />
          <p>
            Time:{" "}
            <span className="font-medium">
              {date} {time}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsForm;
