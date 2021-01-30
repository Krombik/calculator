import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import "styled-components/macro";
import styled from "styled-components/macro";

type Props = {
  tooltip: string;
};

export const TooltipIconButtonWrapper = styled.span`
  display: inline-flex;
`;

const TooltipIconButton = <C extends React.ElementType>({
  tooltip,
  ...props
}: IconButtonProps<C, { component?: C }> & Props) => (
  <Tooltip title={tooltip}>
    <TooltipIconButtonWrapper>
      <IconButton color="inherit" {...props} />
    </TooltipIconButtonWrapper>
  </Tooltip>
);

export default TooltipIconButton;
