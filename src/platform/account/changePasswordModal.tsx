import { useCallback, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { RiEyeLine, RiEyeOffLine, RiLockLine } from "react-icons/ri";
import { useForm } from "react-hook-form";

interface FormValues {
  password: string;
  oldPassword: string;
}

export const ChangePasswordModal = () => {
  const toast = useToast();

  const changePassword = async ({
    newPassword,
    oldPassword,
  }: {
    newPassword: string;
    oldPassword: string;
  }) => {};

  const [toggle, setToggle] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    register,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const handleError = useCallback(
    (err: any) => {
      toast.closeAll();
      reset();
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
        onCloseComplete: () => {
          reset();
        },
      });
      setIsLoading(false);
    },
    [toast, reset]
  );

  const onSubmit = useCallback(
    async ({ password, oldPassword }: FormValues) => {
      setIsLoading(true);
      try {
        await changePassword({ newPassword: password, oldPassword });
        setIsLoading(false);
        toast({
          title: "Password updated",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
          onCloseComplete: () => {
            reset();
          },
        });
        setToggle(false);
      } catch (e: any) {
        handleError(e);
      }
    },
    [changePassword, handleError, toast, reset]
  );

  const onClickReveal = () => {
    onToggle();
    setFocus("password");
  };

  return (
    <Box
      py={{ base: "0", sm: "8" }}
      px={{ base: "4", sm: "10" }}
      bg={"transparent"}
      borderRadius={{ base: "none", sm: "xl" }}
    >
      <Stack spacing="6" alignItems="center">
        <Button
          variant="ghost"
          fontSize="sm"
          size={"lg"}
          onClick={() => {
            setToggle(!toggle);
          }}
        >
          <Text fontWeight="bold">Change password</Text>
        </Button>
        {toggle && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.oldPassword}>
              <FormLabel htmlFor="oldPassword">password</FormLabel>
              <InputGroup>
                <InputLeftElement color={"gray.500"} pointerEvents="none">
                  <Icon as={RiLockLine} />
                </InputLeftElement>
                <Input
                  id="oldPassword"
                  type={isOpen ? "text" : "password"}
                  variant={"filled"}
                  {...register("oldPassword", {
                    required: true,
                    minLength: 6,
                    maxLength: 40,
                  })}
                />
                <InputRightElement>
                  <IconButton
                    variant="link"
                    aria-label={
                      isOpen ? "Mask oldPassword" : "Reveal oldPassword"
                    }
                    icon={isOpen ? <RiEyeOffLine /> : <RiEyeLine />}
                    onClick={onClickReveal}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.oldPassword && errors.oldPassword.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">new password</FormLabel>
              <InputGroup>
                <InputLeftElement color={"gray.500"} pointerEvents="none">
                  <Icon as={RiLockLine} />
                </InputLeftElement>
                <Input
                  id="password"
                  type={isOpen ? "text" : "password"}
                  variant={"filled"}
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 40,
                  })}
                />
                <InputRightElement>
                  <IconButton
                    variant="link"
                    aria-label={isOpen ? "Mask password" : "Reveal password"}
                    icon={isOpen ? <RiEyeOffLine /> : <RiEyeLine />}
                    onClick={onClickReveal}
                  />
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              type="submit"
              variant={"solid"}
              isLoading={isSubmitting}
              isDisabled={isLoading}
              size={"lg"}
              fontSize="md"
            >
              Enviar
            </Button>
          </form>
        )}
      </Stack>
    </Box>
  );
};
