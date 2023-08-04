import { Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { NavigationBar } from "./Fragments/NavigationBar";
import React from "react";
import { ActionBar } from "./Fragments/ActionBar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PageContainer } from "./Fragments/PageContainer";

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
        <PageContainer>
          <motion.div
            key={pathname}
            style={{ height: "100%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 20,
            }}
          >
            {children}
          </motion.div>
        </PageContainer>
      </Flex>
      {!isLarge && <ActionBar />}
    </Flex>
  );
};
