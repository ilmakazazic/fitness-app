import { cn } from "../../utils/cnHelper";

interface CardContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function CardContainer({ children, className = "" }: CardContainerProps) {
  return <div className={cn("bg-white px-6 py-4 rounded-2xl drop-shadow-md", className)}>{children}</div>;
}
