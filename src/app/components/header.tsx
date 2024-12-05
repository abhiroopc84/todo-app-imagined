import React from "react";
import { format, addDays } from "date-fns";
import { useDateStore } from "@/state/dateStore";
import classNames from "classnames";

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const Header = () => {
  const { selectedDate, setSelectedDate } = useDateStore();

  const startOfWeek = addDays(selectedDate, -selectedDate.getDay());
  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(startOfWeek, index)
  );

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="fixed top-0 flex flex-col p-4 rounded-b-2xl border bg-white shadow-2xl shadow-gray-300 w-full z-50">
      <h1 className="text-2xl font-bold mb-4">
        {daysOfWeek[selectedDate.getDay()]}
      </h1>
      <div className="flex justify-between items-center w-full gap-2">
        {weekDays.map((date, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(date)}
            className={classNames(
              "flex flex-col items-center p-3 w-full rounded-xl",
            )}
          >
            <span
              className={classNames(
                "text-xs font-semibold",
              )}
            >
              {daysOfWeek[index][0]}
            </span>
            <span className="text-lg font-semibold">{format(date, "d")}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
