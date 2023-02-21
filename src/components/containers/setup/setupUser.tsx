import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

import { Form, TextInput, CheckboxInput } from "../../common/form";
import { Surface, ContinueButton } from "../../common/display";
import { useSetupContext } from "./setupContainer";
import { SETUP_MUTATION } from "./setupMutations";
import { GET_SETUP_USER, GET_SETUP_LOCATIONS } from "./setupQueries";

interface StepFormValues {
  userName: string;
  locationName: string;
  useWizard: boolean;
}

type SetupMutationResult = {
  user: {
    username: string;
  };
  location: {
    locationId: string;
  };
};

export const SetupUser = () => {
  const [shouldUseWizard, setShouldUseWizard] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const { user, locations } = useSetupContext();

  const [setupUser, { loading, called }] = useMutation<SetupMutationResult>(
    SETUP_MUTATION,
    {
      refetchQueries: [GET_SETUP_USER.name, GET_SETUP_LOCATIONS.name],
      onError: () => {
        toast({
          title: "Error updating username",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      },
      onCompleted: ({ location }) => {
        setTimeout(() => {
          if (shouldUseWizard) {
            navigate(location.locationId);
            return;
          }
          navigate("/locations");
        }, 1000);
      },
    }
  );

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
