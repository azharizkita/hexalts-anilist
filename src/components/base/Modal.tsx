import {
  Modal as ChakraModal,
  ModalBodyProps as ChakraModalBodyProps,
  ModalProps as ChakraModalProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  useMediaQuery,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps extends ChakraModalBodyProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  footerContent?: React.ReactNode;
  headerContent?: React.ReactNode;
  modalProps?: Partial<ChakraModalProps>;
}

export const Modal = ({
  title,
  children,
  isOpen,
  onToggle,
  footerContent,
  headerContent,
  modalProps,
  ...rest
}: ModalProps) => {
  const [isLarge] = useMediaQuery("(min-width: 625px)");

  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onToggle}
      isCentered
      size={isLarge ? "xl" : "full"}
      scrollBehavior="inside"
      {...modalProps}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Flex gap="0.5em" direction="column" w="100%">
            {title}
            {headerContent}
          </Flex>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody {...rest}>{children}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
