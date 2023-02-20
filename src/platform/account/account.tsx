import { useCallback } from "react";
import { useMutation, gql } from "@apollo/client";
import {
  Avatar,
  ButtonGroup,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Icon,
  IconButton,
  Stack,
  HStack,
  Text,
  useEditableControls,
  useToast,
} from "@chakra-ui/react";
import { RiAtLine, RiUser4Line } from "react-icons/ri";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

import { useUserContext } from "../useUserContext";
import { PageContainer } from "../../components/pageContainer";
import { Header } from "../../components/header";
import { Surface } from "../../components/surface";

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
  const { user } = useUserContext();

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
    <PageContainer>
      <Stack spacing="8">
        <Header>Account</Header>
        <Surface>
          <Stack spacing="6">
            <Center>
              <Avatar
                name={userDisplayName}
                transition="all 0.2s"
                bgColor="light.secondary.main"
                color="light.secondary.onMain"
                size={{ base: "lg", sm: "xl" }}
                boxShadow="lg"
                mx="auto"
              />
            </Center>
            <Stack
              pl={{ base: "15%", sm: "20%" }}
              spacing="6"
              alignItems="flex-start"
            >
              <HStack alignItems="center">
                <Icon as={RiAtLine} />
                <Text w="200px" py={2} px={4}>
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
                    borderColor="gray.200"
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
          </Stack>
        </Surface>
      </Stack>
    </PageContainer>
  );
};
