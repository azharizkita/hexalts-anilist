import { Container, Flex } from "@chakra-ui/react";
import { NavigationBar } from "./Fragments/NavigationBar";
import React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <Flex w="100vw" h="100vh" direction="column" bg="red">
      <NavigationBar />
      <Flex w="full" h="full" overflowY="auto" bg="gray.50">
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
      </Flex>
    </Flex>
  );
};
