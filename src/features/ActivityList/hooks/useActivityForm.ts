import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ActivityFormInputs } from "../../../types/ActivityFormInput";
import { queryClient } from "../../../utils/queryClient";
import { addActivity, updateActivity } from "../services/Activities.query";

function useActivityForm(activityToEdit?: ActivityFormInputs | null, onSuccess?: () => void) {
  const addActivityForm = useForm<ActivityFormInputs>({
    defaultValues: activityToEdit
      ? {
          ...activityToEdit,
          date: new Date(activityToEdit.date),
          time: new Date(activityToEdit.time)
        }
      : {
          title: "",
          description: "",
          date: new Date(),
          time: new Date(),
          type: "",
          duration: 30
        }
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = addActivityForm;

  const saveNewActivity = useMutation({
    mutationFn: (data: ActivityFormInputs) =>
      !!activityToEdit ? updateActivity(activityToEdit.id, data) : addActivity(data),
    mutationKey: ["addActivity"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activityList"] });
      if (onSuccess) {
        onSuccess();
      }
    }
  });

  const onSubmit = (data: ActivityFormInputs) => {
    saveNewActivity.mutate(data);
  };

  return {
    addActivityForm,
    handleSubmit,
    control,
    errors,
    onSubmit
  };
}

export default useActivityForm;
