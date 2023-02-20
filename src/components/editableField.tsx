import { useState } from "react";
import { useForm, Resolver, SubmitErrorHandler } from "react-hook-form";

import {
  Flex,
  HStack,
  Editable,
  EditablePreview,
  EditableInput,
  EditableProps,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Input,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { RiHome2Line } from "react-icons/ri";

import React from "react";

const EditableControls = ({ isLoading }: { isLoading: boolean }) => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  if (isEditing) {
    return (
      <ButtonGroup justifyContent="start" size="sm" spacing={2} ml={2}>
        <IconButton
          aria-label="update username"
          icon={<CheckIcon />}
          {...getSubmitButtonProps()}
        />
        <IconButton
          aria-label="cancel update"
          icon={<CloseIcon boxSize={3} />}
          {...getCancelButtonProps()}
        />
      </ButtonGroup>
    );
  }

  if (isLoading) {
    return (
      <Flex alignItems="center">
        <Spinner />
      </Flex>
    );
  }

  return null;
};

const resolver: Resolver<{ editable: string }> = ({ editable }, ctx, opts) => {
  const getError = (value: string) => {
    if (!value)
      return {
        type: "required",
        message: "Required.",
        value,
      };
    if (value.length < 3)
      return {
        type: "min-length",
        message: "At least 3.",
        value,
      };
    if (value.length > 30)
      return {
        type: "max-length",
        message: "Not more than 30.",
        value,
      };
    return null;
  };
  const error = getError(editable);
  return {
    values: editable ? { editable } : {},
    errors: error
      ? {
          editable: error,
        }
      : {},
  };
};

interface EditableFieldProps extends EditableProps {
  placeholder?: string;
  editableValue: string;
  handleSubmit: ({ value }: { value: string }) => Promise<void>;
  label: string;
  isLoading: boolean;
}

export const EditableField: React.FC<EditableFieldProps> = ({
  placeholder,
  editableValue,
  handleSubmit,
  label,
  isLoading,
  ...rest
}) => {
  const [inputValue, setInputValue] = useState(editableValue || "");
  const [invalidValue, setInvalidValue] = useState("");

  const {
    handleSubmit: formHandleSubmit,
    register,
    resetField,
    formState: { errors, isValid, isSubmitting },
  } = useForm<{ editable: string }>({
    values: {
      editable: editableValue,
    },
    mode: "onSubmit",
    defaultValues: {
      editable: editableValue,
    },
    resolver,
  });

  const onSubmit = async ({ editable }: { editable: string }) => {
    handleSubmit({ value: editable });
    setInvalidValue("");
  };

  const onInvalidSubmit: SubmitErrorHandler<{
    editable: {
      type: string;
      message: string;
      value: string;
    };
  }> = async (error) => {
    const { editable = {} } = error;
    const { value } = editable;
    const invalidValue = (value || "") as string;
    setInvalidValue(invalidValue);

    resetField("editable", {
      keepError: true,
      keepDirty: true,
      keepTouched: true,
      defaultValue: editableValue,
    });
    setTimeout(() => {
      setInputValue(editableValue);
    }, 200);
  };

  return (
    <>
      <FormControl maxW="320px" isInvalid={errors.editable && !isValid}>
        <FormLabel htmlFor="editable">{label}</FormLabel>
        <HStack>
          <Icon as={RiHome2Line} />
          <Editable
            isDisabled={isSubmitting || isLoading}
            h="44px"
            value={inputValue}
            onChange={(input) => {
              setInputValue(input);
            }}
            onSubmit={(nextValue) => {
              formHandleSubmit(onSubmit, onInvalidSubmit)();
            }}
            placeholder={placeholder}
            isPreviewFocusable={true}
            selectAllOnFocus={false}
            submitOnBlur={false}
            startWithEditView={true}
          >
            <HStack>
              <EditablePreview
                py={2}
                px={4}
                boxShadow="md"
                w="200px"
                h="44px"
                textAlign="left"
                bgColor="light.secondary.container"
                color="light.secondary.onContainer"
                _hover={{
                  bgColor: "light.primary.container",
                  color: "light.primary.onContainer",
                }}
                _loading={{
                  bgColor: "light.secondary.container",
                }}
              />
              <Input
                as={EditableInput}
                py={2}
                border="none"
                borderColor="transparent"
                boxShadow="md"
                h="44px"
                w="200px"
                textAlign="left"
                bgColor="light.primary.container"
                color="light.primary.onContainer"
                focusBorderColor="transparent"
                _focusVisible={{
                  boxShadow: "md",
                }}
                {...register("editable")}
              />
              <EditableControls isLoading={isLoading} />
            </HStack>
          </Editable>
        </HStack>
        {errors.editable &&
          (!!invalidValue ? (
            <FormErrorMessage>{`"${invalidValue}" - ${errors.editable.message}`}</FormErrorMessage>
          ) : (
            <FormErrorMessage>{`${errors.editable.message}`}</FormErrorMessage>
          ))}
      </FormControl>
    </>
  );
};
