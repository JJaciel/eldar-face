import { Stack, Grid, GridItem } from "@chakra-ui/react";

import { PageContainer, Header, Surface } from "../../common/display";

export const Lists = () => {
  return (
    <PageContainer>
      <Stack spacing="8">
        <Header>Lists</Header>
        <Surface>
          <Grid
            h="200px"
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            <GridItem rowSpan={2} colSpan={1} bg="tomato" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={2} bg="papayawhip" />
            <GridItem colSpan={4} bg="tomato" />
          </Grid>
        </Surface>
      </Stack>
    </PageContainer>
  );
};