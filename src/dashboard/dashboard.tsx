import {
  Box,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatGroup,
  useColorMode,
} from "@chakra-ui/react";

export const Dashboard = () => {
  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };

  const data = {
    revenue: "$10,000",
    expenses: "$5,000",
    profit: "$5,000",
    customers: "100",
    orders: "200",
  };

  return (
    <Box bg={bgColor[colorMode]} p={4}>
      <Heading as="h1" size="xl" mb={4}></Heading>
      <SimpleGrid columns={[1, null, 2]} spacing={4}>
        <StatGroup>
          <Stat>
            <StatLabel>Revenue</StatLabel>
            <StatNumber>{data.revenue}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Expenses</StatLabel>
            <StatNumber>{data.expenses}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Profit</StatLabel>
            <StatNumber>{data.profit}</StatNumber>
          </Stat>
        </StatGroup>
        <StatGroup>
          <Stat>
            <StatLabel>Customers</StatLabel>
            <StatNumber>{data.customers}</StatNumber>
            <StatHelpText>Customers in the last 30 days</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>Orders</StatLabel>
            <StatNumber>{data.orders}</StatNumber>
            <StatHelpText>Orders in the last 30 days</StatHelpText>
          </Stat>
        </StatGroup>
      </SimpleGrid>
    </Box>
  );
};
