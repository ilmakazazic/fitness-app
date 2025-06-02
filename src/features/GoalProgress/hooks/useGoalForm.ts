import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { UserGoal } from "../../../types/GoalType";
import { queryClient } from "../../../utils/queryClient";
import { addUserGoal, getUserGoal, updateUserGoal } from "../services/Goal.query";

function useGoalForm() {
  const goalForm = useForm<UserGoal>({
    defaultValues: {
      type: undefined,
      value: "",
      frequency: undefined
    }
  });

  const {
    handleSubmit,
    control,
    formState: { errors }
  } = goalForm;

  const addGoal = useMutation({
    mutationFn: async (data: UserGoal) => addUserGoal(data),
    mutationKey: ["addGoal"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getGoal", "user123"] });
    }
  });

  const updateGoal = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UserGoal }) => updateUserGoal(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getGoal", "user123"] });
    }
  });

  const onSubmit = async (data: UserGoal) => {
    const userId = "user123";
    const goalData = { ...data, userId };
    const existingGoal = await getUserGoal(userId);

    if (existingGoal && existingGoal.length > 0) {
      updateGoal.mutate({ id: existingGoal[0].id, data });
    } else {
      addGoal.mutate(goalData);
    }
  };
  return {
    goalForm,
    handleSubmit,
    control,
    errors,
    onSubmit
  };
}

export default useGoalForm;
