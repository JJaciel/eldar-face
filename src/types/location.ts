export type LocationItem = {
  itemId: string;
  name: string;
};

export type LocationList = {
  listId: string;
  name: string;
};

export type Location = {
  locationId: string;
  name: string;
  items: LocationItem[] | null;
  lists: LocationList[] | null;
};

export type SetupLocation = {
  locationId: string;
  name: string;
  items: LocationItem[] | null;
  lists: LocationList[] | null;
};
