import styled from "@emotion/styled";
import { Divider, Flex, Image, Spacer, useMediaQuery } from "@chakra-ui/react";
import { MdOutlinePlaylistPlay } from "react-icons/md";
import { IconButton } from "@/components/base/IconButton";
import { Link } from "@chakra-ui/next-js";
import { SearchInput } from "@/components/base/SearchInput";
import { useRouter } from "next/router";

const NavigationBarWrapper = styled(Flex)`
  align-items: center;
  background-color: black;
  padding: 0.5em 1em;
  justify-content: space-between;
`;

export const NavigationBar = () => {
  const [isLarge] = useMediaQuery("(min-width: 625px)");
  const { push, query, pathname } = useRouter();
  const { keyword = "", page = 1 } = query;

  const handleChangePage = (target: string) => {
    const _target = `/${target}`;
    // do nothing if current path is the same as target
    if (pathname === _target) {
      return;
    }
    push(_target);
  };

  return (
    <NavigationBarWrapper gap="1em" height={isLarge ? "4em" : "5em"}>
      {isLarge && (
        <>
          <Flex w="6em">
            <Link
              href="/anime"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleChangePage("anime");
              }}
            >
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
        inputGroupProps={{
          maxWidth: isLarge ? "400px" : "initial",
        }}
        onSearch={(text) =>
          push({
            ...(text && { pathname: "/anime" }),
            ...(page && { page }),
            query: { ...query, keyword: text },
          })
        }
      />
      {isLarge && (
        <>
          <Divider orientation="vertical" />
          <IconButton
            onClick={() => handleChangePage("collection")}
            borderRadius="full"
            aria-label="watchlist-button"
            icon={<MdOutlinePlaylistPlay />}
          />
        </>
      )}
    </NavigationBarWrapper>
  );
};
