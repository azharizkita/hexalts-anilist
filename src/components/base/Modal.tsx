import {
  Modal as ChakraModal,
  ModalBodyProps as ChakraModalBodyProps,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React from "react";

interface ModalProps extends ChakraModalBodyProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  footerContent: React.ReactNode;
}

export const Modal = ({
  title,
  children,
  isOpen,
  onToggle,
  footerContent,
  ...rest
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onToggle} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody {...rest}>{children}</ModalBody>
        <ModalFooter>{footerContent}</ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
