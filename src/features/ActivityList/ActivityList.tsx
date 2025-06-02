import moment from "moment";
import CardContainer from "../../components/CardContainer";
import { ActivityFormInputs } from "../../types/ActivityFormInput";
import ActivityDialog from "./components/ActivityDialog";
import useActivityList from "./hooks/useActivityList";

export default function ActivityList({
  isLoading,
  filteredActivities
}: {
  isLoading: boolean;
  filteredActivities: ActivityFormInputs[];
}) {
  const { deleteMutation, visibleEditActivity, setVisibleEditActivity, selectedActivity, setSelectedActivity } =
    useActivityList();

  return (
    <div className="text-center gap-4 flex flex-col p-4 mt-4">
      <h2 className="text-2xl">Activities List</h2>

      {isLoading && <p className="text-center text-lg">Loading activities...</p>}

      {!isLoading && (
        <>
          {filteredActivities.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No activities found for the selected filters.</p>
          ) : (
            <div className="grid grid-cols-1 pt-4 md:grid-cols-2 gap-6 w-full">
              {filteredActivities.map((activity: ActivityFormInputs) => (
                <CardContainer key={activity.id}>
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-semibold text-blue-500">{activity.title}</h3>{" "}
                      <div className="flex gap-2">
                        <i
                          className="pi pi-pencil"
                          onClick={() => {
                            setVisibleEditActivity(true);
                            setSelectedActivity(activity);
                          }}
                        />
                        <i className="pi pi-times" onClick={() => deleteMutation.mutate(activity.id)} />
                      </div>
                    </div>
                    <p className="text-gray-600 p-4">{activity.description}</p>
                    <div className="text-sm text-gray-500 md:grid md:grid-cols-2 gap-2">
                      <p>
                        <strong>Date:</strong> {moment(activity.date).format("YYYY-MM-DD")}
                      </p>
                      <p>
                        <strong>Time:</strong> {moment(activity.time).format("HH:mm")}
                      </p>
                      <p>
                        <strong>Duration:</strong> {activity.duration} min
                      </p>
                      <p>
                        <strong>Type:</strong> {activity.type}
                      </p>
                    </div>
                    <div className="mt-4 flex gap-2 justify-end">
                      <div />
                    </div>
                  </div>
                </CardContainer>
              ))}
            </div>
          )}
          <ActivityDialog
            visible={visibleEditActivity}
            onHide={() => setVisibleEditActivity(false)}
            activityToEdit={selectedActivity}
          />
        </>
      )}
    </div>
  );
}
