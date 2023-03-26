import {  Box, Image } from "grommet";
import styled from "styled-components";

export const ZoomImage = styled(Image)`
  transition: scale 100ms ease-in-out;
`;

export const ZoomBox = styled(Box)`
  transition: scale 100ms ease-in-out;
  box-shadow: none;
  &:hover ${ZoomImage} {
    scale: 1.1;
  }
`;
export const HoverBorderBox = styled(Box)`
  padding: 5px;
  border: 1px solid #f2f2f2;
  border-radius: 3px;
  transition: scale 100ms ease-in-out;
  box-shadow: none;
  &:hover {
  }
`;
