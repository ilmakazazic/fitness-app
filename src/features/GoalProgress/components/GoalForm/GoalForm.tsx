import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Controller, FormProvider } from "react-hook-form";
import Button from "../../../../components/Button";
import { goalFrequencyOptions } from "../../../../constants/GoalFrequencyOptions";
import { goalTypeOptions } from "../../../../constants/GoalTypeOptions";
import useGoalForm from "../../hooks/useGoalForm";

interface Props {
  onSuccess: () => void;
}

export default function GoalForm({ onSuccess }: Props) {
  const { goalForm, handleSubmit, control, errors, onSubmit } = useGoalForm();

  return (
    <FormProvider {...goalForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Activity Type</label>
          <Controller
            name="type"
            control={control}
            rules={{ required: "Goal type is required" }}
            render={({ field }) => (
              <Dropdown {...field} options={goalTypeOptions} placeholder="Select goal type" className="w-full" />
            )}
          />
          {errors.type && <small className="text-red-500">{errors.type.message}</small>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Goal Value</label>
            <Controller
              name="value"
              control={control}
              rules={{
                required: "Goal value is required",
                validate: (v) => (!isNaN(Number(v)) && Number(v) > 0) || "Must be a positive number"
              }}
              render={({ field }) => (
                <InputText
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    if (/^\d*$/.test(inputValue)) {
                      field.onChange(inputValue);
                    }
                  }}
                  placeholder="Enter goal value"
                  className="w-full"
                />
              )}
            />
            {errors.value && <small className="text-red-500">{errors.value.message}</small>}
          </div>
          <div>
            <label className="block mb-1">Frequency</label>
            <Controller
              name="frequency"
              control={control}
              rules={{ required: "Frequency is required" }}
              render={({ field }) => (
                <Dropdown {...field} options={goalFrequencyOptions} placeholder="Select frequency" className="w-full" />
              )}
            />
            {errors.frequency && <small className="text-red-500">{errors.frequency.message}</small>}
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" severity="secondary" label="Cancel" />
          <Button type="submit" label="Save Goal" onClick={onSuccess} />
        </div>
      </form>
    </FormProvider>
  );
}
