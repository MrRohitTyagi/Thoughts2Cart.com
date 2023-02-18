import { Text, Box } from "grommet";
import styled from "styled-components";

export const ZoomBox = styled(Box)`
  transition: scale 100ms ease-in-out;

  &:hover {
    color: blue;
    scale: 1.1;
  }
`;
