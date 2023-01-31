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
import { useQuery, gql, useLazyQuery } from "@apollo/client";

const GET_USER = gql`
  query getUser {
    user {
      userId
      email
    }
  }
`;

export const Dashboard = () => {
  const [getLazy, { loading, error, data: gqlData }] = useLazyQuery<{
    user: { email: string };
  }>(GET_USER, {
    fetchPolicy: "no-cache",
  });

  const { colorMode } = useColorMode();
  const bgColor = { light: "white", dark: "gray.700" };

  const data = {
    revenue: "$10,000",
    expenses: "$5,000",
    profit: "$5,000",
    customers: "100",
    orders: "200",
  };

  console.log(gqlData?.user);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <Box bg={bgColor[colorMode]} p={4}>
      <Heading as="h1" size="xl" mb={4}></Heading>
      <button
        onClick={() => {
          getLazy();
        }}
      >
        aqui
      </button>
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
