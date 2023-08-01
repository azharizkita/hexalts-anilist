import { Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { NavigationBar } from "./Fragments/NavigationBar";
import React from "react";
import { ActionBar } from "./Fragments/ActionBar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useRouter();
  const [isLarge] = useMediaQuery("(min-width: 625px)");

  return (
    <Flex w="100vw" h="100vh" direction="column" bg="black">
      <NavigationBar />
      <Flex
        w="full"
        h="full"
        overflowY="auto"
        bg="gray.50"
        borderTopRadius="2xl"
      >
        <Container
          maxW="container.xl"
          w="full"
          h="full"
          as={Flex}
          flexDirection="column"
          pt="1em"
        >
          <motion.div
            key={pathname}
            style={{ height: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 20,
            }}
          >
            {children}
          </motion.div>
        </Container>
      </Flex>
      {!isLarge && <ActionBar />}
    </Flex>
  );
};
