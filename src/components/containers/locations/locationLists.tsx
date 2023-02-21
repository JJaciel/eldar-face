import { Outlet, useOutletContext } from "react-router-dom";

import { Header } from "../../common/display";
import { useLocationContext } from "./locationContainer";
import { LocationList } from "../../../types/location";

type LocationListsOutlet = {
  lists: LocationList[];
};

export const LocationLists = () => {
  const { location } = useLocationContext();

  const lists = location.lists || [];

  return (
    <>
      <Header>Location Lists</Header>
      <Outlet context={{ lists }} />
    </>
  );
};

export const useLocationListsOutlet = () => {
  return useOutletContext<LocationListsOutlet>();
};
