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
import { css } from "@emotion/css";

export interface IconButtonProps extends ChakraIconButtonProps {
  wrapperProps?: BoxProps;
  badgeProps?: BadgeProps;
  badgeCount?: number;
}

const badgeStyles = css`
  position: absolute;
  border-radius: full;
  background-color: red.500;
  right: -1px;
  top: -1px;
`;

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
          variant="solid"
          className={badgeStyles}
          {...badgeProps}
        >
          {badgeCount ? badgeCount : null}
        </Badge>
      </Box>
    );
  }
);
