import { Button } from "primereact/button";
import { useState } from "react";
import ActivityDialog from "../ActivityList/components/ActivityDialog";
import GoalDialog from "../GoalProgress/components/GoalDialog";

export default function FitnessActivity() {
  const [visibleAddActivity, setVisibleAddActivity] = useState(false);
  const [visibleAddGoal, setVisibleAddGoal] = useState(false);

  return (
    <>
      <div className="flex justify-between mb-4 p-4 flex-col items-center md:p-8 md:flex-row">
        <h1 className="text-3xl">Fitness Activity</h1>
        <div className="flex p-4 gap-2 md:p-8 md:flex-row">
          <Button label="Add Activity" onClick={() => setVisibleAddActivity(true)} />
          <Button label="Set Goal" onClick={() => setVisibleAddGoal(true)} />
        </div>
      </div>
      <ActivityDialog visible={visibleAddActivity} onHide={() => setVisibleAddActivity(false)} />
      <GoalDialog visible={visibleAddGoal} onHide={() => setVisibleAddGoal(false)} />
    </>
  );
}
