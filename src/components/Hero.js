import "styled-components/macro";
import React from "react";

import View from "./View";
import {Title, Heading} from "./Text";

function Hero({title, subtitle, ...rest}) {
  return (
    <View
      backgroundPosition="center"
      backgroundSize="cover"
      py={["60px", "110px"]}
      px={["20px", "60px"]}
      css={`
        background-image: linear-gradient(
            -180deg,
            rgba(0, 2, 0, 0.5) 0%,
            rgba(0, 0, 0, 0) 55%
          ),
          linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.5) 100%,
            rgba(0, 0, 0, 0.5) 100%
          ),
          url(https://source.unsplash.com/random/1400);
      `}
      width="100%"
      {...rest}
    >
      <Title
        color="white"
        fontSize={["32px", "86px"]}
        mb={["28px", "48px"]}
        textAlign="center"
      >
        {title}
      </Title>
      <View maxWidth="768px" mx="auto">
        <Heading
          color="white"
          fontSize={["22px", "36px"]}
          textAlign="center"
          fontWeight="regular"
        >
          {subtitle}
        </Heading>
      </View>
    </View>
  );
}

export default Hero;
