import { Calendar as PrimeCalendar, CalendarProps as PrimeCalendarProps } from "primereact/calendar";

export default function Calendar({ ...props }: PrimeCalendarProps) {
  return <PrimeCalendar {...props} className="w-full" />;
}
