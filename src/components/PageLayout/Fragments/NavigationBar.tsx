import styled from "@emotion/styled";
import { Divider, Flex, Image, Spacer, useMediaQuery } from "@chakra-ui/react";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { IconButton } from "@/components/base/IconButton";
import { Link } from "@chakra-ui/next-js";
import { SearchInput } from "@/components/base/SearchInput";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";

const NavigationBarWrapper = styled(Flex)`
  align-items: center;
  background-color: black;
  padding: 0.5em 1em;
  justify-content: space-between;
`;

export const NavigationBar = () => {
  const [isLarge] = useMediaQuery("(min-width: 625px)");
  const { push, query } = useRouter();
  const { keyword = "" } = query;

  return (
    <NavigationBarWrapper gap="1em" height={isLarge ? "4em" : "5em"}>
      {isLarge && (
        <>
          <Flex w="6em">
            <Link href="/">
              <Image
                src="/hexalts_x_anilist.svg"
                alt="logo"
                h="full"
                w="full"
              />
            </Link>
          </Flex>
          <Spacer />
        </>
      )}
      <SearchInput
        initialValue={keyword as string}
        onSearch={(text) =>
          push({
            ...(text && { pathname: "/" }),
            query: { ...(text && { keyword: text }) },
          })
        }
      />
      {isLarge && (
        <>
          <Divider orientation="vertical" />
          <IconButton
            onClick={() => push("/collection")}
            borderRadius="full"
            aria-label="watchlist-button"
            badgeCount={3}
            icon={<MdOutlinePlaylistPlay />}
          />
        </>
      )}
    </NavigationBarWrapper>
  );
};
