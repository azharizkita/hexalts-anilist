import { Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import { NavigationBar } from "./Fragments/NavigationBar";
import React, { useEffect, useRef, useState } from "react";
import { ActionBar } from "./Fragments/ActionBar";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { PageContainer } from "./Fragments/PageContainer";
import Router from "next/router";
import { PageLoader } from "../PageLoader";
interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  const { pathname } = useRouter();
  const [isLarge] = useMediaQuery("(min-width: 625px)");
  const [isStandalone, setIsStandalone] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [isChangingRoute, setIsChangingRoute] = useState(false);

  const flexRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const appHeight = () => {
      if (flexRef.current) {
        flexRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);

    appHeight();
    setIsPageLoaded(true);
    window.addEventListener("resize", appHeight);

    return () => {
      window.removeEventListener("resize", appHeight);
    };
  }, []);

  useEffect(() => {
    let timestamp = 0;
    let interval: NodeJS.Timer | null = null;

    const start = () => {
      timestamp = Date.now();
      interval = setInterval(() => {
        if (Date.now() - timestamp > 150) {
          setIsChangingRoute(true);
        }
      }, 74);
    };

    const end = () => {
      setIsChangingRoute(false);
      timestamp = 0;
      if (interval) {
        clearInterval(interval);
      }
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
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
            key={isChangingRoute ? "loader" : pathname}
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
            {isChangingRoute ? <PageLoader /> : children}
          </motion.div>
        </PageContainer>
      </Flex>
      {!isLarge && isPageLoaded && <ActionBar />}
      {!isLarge && isStandalone && isPageLoaded && (
        // this is mobile safe area
        <Flex h="2em" bg="gray.100" />
      )}
    </Flex>
  );
};
