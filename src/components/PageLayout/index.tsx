import { Container, Flex, useMediaQuery } from "@chakra-ui/react";
import { NavigationBar } from "./Fragments/NavigationBar";
import React, { useEffect, useRef, useState } from "react";
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
  const [isStandalone, setIsStandalone] = useState(false);

  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appHeight = () => {
      if (flexRef.current) {
        flexRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    appHeight();
    window.addEventListener("resize", appHeight);

    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  return (
    <Flex w="100vw" h="full" ref={flexRef} direction="column" bg="black">
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
      {!isLarge && isStandalone && <Flex h="2em" bg="gray.100" />}
    </Flex>
  );
};
