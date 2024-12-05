import React, { useState } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { useDateStore } from "@/state/dateStore";
import classNames from "classnames";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

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
  const [currentWeekStart, setCurrentWeekStart] = useState(
    startOfWeek(selectedDate, { weekStartsOn: 0 })
  );

  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(currentWeekStart, index)
  );

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  return (
    <div className="fixed top-0 flex flex-col py-4 rounded-b-2xl border bg-white shadow-2xl shadow-gray-300 w-full z-50">
      <h1 className="text-2xl font-bold mb-4 px-4">
        {daysOfWeek[selectedDate.getDay()]}
      </h1>
      <div className="flex items-center w-full gap-2">
        <button onClick={goToPreviousWeek} className="p-1">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <div className="flex justify-between items-center w-full gap-2 flex-1">
          {weekDays.map((date, index) => (
            <button
              key={index}
              onClick={() => handleDayClick(date)}
              className={classNames(
                "flex flex-col items-center p-2 w-full rounded-xl",
                format(date, "yyyy-MM-dd") ===
                  format(selectedDate, "yyyy-MM-dd") && "bg-black text-white"
              )}
            >
              <span
                className={classNames(
                  "text-xs font-semibold",
                  format(date, "yyyy-MM-dd") ===
                    format(selectedDate, "yyyy-MM-dd")
                    ? "bg-black text-white"
                    : "text-gray-400"
                )}
              >
                {daysOfWeek[index][0]}
              </span>
              <span className="text-lg font-semibold">{format(date, "d")}</span>
            </button>
          ))}
        </div>
        <button onClick={goToNextWeek} className="p-1">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default Header;
