import { IconButton, IconButtonProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdShare } from "react-icons/md";

interface ShareButtonProps extends IconButtonProps {
  title: string | undefined;
  description: string | undefined;
}

export const ShareButton = ({
  title,
  description,
  ...rest
}: ShareButtonProps) => {
  const [canShare, setCanShare] = useState(false);
  useEffect(() => {
    if (navigator.canShare && navigator.canShare()) {
      setCanShare(true);
    }
  }, []);

  const handleShareClick = async () => {
    const titleTag =
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content") ?? undefined;

    const descriptionTag =
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content") ?? undefined;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title ?? titleTag,
          text: description ?? descriptionTag,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    }
  };

  if (!canShare) {
    return null;
  }

  return (
    <IconButton
      onClick={handleShareClick}
      size="sm"
      icon={<MdShare />}
      shadow="md"
      borderRadius="full"
      {...rest}
    />
  );
};
