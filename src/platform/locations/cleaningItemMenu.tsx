import { useState } from "react";
import {
  Icon,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
} from "@chakra-ui/react";
import {
  RiMoreLine,
  RiEditCircleLine,
  RiEditBoxLine,
  RiPlayListAddLine,
  RiDeleteRow,
  RiDeleteBin2Line,
} from "react-icons/ri";

export const CleaningItemMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const itemHandler = () => {
    setIsOpen(false);
  };
  return (
    <Menu
      closeOnBlur
      isOpen={isOpen}
      closeOnSelect={false}
      onOpen={() => {
        console.log("on open, opening");
        setIsOpen(true);
      }}
      onClose={() => {
        console.log("on close, closing");
        setIsOpen(false);
      }}
      autoSelect={false}
    >
      <MenuButton
        as={IconButton}
        aria-label="Options"
        size="xs"
        icon={<Icon as={RiMoreLine} />}
        bgColor="light.primary.main"
        color="light.primary.onMain"
        _hover={{ bg: "light.primary.onHover" }}
        _active={{ bg: "light.primary.onHover" }}
      />
      <MenuList>
        <MenuItem
          icon={<Icon as={RiEditCircleLine} />}
          onClick={(event) => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
        >
          Edit
        </MenuItem>
        {/* <MenuItem
          icon={<Icon as={RiEditBoxLine} />}
          onClick={(event) => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
        >
          Change area
        </MenuItem> */}
        <MenuItem
          icon={<Icon as={RiPlayListAddLine} />}
          onClick={(event) => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
        >
          Add to list
        </MenuItem>
        <MenuItem
          icon={<Icon as={RiDeleteRow} />}
          onClick={(event) => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
        >
          Disable
        </MenuItem>
        <MenuItem
          icon={<Icon as={RiDeleteBin2Line} />}
          onClick={(event) => {
            setTimeout(() => {
              setIsOpen(false);
            }, 300);
          }}
        >
          Delete
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
