import { useCallback } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Avatar,
  Box,
  ButtonGroup,
  Center,
  Container,
  Editable,
  EditableInput,
  EditablePreview,
  Heading,
  Icon,
  IconButton,
  Stack,
  HStack,
  Text,
  useEditableControls,
  useToast,
  Spinner,
} from "@chakra-ui/react";

import { RiAtLine, RiUser4Line } from "react-icons/ri";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useUserContext } from "../useUserContext";

const EditableControls = () => {
  const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
    useEditableControls();

  return isEditing ? (
    <ButtonGroup justifyContent="start" size="sm" w="full" spacing={2} ml={2}>
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
  ) : null;
};

const UPDATE_USER_USERNAME = gql`
  mutation UpdateUserUsername($username: String!) {
    updateUserUsername(username: $username) {
      username
    }
  }
`;

export const Account = () => {
  const toast = useToast();
  const { user, isLoading } = useUserContext();

  const [updateUsername] = useMutation(UPDATE_USER_USERNAME, {
    refetchQueries: ["GetUser"],
    onError: () => {
      toast({
        title: "Error updating username",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
  });

  const onUpdateDisplayName = useCallback(
    async (newDisplayName: string) => {
      try {
        if (!newDisplayName || user?.username === newDisplayName) {
          return;
        }

        await updateUsername({ variables: { username: newDisplayName } });
        toast({
          title: "Updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      } catch (e: any) {
        console.log(e);
      }
    },
    [user, toast, updateUsername]
  );

  const userDisplayName = user?.username;

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
      boxShadow={{ base: "none", sm: "md" }}
    >
      <Stack spacing="8">
        <Stack spacing="6" px={{ base: "4", sm: "10" }}>
          <Heading size={"lg"} textAlign={"center"}>
            Account
          </Heading>
          <Center>
            <Avatar
              name={userDisplayName}
              transition="all 0.2s"
              color="white"
              bg={"app.primary.300"}
              size="2xl"
              boxShadow="lg"
              mx="auto"
            />
          </Center>
        </Stack>
        {isLoading ? (
          <Box
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner
              size="xl"
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
            />
          </Box>
        ) : (
          <Box
            py={{ base: "0", sm: "8" }}
            px={{ base: "4", sm: "10" }}
            bg={"transparent"}
            borderRadius={{ base: "none", sm: "xl" }}
          >
            <Stack
              pl={{ base: "15%", sm: "20%" }}
              spacing="6"
              alignItems="flex-start"
            >
              <HStack alignItems="center">
                <Icon as={RiAtLine} />
                <Text w="200px" py={2} px={4} color="app.primary.500">
                  {user?.email}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <Icon as={RiUser4Line} />
                <Editable
                  onSubmit={(nextValue) => {
                    const input = nextValue.trim();
                    if (!!input && (input.length < 40 || input.length > 3)) {
                      onUpdateDisplayName(input);
                    }
                  }}
                  defaultValue={userDisplayName}
                  onChange={(input) => {
                    if (input.length > 40 || input.length < 3) {
                      // validation error
                    }
                  }}
                  placeholder="Username"
                  isPreviewFocusable={true}
                  selectAllOnFocus={false}
                >
                  <EditablePreview
                    py={2}
                    px={4}
                    border="2px"
                    borderColor="app.primary.100"
                    w="200px"
                    h="44px"
                    textAlign="left"
                    _hover={{
                      background: "gray.200",
                      borderColor: "gray.300",
                    }}
                    _loading={{
                      background: "gray.500",
                    }}
                  />
                  <HStack alignItems="center">
                    <EditableInput
                      py={2}
                      px={4}
                      _loading={{
                        background: "green",
                      }}
                    />
                    <EditableControls />
                  </HStack>
                </Editable>
              </HStack>
            </Stack>
          </Box>
        )}
      </Stack>
    </Container>
  );
};
