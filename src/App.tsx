import { QueryClientProvider } from "@tanstack/react-query";
import CardContainer from "./components/CardContainer";
import FitnessActivity from "./features/FitnessActivity";
import GoalProgress from "./features/GoalProgress";
import { queryClient } from "./utils/queryClient";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CardContainer>
        <FitnessActivity />
        <GoalProgress />
      </CardContainer>
    </QueryClientProvider>
  );
}
