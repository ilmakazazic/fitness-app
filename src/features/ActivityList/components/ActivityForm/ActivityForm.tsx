import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Controller, FormProvider } from "react-hook-form";
import Button from "../../../../components/Button";
import Calendar from "../../../../components/Calendar";
import Dropdown from "../../../../components/Dropdown";
import { activityTypes } from "../../../../constants/ActivityType";
import { ActivityFormInputs } from "../../../../types/ActivityFormInput";
import useActivityForm from "../../hooks/useActivityForm";

interface Props {
  onSuccess: () => void;
  activityToEdit?: ActivityFormInputs | null;
}

export default function ActivityForm({ onSuccess, activityToEdit }: Props) {
  const { addActivityForm, handleSubmit, control, errors, onSubmit } = useActivityForm(activityToEdit, onSuccess);

  return (
    <FormProvider {...addActivityForm}>
      <form id="add-activity" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: "Title is required" }}
            render={({ field }) => <InputText {...field} className="w-full" />}
          />
          {errors.title && <small className="text-red-500">{errors.title.message}</small>}
        </div>
        <div>
          <label className="block mb-1">Description</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <InputTextarea {...field} className="w-full" rows={3} />}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Date</label>
            <Controller
              name="date"
              control={control}
              rules={{ required: "Date is required" }}
              render={({ field }) => <Calendar {...field} dateFormat="yy-mm-dd" showIcon className="w-full" />}
            />
          </div>
          <div>
            <label className="block mb-1">Start Time</label>
            <Controller
              name="time"
              control={control}
              rules={{ required: "Time is required" }}
              render={({ field }) => <Calendar {...field} timeOnly hourFormat="24" showIcon className="w-full" />}
            />
            {errors.time && <small className="text-red-500">{errors.time.message}</small>}
          </div>
        </div>
        <div>
          <label className="block mb-1">Activity Type</label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Please select activity type" }}
            render={({ field }) => (
              <Dropdown {...field} options={activityTypes} placeholder="Select activity type" className="w-full" />
            )}
          />
          {errors.type && <small className="text-red-500">{errors.type.message}</small>}
        </div>
        <div>
          <label className="block mb-1">Duration (minutes)</label>
          <Controller
            name="duration"
            control={control}
            rules={{ required: true, min: 10 }}
            render={({ field }) => (
              <InputText
                {...field}
                value={field.value !== undefined && field.value !== null ? String(field.value) : ""}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (/^\d*$/.test(inputValue)) {
                    field.onChange(inputValue);
                  }
                }}
                placeholder="Enter duration in minutes"
                className="w-full"
              />
            )}
          />
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" severity="secondary" onClick={onSuccess} label="Cancel" />
          <Button type="submit" label={activityToEdit ? "Save Changes" : "Add Activity"} />
        </div>
      </form>
    </FormProvider>
  );
}
