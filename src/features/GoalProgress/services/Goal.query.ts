import { UserGoal } from "../../../types/GoalType";
import api from "../../../utils/api";

export async function getUserGoal(userId: string) {
  const response = await api.get(`/goal`, {
    params: { userId }
  });
  return response.data;
}

export async function addUserGoal(data: UserGoal) {
  const response = await api.post(`/goal`, data);
  return response.data;
}

export async function updateUserGoal(id: string, data: UserGoal) {
  const response = await api.put(`/goal/${id}`, data);
  return response.data;
}
