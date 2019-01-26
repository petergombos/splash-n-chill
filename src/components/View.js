import styled from "styled-components";
import {
  space,
  width,
  height,
  maxHeight,
  maxWidth,
  fontSize,
  color,
  borders,
  borderColor,
  borderRadius,
  boxShadow,
  opacity,
  overflow,
  background,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  display,
  position,
  zIndex,
  alignItems,
  alignContent,
  justifyItems,
  justifyContent,
  flexWrap,
  flexBasis,
  flexDirection,
  flex,
  justifySelf,
  alignSelf,
  order,
  gridTemplateColumns,
  style,
  px
} from "styled-system";

const top = style({
  prop: "top",
  key: "space",
  styleType: "responsive",
  transformValue: px
});

const right = style({
  prop: "right",
  key: "space",
  styleType: "responsive",
  transformValue: px
});

const bottom = style({
  prop: "bottom",
  key: "space",
  styleType: "responsive",
  transformValue: px
});

const left = style({
  prop: "left",
  key: "space",
  styleType: "responsive",
  transformValue: px
});

const View = styled.div`
  ${space}
  ${width}
  ${height}
  ${maxHeight}
  ${maxWidth}
  ${fontSize}
  ${color}
  ${borders}
  ${borderColor}
  ${borderRadius}
  ${boxShadow}
  ${opacity}
  ${overflow}
  ${background}
  ${backgroundImage}
  ${backgroundSize}
  ${backgroundPosition}
  ${display}
  ${position}
  ${zIndex}
  ${top}
  ${right}
  ${bottom}
  ${left}
  ${alignItems}
  ${alignContent}
  ${justifyItems}
  ${justifyContent}
  ${flexWrap}
  ${flexBasis}
  ${flexDirection}
  ${flex}
  ${justifySelf}
  ${alignSelf}
  ${order}
  ${gridTemplateColumns}
`;

export default View;
