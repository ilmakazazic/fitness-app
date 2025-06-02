import Dialog from "../../../../components/Dialog";
import { ActivityFormInputs } from "../../../../types/ActivityFormInput";
import ActivityForm from "../ActivityForm/ActivityForm";

interface Props {
  visible: boolean;
  onHide: () => void;
  activityToEdit?: ActivityFormInputs | null;
}

export default function ActivityDialog({ visible, onHide, activityToEdit }: Props) {
  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      header={activityToEdit ? "Edit Activity" : "Add New Activity"}
      resizable={false}
      draggable={false}
    >
      <ActivityForm onSuccess={onHide} activityToEdit={activityToEdit} />
    </Dialog>
  );
}
