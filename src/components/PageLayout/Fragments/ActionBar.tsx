import { Tab, Flex, TabList, Tabs, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdMovie, MdPlaylistPlay } from "react-icons/md";

export const ActionBar = () => {
  const { pathname, push } = useRouter();
  const [tabIndex, setTabIndex] = useState(-1);

  useEffect(() => {
    if (pathname === "/watchlist") {
      setTabIndex(1);
      return;
    }
    setTabIndex(0);
  }, [pathname]);

  const handleTabsChange = async (index: number) => {
    if (index === 0) {
      await push("/");
    }

    if (index === 1) {
      await push("/watchlist");
    }

    setTabIndex(index);
  };
  return (
    <Tabs
      isFitted
      position="relative"
      variant="enclosed-colored"
      index={tabIndex}
      onChange={handleTabsChange}
    >
      <TabList bg="gray.100" borderTopWidth="thin">
        <Tab
          borderLeft="none"
          borderRight="none"
          as={Flex}
          flexDirection="column"
          bg="transparent"
        >
          <Icon boxSize="1.5em" as={MdMovie} />
          <Text fontSize="xs">Anime</Text>
        </Tab>
        <Tab
          borderLeft="none"
          borderRight="none"
          as={Flex}
          flexDirection="column"
          bg="transparent"
        >
          <Icon boxSize="1.5em" as={MdPlaylistPlay} />
          <Text fontSize="xs">Watch List</Text>
        </Tab>
      </TabList>
    </Tabs>
  );
};
