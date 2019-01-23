import styled from "styled-components";
import {
  space,
  width,
  fontSize,
  textColor,
  bgColor,
  color,
  fontFamily,
  textAlign,
  lineHeight,
  fontWeight,
  fontStyle,
  letterSpacing,
  display
} from "styled-system";

const Text = styled.div`
  ${space}
  ${width}
  ${fontSize}
  ${textColor}
  ${bgColor}
  ${color}
  ${fontFamily}
  ${textAlign}
  ${lineHeight}
  ${fontWeight}
  ${fontStyle}
  ${letterSpacing}
  ${display}
`;

Text.defaultProps = {
  display: "block"
};

export default Text;
