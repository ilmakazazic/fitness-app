import Dialog from "../../../../components/Dialog";
import GoalForm from "../GoalForm";

interface Props {
  visible: boolean;
  onHide: () => void;
}

export default function GoalDialog({ visible, onHide }: Props) {
  return (
    <Dialog visible={visible} onHide={onHide} header={"Set Your Fitness Goal!"} resizable={false} draggable={false}>
      <GoalForm onSuccess={onHide} />
    </Dialog>
  );
}
