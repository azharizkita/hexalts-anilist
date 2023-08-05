import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied } from "react-icons/md";

export const EmptyMessage = () => {
  return (
    <Flex
      align="center"
      justify="center"
      h="100%"
      gap="0.5em"
      direction="column"
      color="gray.400"
    >
      <Icon fontSize="5xl" as={MdSentimentDissatisfied} />
      <Text>We found nothing...</Text>
    </Flex>
  );
};
