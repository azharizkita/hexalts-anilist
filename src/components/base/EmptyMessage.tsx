import { Flex, FlexProps, Icon, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied } from "react-icons/md";

interface EmptyMessageProps extends FlexProps {
  message?: string | null;
}

export const EmptyMessage = ({
  message = "We found nothing...",
  ...rest
}: EmptyMessageProps) => {
  return (
    <Flex
      align="center"
      justify="center"
      h="100%"
      gap="0.5em"
      direction="column"
      color="gray.400"
      {...rest}
    >
      <Icon fontSize="5xl" as={MdSentimentDissatisfied} />
      <Text>{message}</Text>
    </Flex>
  );
};
