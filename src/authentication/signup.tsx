import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  Icon,
  IconButton,
  Container,
  Heading,
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {
  RiMailLine,
  RiLockLine,
  RiEyeOffLine,
  RiEyeLine,
} from "react-icons/ri";

import { useAuthContext } from "./useAuthContext";
import { getFirebaseErrorMessage } from "./firabaseErrorHandler";

interface FormValues {
  email: string;
  password: string;
}

export const Signup = () => {
  const { isOpen, onToggle } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuthContext();

  const toast = useToast();

  const {
    handleSubmit,
    register,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const navigate = useNavigate();

  const handleError = useCallback(
    (err: any) => {
      const errorMessage = err.code
        ? getFirebaseErrorMessage(err)
        : {
            title: "Unexpected Error",
            description: err.message,
          };
      toast.closeAll();
      reset();
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
      setIsLoading(true);
      try {
        await signup({ email, password });
        setIsLoading(false);
        toast({
          title: "Account created",
          status: "success",
          position: "top",
          onCloseComplete: () => {
            // navigate("email-verification");
            navigate("/");
          },
        });
      } catch (e: any) {
        handleError(e);
      }
    },
    [signup, toast, handleError, navigate]
  );

  const onClickReveal = () => {
    onToggle();
    setFocus("password");
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }}>
          <Heading size={"lg"} textAlign={{ sm: "center" }}>
            Signup
          </Heading>
        </Box>

        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={"transparent"}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
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
                      required: true,
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
              {/* signup */}
              <Button
                type="submit"
                variant={"solid"}
                isLoading={isSubmitting}
                isDisabled={isLoading}
                size={"md"}
                fontSize="md"
              >
                signup
              </Button>
              {/* login redirect */}
              <Button
                variant="ghost"
                fontSize="xs"
                size={"sm"}
                onClick={() => {
                  navigate("/signin");
                }}
              >
                <Text fontWeight="bold">I already have an account</Text>
              </Button>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
};