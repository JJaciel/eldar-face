import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Heading,
  Text,
  Stack,
  ScaleFade,
} from "@chakra-ui/react";

import { useAuthContext } from "./useAuthContext";

export const EmailVerification = () => {
  const { authUser } = useAuthContext();

  const navigate = useNavigate();

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Box py={{ base: "0", sm: "8" }} px={{ base: "4", sm: "10" }}>
          <Heading size={"lg"} textAlign={{ sm: "center" }}>
            Verify your email
          </Heading>
        </Box>
        <ScaleFade in={!!authUser} initialScale={0.2}></ScaleFade>
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={"transparent"}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          <Stack spacing="6">
            <Text>we sent you a verification email, follow the link on it</Text>
            <Button
              onClick={() => {
                navigate("/");
              }}
            >
              ok
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};
