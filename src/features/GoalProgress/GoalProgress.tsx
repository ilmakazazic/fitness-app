import moment from "moment";
import "moment/locale/en-gb";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { InputText } from "primereact/inputtext";
import Button from "../../components/Button";
import Calendar from "../../components/Calendar";
import CardContainer from "../../components/CardContainer";
import Dropdown from "../../components/Dropdown";
import { activityTypes } from "../../constants/ActivityType";
import ActivityList from "../ActivityList";
import useGoalProgress from "./hooks/useGoalProgress";

export default function GoalCalendar() {
  const {
    isLoading,
    filteredActivities,
    setDate,
    setSelectedActivityType,
    date,
    selectedActivityType,
    searchTerm,
    setSearchTerm,
    getDayStyle,
    goalTitle
  } = useGoalProgress();

  return (
    <>
      <CardContainer className="text-center gap-4 flex flex-col p-4 mt-4">
        <h1 className="text-lg md:text-xl p-4">{goalTitle}</h1>
        <div className="flex flex-col md:flex-row">
          <div className="md:p-4 max-w-md w-full mx-auto">
            <Calendar
              value={date}
              onChange={(e) => setDate(e.value ?? null)}
              inline
              dateTemplate={(date) => {
                const style = getDayStyle(new Date(date.year, date.month, date.day));
                return (
                  <div className={`w-8 h-8 flex items-center text-xs md:text-base justify-center ${style.className}`}>
                    {moment(date).date()}
                  </div>
                );
              }}
              className="text-xs md:text-base"
            />
          </div>
          <div className="flex flex-col justify-center pt-4 md:p-4 gap-4 max-w-4xl w-full">
            <IconField iconPosition="left" className="w-full">
              <InputIcon className="pi pi-search" />
              <InputText
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </IconField>
            <Dropdown
              value={selectedActivityType}
              onChange={(e) => setSelectedActivityType(e.value)}
              options={activityTypes}
              optionLabel="label"
              placeholder="Select Activity"
              className="w-full text-start md:w-14rem"
            />
            <Button
              label="Clear Filters"
              onClick={() => {
                setSelectedActivityType(null);
                setDate(null);
                setSearchTerm("");
              }}
            />
          </div>
        </div>
      </CardContainer>
      <ActivityList filteredActivities={filteredActivities} isLoading={isLoading} />
    </>
  );
}
