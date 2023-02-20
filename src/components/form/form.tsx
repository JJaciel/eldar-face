import React from "react";
import {
  useForm,
  DefaultValues,
  SubmitHandler,
  FieldValues,
  ValidationMode,
} from "react-hook-form";
import { Stack } from "@chakra-ui/react";

import { FormFieldProps } from "./form.types";

interface FormProps<V extends FieldValues> {
  defaultValues: DefaultValues<V>;
  onSubmit: SubmitHandler<V>;
  children: React.ReactNode;
  formMode?: keyof ValidationMode;
}

export function Form<V extends { [x: string]: any }>({
  defaultValues,
  children,
  onSubmit,
  formMode,
}: FormProps<V>) {
  const { handleSubmit, formState, register } = useForm({
    defaultValues,
    mode: formMode,
  });

  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={8} p={1}>
        {React.Children.map(children, (child) => {
          if (
            !React.isValidElement<FormFieldProps>(child) ||
            !child.props.name
          ) {
            return child;
          }

          const { name, registerOptions } = child.props;

          const errorMessage = errors[name]?.message as string;

          const formStateProps = {
            key: name,
            name,
            register,
            registerOptions,
            isInvalid: !!errors[name],
            errorMessage,
          };

          return React.createElement<FormFieldProps>(child.type, {
            ...{
              ...child.props,
              ...formStateProps,
            },
          });
        })}
      </Stack>
    </form>
  );
}
