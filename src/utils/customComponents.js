import { Text, Box, Image } from "grommet";
import styled from "styled-components";

export const ZoomImage = styled(Image)`
  transition: scale 100ms ease-in-out;
`;

export const ZoomBox = styled(Box)`
  transition: scale 100ms ease-in-out;
  &:hover ${ZoomImage} {
    scale: 1.1;
  }
`;
