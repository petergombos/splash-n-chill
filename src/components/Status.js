import React from "react";

import Flex from "./Flex";
import Text from "./Text";

function Status({children, ...rest}) {
  return (
    <Flex
      bg="black"
      height="100vh"
      width="100%"
      justifyContent="center"
      {...rest}
    >
      <Text fontSize={8} color="white">
        {children}
      </Text>
    </Flex>
  );
}

export default Status;
