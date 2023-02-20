import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { Form } from "../display/form/form";
import { TextInput } from "../display/form/textInput";
import { CheckboxInput } from "../display/form/checkboxInput";
import { Surface } from "../display/surface";
import { ContinueButton } from "../display/continueButton";
import { useSetupContext } from "./setupContainer";

interface StepFormValues {
  userName: string;
  locationName: string;
  useWizard: boolean;
}

const SETUP_MUTATION = gql`
  mutation SetupUser($username: String!, $locationName: String!) {
    user: updateUserUsername(username: $username) {
      username
    }
    location: createLocation(locationName: $locationName) {
      locationId
    }
  }
`;

export const SetupUser = () => {
  const [shouldUseWizard, setShouldUseWizard] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, locations } = useSetupContext();

  const [setupUser, { loading, called }] = useMutation(SETUP_MUTATION, {
    refetchQueries: ["GetUserData"],
    onError: () => {
      toast({
        title: "Error updating username",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    },
    onCompleted: ({ location }: { location: { locationId: string } }) => {
      setTimeout(() => {
        if (shouldUseWizard) {
          navigate(location.locationId);
          return;
        }
        navigate("/locations");
      }, 1000);
    },
  });

  const username = user?.username;
  const hasAtLeastOneLocation = !!locations.length;

  if (username && hasAtLeastOneLocation && !called) {
    if (locations.length === 1) {
      const location = locations[0];
      setTimeout(() => {
        navigate(location.locationId);
      }, 100);
    } else {
      setTimeout(() => {
        navigate("/locations");
      }, 100);
    }
  }

  if (!user) return null;

  return (
    <Surface>
      <Form<StepFormValues>
        formMode="onBlur"
        defaultValues={{
          userName: username || "",
          locationName: "",
          useWizard: shouldUseWizard,
        }}
        onSubmit={async ({
          useWizard,
          userName,
          locationName,
        }: StepFormValues) => {
          setShouldUseWizard(useWizard);
          await setupUser({
            variables: {
              username: userName,
              locationName,
            },
          });
          toast({
            title: "Setup successfully",
            status: "success",
            duration: 1000,
            position: "top",
          });
        }}
      >
        {!username && (
          <TextInput
            label="What's your name"
            name="userName"
            registerOptions={{
              required: true,
              minLength: {
                value: 3,
                message: "Minimum 3",
              },
              maxLength: {
                value: 20,
                message: "Maximum 20",
              },
            }}
          />
        )}

        <TextInput
          label="Location nickname"
          placeholder="My house"
          name="locationName"
          registerOptions={{
            required: true,
            minLength: {
              value: 3,
              message: "Minimum 3",
            },
            maxLength: {
              value: 20,
              message: "Maximum 20",
            },
          }}
        />
        <CheckboxInput
          placeholder="Use prefilled items"
          name="useWizard"
          helperText="Recommended"
        />
        {/* continue */}
        <ContinueButton
          isLoading={loading}
          _loading={{
            bgColor: "light.primary.main",
          }}
          type="submit"
          aria-label="continue"
        />
      </Form>
    </Surface>
  );
};
