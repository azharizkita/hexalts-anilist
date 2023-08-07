import { IconButton, IconButtonProps, useToast } from "@chakra-ui/react";
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
  const toast = useToast();
  const handleShareClick = async () => {
    const titleTag =
      document
        .querySelector('meta[property="og:title"]')
        ?.getAttribute("content") ?? undefined;

    const descriptionTag =
      document
        .querySelector('meta[property="og:description"]')
        ?.getAttribute("content") ?? undefined;

    const payload = {
      title: title ?? titleTag,
      text: description ?? descriptionTag,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(payload);
      } catch (error) {
        console.error("Failed to share:", error);
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(payload.url);
      toast({
        title: "URL copied into clipboard",
        description: "Share it to your friends!",
        status: "success",
        duration: 2500,
        position: "top-right",
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

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
