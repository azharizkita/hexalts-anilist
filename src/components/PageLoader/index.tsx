import { Flex, Spinner } from "@chakra-ui/react";

export const PageLoader = () => {
  return (
    <Flex h="full" w="full" direction="column" justify="center" align="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Flex>
  );
};
