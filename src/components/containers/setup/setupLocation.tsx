import { useParams } from "react-router-dom";

import { PageContainer, LoadingScreen } from "../../common/display";

import { Form, TextInput } from "../../common/form";
import { Surface, ContinueButton } from "../../common/display";
import { useSetupContext } from "./setupContainer";

interface StepFormValues {
  userName: string;
  locationName: string;
  useWizard: boolean;
}

export const SetupLocation = () => {
  const { locationId: _locationId } = useParams();
  const { locations } = useSetupContext();

  const location = locations.find(
    ({ locationId }) => locationId === _locationId
  );

  if (!location) return null; // not found

  return (
    <Surface>
      {location.locationId}
      {location.items?.length}
      {location.lists?.length}
      {/* <Form<StepFormValues>
        formMode="onBlur"
        defaultValues={{
          userName: "",
          locationName: "",
          useWizard: true,
        }}
        onSubmit={async (val: StepFormValues) => {
          await new Promise((resolve) => {
            setTimeout(() => {
              resolve("");
            }, 500);
          });
        }}
      >
        <div>STEP 2</div>
        <ContinueButton type="submit" aria-label="continue" />
      </Form> */}
    </Surface>
  );
};
