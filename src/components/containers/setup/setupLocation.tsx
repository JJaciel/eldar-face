import { useParams } from "react-router-dom";

import { Surface } from "../../common/display";
import { useSetupContext } from "./setupContainer";

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
    </Surface>
  );
};
