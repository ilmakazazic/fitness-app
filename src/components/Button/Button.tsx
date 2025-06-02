import { Button as PrimeButton, ButtonProps as PrimeButtonProps } from "primereact/button";

interface IButtonProps extends PrimeButtonProps {
  label?: string | undefined;
  iconPosition?: string | undefined;
}

export default function Button({ ...props }: IButtonProps) {
  return <PrimeButton {...props} />;
}
