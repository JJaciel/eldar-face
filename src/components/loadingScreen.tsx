import { useState, useEffect } from "react";
import { Flex, Box, Spinner } from "@chakra-ui/react";

export const LoadingScreen = ({ isLoading }: { isLoading: boolean }) => {
  const [loading, setLoading] = useState(isLoading);

  useEffect(() => {
    if (loading)
      setTimeout(() => {
        setLoading(false);
      }, 800);
  }, [loading]);

  if (!loading) return null;
  return (
    <Flex
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      bgColor="whiteAlpha.800"
      alignItems="center"
      justifyContent="center"
      zIndex={1}
    >
      <Box>
        <Spinner size="xl" />
      </Box>
    </Flex>
  );
};
