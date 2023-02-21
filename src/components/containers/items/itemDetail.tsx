import { Grid, GridItem } from "@chakra-ui/react";

import { Header, Content } from "../../common/display";

export const ItemDetail = () => {
  return (
    <>
      <Header>ItemDetail</Header>
      <Content>
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
      </Content>
    </>
  );
};
