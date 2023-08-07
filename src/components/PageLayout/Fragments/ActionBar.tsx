import { Tab, Flex, TabList, Tabs, Icon, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdMovie, MdPlaylistPlay } from "react-icons/md";

export const ActionBar = () => {
  const { pathname, push } = useRouter();
  const [tabIndex, setTabIndex] = useState(-1);

  useEffect(() => {
    if (
      pathname === "/collection" ||
      pathname === "/collection/[collection_id]"
    ) {
      setTabIndex(1);
      return;
    }
    setTabIndex(0);
  }, [pathname]);

  const handleChangePage = (target: string) => {
    const _target = `/${target}`;
    // do nothing if current path is the same as target
    if (pathname === _target) {
      return;
    }
    push(_target);
  };

  return (
    <Tabs
      isFitted
      position="relative"
      variant="enclosed-colored"
      index={tabIndex}
      onChange={setTabIndex}
    >
      <TabList bg="gray.100" borderTopWidth="thin">
        <Tab
          borderLeft="none"
          borderRight="none"
          as={Flex}
          flexDirection="column"
          bg="transparent"
          onClick={() => handleChangePage("anime")}
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
          onClick={() => handleChangePage("collection")}
        >
          <Icon boxSize="1.5em" as={MdPlaylistPlay} />
          <Text fontSize="xs">My collection</Text>
        </Tab>
      </TabList>
    </Tabs>
  );
};
