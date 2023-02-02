import { Stack, Grid, GridItem } from "@chakra-ui/react";

import { PageContainer } from "../../components/pageContainer";
import { Header } from "../../components/header";
import { Surface } from "../../components/surface";

export const ItemDetail = () => {
  return (
    <PageContainer>
      <Stack spacing="8">
        <Header>ItemDetail</Header>
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
