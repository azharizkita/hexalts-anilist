import {
  Badge,
  Box,
  BoxProps,
  IconButton as ChakraIconButton,
  forwardRef,
} from "@chakra-ui/react";

import type {
  IconButtonProps as ChakraIconButtonProps,
  BadgeProps,
} from "@chakra-ui/react";

export interface IconButtonProps extends ChakraIconButtonProps {
  wrapperProps?: BoxProps;
  badgeProps?: BadgeProps;
  badgeCount?: number;
}

export const IconButton = forwardRef<IconButtonProps, "button">(
  ({ wrapperProps, badgeProps, badgeCount = 0, ...rest }, ref) => {
    return (
      <Box position="relative" {...wrapperProps}>
        <ChakraIconButton
          ref={ref}
          size="sm"
          variant="outline"
          color="white"
          {...rest}
        />
        <Badge
          colorScheme="red"
          pos="absolute"
          variant="solid"
          borderRadius="full"
          bgColor="red.500"
          right={-1}
          top={-1}
          {...badgeProps}
        >
          {badgeCount ? badgeCount : null}
        </Badge>
      </Box>
    );
  }
);
