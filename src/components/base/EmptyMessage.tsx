import { css } from "@emotion/css";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { MdSentimentDissatisfied } from "react-icons/md";

const emptyMessageStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  gap: 0.5em;
  flex-direction: column;
`;

interface EmptyMessageProps {
  message?: string | null;
}

export const EmptyMessage: React.FC<EmptyMessageProps> = ({
  message = "We found nothing...",
}) => {
  return (
    <Flex color="gray.400" className={emptyMessageStyles}>
      <Icon fontSize="5xl" as={MdSentimentDissatisfied} />
      <Text>{message}</Text>
    </Flex>
  );
};
