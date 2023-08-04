import { Container, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
}

const PAGES_WITHOUT_CONTAINER = ["/anime/[anime_id]"];

export const PageContainer = ({ children }: PageContainerProps) => {
  const { pathname } = useRouter();
  const withPageContainer = !PAGES_WITHOUT_CONTAINER.includes(pathname);

  if (!withPageContainer) {
    return <Flex overflow="auto" w="full" direction="column">{children}</Flex>;
  }
  return (
    <Container
      maxW="container.xl"
      w="full"
      h="full"
      as={Flex}
      flexDirection="column"
      pt="1em"
    >
      {children}
    </Container>
  );
};
