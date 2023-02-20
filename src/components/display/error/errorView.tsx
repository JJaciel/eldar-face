import { Box, Image, Text } from "@chakra-ui/react";

import { PageContainer } from "../pageContainer";

interface ErrorViewProps {
  errorMessage?: string;
}

export const ErrorView = ({
  errorMessage = "Oops, something went wrong!",
}: ErrorViewProps) => {
  return (
    <PageContainer>
      <Box textAlign="center">
        <Image
          src="https://source.unsplash.com/collection/2588906/400x400"
          alt="Error"
        />
        <Text fontSize="2xl" fontWeight="bold">
          {errorMessage}
        </Text>
      </Box>
    </PageContainer>
  );
};
