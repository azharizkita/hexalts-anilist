import { Flex, Image, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const HomePage = () => {
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
      <Flex
        direction="column"
        align="center"
        gap="2em"
        bg="black"
        p="2em"
        borderRadius="3xl"
        shadow="lg"
      >
        <Image src="/hexalts_x_anilist.svg" alt="logo" h="full" w="16em" />
        <Text align="center" color="white" fontWeight="bold">
          The best site for your <br /> inner weebs
        </Text>
      </Flex>
    </Flex>
  );
};

export default function Home() {
  return <HomePage />;
}
