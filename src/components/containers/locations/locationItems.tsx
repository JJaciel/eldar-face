import { Outlet, useOutletContext } from "react-router-dom";

import { Header } from "../../common/display";
import { useLocationContext } from "./locationContainer";
import { LocationItem } from "../../../types/location";

type LocationItemsContext = {
  items: LocationItem[];
};

export const LocationItems = () => {
  const { location } = useLocationContext();
  const items = location.items || [];
  return (
    <>
      <Header>Location Items</Header>
      <Outlet context={{ items }} />
    </>
  );
};

export const useLocationItemsOutlet = () => {
  return useOutletContext<LocationItemsContext>();
};
