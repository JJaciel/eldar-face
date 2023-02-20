import { UseFormRegister, RegisterOptions } from "react-hook-form";

export interface FormFieldProps {
  name: string;
  register: UseFormRegister<any>;
  isInvalid: boolean;
  label?: string;
  placeholder?: string;
  errorMessage?: string;
  helperText?: string;
  registerOptions?: RegisterOptions;
}
