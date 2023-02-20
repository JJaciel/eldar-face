import { IconButton, IconButtonProps } from '@chakra-ui/react';

export const MenuIconButton = ({ ...iconButtonProps }: IconButtonProps) => {
  return <IconButton variant="ghost" fontSize="xl" {...iconButtonProps} />;
};
