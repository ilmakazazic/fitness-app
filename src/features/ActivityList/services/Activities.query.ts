import { ActivityFormInputs } from "../../../types/ActivityFormInput";
import api from "../../../utils/api";

export async function getActivities() {
  const response = await api.get("/activities");
  return response.data;
}

export async function addActivity(data: ActivityFormInputs) {
  const response = await api.post(`/activities`, data);
  return response.data;
}

export async function updateActivity(id: string, data: ActivityFormInputs) {
  const response = await api.put(`/activities/${id}`, data);
  return response.data;
}

export async function deleteActivity(id: string) {
  const response = await api.delete(`/activities/${id}`);
  return response.data;
}
