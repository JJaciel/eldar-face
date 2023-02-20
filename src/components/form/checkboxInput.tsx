import {
  FormControl,
  FormLabel,
  FormHelperText,
  Checkbox,
  CheckboxProps,
} from "@chakra-ui/react";
import { RegisterOptions } from "react-hook-form";

import { FormFieldProps } from "./form.types";

interface CheckboxInputProps extends CheckboxProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  registerOptions?: RegisterOptions;
}

export const CheckboxInput = (props: CheckboxInputProps) => {
  const {
    register,
    name,
    label,
    placeholder,
    isInvalid,
    errorMessage,
    helperText,
    registerOptions = {},
    ...styleProps
  } = props as FormFieldProps;

  return (
    <FormControl
      key={name}
      isRequired={!!registerOptions?.required}
      label={label}
      isInvalid={isInvalid}
    >
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <Checkbox {...register(name, registerOptions)} {...styleProps}>
        {placeholder}
      </Checkbox>
      {helperText && (
        <FormHelperText position="absolute">{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
