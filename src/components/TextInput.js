import React from "react";
import styled from "styled-components";
import {themeGet} from "styled-system";

import View from "./View";
import Flex from "./Flex";

export const Input = styled(View)`
  font-size: 16px;
  color: ${themeGet("colors.ink.0")};
  outline: none;
  box-sizing: border-box;
  border: none;
  background: transparent;
  padding: 20px 0;
  &:placeholder {
    color: ${themeGet("colors.ink.2")};
  }
`;
Input.defaultProps = {
  as: "input",
  width: "100%"
};

function TextInput({
  left,
  right,
  width = "100%",
  value,
  onChange,
  placeholder,
  ...rest
}) {
  return (
    <Flex
      width={width}
      bg="sky.1"
      border="none"
      borderRadius={1}
      pl={left ? "0px" : 5}
      pr={right ? "0px" : 5}
      {...rest}
    >
      {left ? left : null}
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        flex="1"
      />
      {right ? right : null}
    </Flex>
  );
}
export default TextInput;
