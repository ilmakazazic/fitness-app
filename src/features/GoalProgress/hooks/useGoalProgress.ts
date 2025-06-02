import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useMemo, useState } from "react";
import { ActivityFormInputs } from "../../../types/ActivityFormInput";
import { getActivities } from "../../ActivityList/services/Activities.query";
import { getUserGoal } from "../services/Goal.query";

function useGoalProgress() {
  const [date, setDate] = useState<Date | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivityType, setSelectedActivityType] = useState(null);

  const useGetActivityListQuery = () =>
    useQuery({
      queryKey: ["activityList"],
      queryFn: () => getActivities()
    });

  const { data: activities, isLoading, isError } = useGetActivityListQuery();

  const useGetUserGoalQuery = () =>
    useQuery({
      queryKey: ["getGoal", "user123"],
      queryFn: () => getUserGoal("user123")
    });

  const { data: userGoal } = useGetUserGoalQuery();

  const filteredActivities = useMemo(() => {
    return (activities ?? [])?.filter((activity: ActivityFormInputs) => {
      const matchDate = date ? new Date(activity.date).toDateString() === date.toDateString() : true;
      const matchType = selectedActivityType ? activity.type === selectedActivityType : true;
      const matchSearch = searchTerm
        ? activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          activity.description?.toLowerCase().includes(searchTerm.toLowerCase())
        : true;
      return matchDate && matchType && matchSearch;
    });
  }, [activities, date, selectedActivityType, searchTerm]);

  const activityMap: Record<string, ActivityFormInputs[]> = {};

  (activities ?? []).forEach((activity: any) => {
    const day = moment(activity.date).format("YYYY-MM-DD");
    if (!activityMap[day]) {
      activityMap[day] = [];
    }
    activityMap[day].push(activity);
  });

  function getWeekActivities(weekStart: moment.Moment): ActivityFormInputs[] {
    return activities.filter((activity: any) => {
      const activityDate = moment(activity.date);
      return (
        activityDate.isSameOrAfter(weekStart, "day") && activityDate.isBefore(moment(weekStart).add(7, "days"), "day")
      );
    });
  }

  const getDayStyle = (date: Date) => {
    const key = moment(date).format("YYYY-MM-DD");
    const dayActivities = activityMap[key] || [];

    debugger;
    if (!userGoal) return {};

    let meetsGoal = false;

    if (userGoal[0].frequency === "daily") {
      if (userGoal[0].type === "count") {
        meetsGoal = dayActivities.length >= Number(userGoal[0].value);
      } else if (userGoal[0].type === "duration") {
        const totalDuration = dayActivities.reduce((sum, act) => sum + Number(act.duration), 0);
        meetsGoal = totalDuration >= Number(userGoal[0].value);
      }
    }

    if (userGoal[0].frequency === "weekly") {
      const weekStart = moment(date).startOf("week");
      const weekActivities = getWeekActivities(weekStart);

      meetsGoal =
        userGoal[0].type === "count"
          ? weekActivities.length >= Number(userGoal[0].value)
          : weekActivities.reduce((acc, act) => acc + Number(act.duration), 0) >= Number(userGoal[0].value);
    }

    return {
      className: meetsGoal ? "bg-green-200 rounded-full" : "bg-red-200 rounded-full"
    };
  };

  const { value, frequency, type } = userGoal?.[0] || {};

  const goalTitle = `Your current goal is set to ${value} ${
    type === "count" ? (value === "1" ? "activity" : "activities") : "minutes"
  } with a ${frequency} frequency.`;

  return {
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
  };
}

export default useGoalProgress;
