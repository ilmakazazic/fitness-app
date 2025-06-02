import { Dialog as PrimeDialog, DialogProps as PrimeDialogProps } from "primereact/dialog";

export default function Dialog({ ...props }: PrimeDialogProps) {
  return <PrimeDialog {...props} className="w-4/5 md:w-[700px]" />;
}
