import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { ActivityFormInputs } from "../../../types/ActivityFormInput";
import { queryClient } from "../../../utils/queryClient";
import { deleteActivity, updateActivity } from "../services/Activities.query";

function useActivityList() {
  const [visibleEditActivity, setVisibleEditActivity] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<ActivityFormInputs | null>(null);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => updateActivity(id, data),
    mutationKey: ["updateActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activityList"] });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteActivity(id),
    mutationKey: ["deleteActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activityList"] });
    }
  });

  return {
    updateMutation,
    deleteMutation,
    visibleEditActivity,
    setVisibleEditActivity,
    selectedActivity,
    setSelectedActivity
  };
}
export default useActivityList;
