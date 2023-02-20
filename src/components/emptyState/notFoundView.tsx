import { Box, Image, Text } from "@chakra-ui/react";

import { PageContainer } from "../pageContainer";

interface ErrorViewProps {
  message?: string;
}

export const NotFoundView = ({
  message = "Nothing to match",
}: ErrorViewProps) => {
  return (
    <PageContainer>
      <Box textAlign="center">
        <Image
          src="https://source.unsplash.com/collection/2588906/400x400"
          alt="Error"
        />
        <Text fontSize="2xl" fontWeight="bold">
          {message}
        </Text>
      </Box>
    </PageContainer>
  );
};
