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
  a{
    color: currentColor;
    text-decoration: underline;
  }
`;

Text.defaultProps = {
  display: "block",
  fontSize: 3
};

export default Text;

export const Title = styled(Text)``;
Title.defaultProps = {
  fontSize: 7,
  color: "ink.0",
  fontFamily: "Bitter"
};

export const Heading = styled(Text)`
  letter-spacing: 0.2px;
`;
Heading.defaultProps = {
  fontSize: 5,
  color: "ink.1",
  fontWeight: "regular",
  lineHeight: 1.5
};

export const Caption = styled(Text)`
  letter-spacing: 0.4px;
`;
Caption.defaultProps = {
  fontSize: 2,
  color: "ink.3"
};
