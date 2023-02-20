import {
  Input,
  InputProps,
  FormControl,
  FormLabel,
  FormHelperText,
  InputGroup,
  FormErrorMessage,
  InputRightElement,
  FormErrorIcon,
} from "@chakra-ui/react";
import { RegisterOptions } from "react-hook-form";

import { FormFieldProps } from "./form.types";

interface TextInputProps extends InputProps {
  name: string;
  label?: string;
  placeholder?: string;
  helperText?: string;
  registerOptions?: RegisterOptions;
}

export const TextInput = (props: TextInputProps) => {
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
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup>
        <Input
          fontSize={"sm"}
          placeholder={placeholder}
          {...register(name, registerOptions)}
          {...styleProps}
        />
        {isInvalid && (
          <InputRightElement>
            <FormErrorMessage m={0}>
              <FormErrorIcon />
            </FormErrorMessage>
          </InputRightElement>
        )}
      </InputGroup>
      {isInvalid && errorMessage ? (
        <FormErrorMessage position="absolute">{errorMessage}</FormErrorMessage>
      ) : (
        helperText && (
          <FormHelperText position="absolute">{helperText}</FormHelperText>
        )
      )}
    </FormControl>
  );
};
