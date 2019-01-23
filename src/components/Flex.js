import styled from "styled-components";

import View from "./View";

const Flex = styled(View)``;

Flex.defaultProps = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

export default Flex;
