import { useCallback, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  Stack,
  Box,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
  useToast,
  Link,
} from "@chakra-ui/react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeOffLine,
  RiEyeLine,
} from "react-icons/ri";

import { useAuthContext } from "../../hooks/useAuthContext";
import { getErrorMessage } from "./errorHandler";
import { PageContainer, Header, Surface } from "../../common/display";

interface FormValues {
  email: string;
  password: string;
}

export const Signin = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const {
    handleSubmit,
    register,
    setFocus,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const navigate = useNavigate();
  const { signin } = useAuthContext();

  const handleError = useCallback(
    (err: any) => {
      const errorMessage = err.code
        ? getErrorMessage(err)
        : {
            title: "Unexpected Error",
            description: err.message,
          };
      reset();
      toast.closeAll();
      toast({
        title: errorMessage.title,
        description: errorMessage.description,
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top",
      });
      setIsLoading(false);
    },
    [toast, reset]
  );

  const onSubmit = useCallback(
    async ({ email, password }: FormValues) => {
      try {
        setIsLoading(true);
        await signin({ email, password });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 200);
      } catch (e: any) {
        handleError(e);
      }
    },
    [signin, navigate, handleError]
  );

  const onClickReveal = () => {
    onToggle();
    setFocus("password");
  };

  return (
    <PageContainer>
      <Stack spacing="8">
        <Header>Signin</Header>
        <Surface>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing="6">
              {/* email */}
              <FormControl isInvalid={!!errors.email}>
                <FormLabel htmlFor="email">email</FormLabel>
                <InputGroup>
                  <InputLeftElement color={"gray.500"} pointerEvents="none">
                    <Icon as={RiMailLine} />
                  </InputLeftElement>
                  <Input
                    id="email"
                    type="email"
                    variant={"filled"}
                    {...register("email", {
                      required: "Requerido",
                    })}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              {/* password */}
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">password</FormLabel>
                <InputGroup>
                  <InputLeftElement color={"gray.500"} pointerEvents="none">
                    <Icon as={RiLockLine} />
                  </InputLeftElement>
                  <Input
                    id="password"
                    type={isOpen ? "text" : "password"}
                    autoComplete="current-password"
                    variant={"filled"}
                    {...register("password", {
                      required: "Requerido",
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
              {/* signin */}
              <Button
                type="submit"
                variant={"solid"}
                isLoading={isSubmitting}
                isDisabled={isLoading}
                size={"md"}
                fontSize="md"
              >
                signin
              </Button>
              {/* signup redirect */}
              <Box display="flex" justifyContent="center">
                <Link
                  mx="auto"
                  maxW="200px"
                  size="xs"
                  as={RouterLink}
                  to="/signup"
                  textDecoration={"underline"}
                >
                  I don't have an account
                </Link>
              </Box>
              <Box display="flex" justifyContent="center">
                <Link
                  mx="auto"
                  maxW="200px"
                  size="xs"
                  as={RouterLink}
                  to="/forgotPassword"
                  textDecoration={"underline"}
                >
                  I forgot my password
                </Link>
              </Box>
            </Stack>
          </form>
        </Surface>
      </Stack>
    </PageContainer>
  );
};
