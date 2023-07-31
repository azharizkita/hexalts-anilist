import styled from "@emotion/styled";
import { Flex, Image } from "@chakra-ui/react";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { IconButton } from "@/components/base/IconButton";
import { Link } from "@chakra-ui/next-js";

const NavigationBarWrapper = styled(Flex)`
  align-items: center;
  height: 3.5em;
  background-color: black;
  padding: 0.5em 1em;
  justify-content: space-between;
`;

export const NavigationBar = () => {
  return (
    <NavigationBarWrapper>
      <Flex h="full" w="full">
        <Link href="/">
          <Image src="/hexalts_x_anilist.svg" alt="logo" h="full" w="full" />
        </Link>
      </Flex>
      <IconButton
        aria-label="watchlist-button"
        badgeCount={3}
        icon={<MdOutlinePlaylistPlay />}
      />
    </NavigationBarWrapper>
  );
};
