import { EmptyMessage } from "@/components/base/EmptyMessage";
import { Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ISRPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      push("/anime");
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <Flex
      direction="column"
      overflow="auto"
      h="100%"
      align="center"
      justify="center"
    >
      <Flex direction="column" gap="0.5em">
        <EmptyMessage message="Something went wrong..." />
        <Text color="gray.600">We are redirecting you to Anime page</Text>
      </Flex>
    </Flex>
  );
};

export default function ISR() {
  return <ISRPage />;
}
