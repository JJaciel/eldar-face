import { useNavigate } from "react-router-dom";
import { Button, Text, Stack } from "@chakra-ui/react";

import { useAuthContext } from "./useAuthContext";
import { PageContainer } from "../display/pageContainer";
import { Header } from "../display/header";
import { Surface } from "../display/surface";

export const EmailVerification = () => {
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Stack spacing="8">
        <Header>Verify your email</Header>
        <Surface>
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
        </Surface>
      </Stack>
    </PageContainer>
  );
};
