import React from "react";
import {Link} from "@reach/router";
import styled from "styled-components";
import "styled-components/macro";

import View from "./View";
import Flex from "./Flex";
import Text from "./Text";

const Grid = styled(View).attrs({
  gridTemplateColumns: ["1fr 1fr", "1fr 1fr 1fr 1fr"]
})`
  display: grid;
`;

const Item = styled(View)`
  position: relative;
  width: 100%;
  background-position: center;
  background-size: cover;
  &:before {
    content: "";
    height: 0;
    display: inline-block;
    padding-top: 100%;
    width: 1px;
    position: relative;
  }
`;

export default function GalleryLink({photos, linkTo, ...rest}) {
  return !photos ? null : (
    <View
      as={Link}
      to={linkTo}
      display="block"
      position="relative"
      overflow="hidden"
      css="border-radius: 4px;"
      {...rest}
    >
      <Flex
        height="100%"
        width="100%"
        position="absolute"
        top="0"
        left="0"
        zIndex="10"
        justifyContent="center"
        css={`
          background-color: rgba(0, 0, 0, 0.1);
          * {
            visibility: hidden;
          }
          &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            * {
              visibility: visible;
            }
          }
        `}
      >
        <Text fontSize="48px">
          <span role="img" aria-label="watch">
            👀🍿
          </span>
        </Text>
      </Flex>
      <Grid>
        {photos.map(p => (
          <Item
            key={p.id}
            style={{
              backgroundImage: `url(${p.urls.small})`
            }}
          />
        ))}
      </Grid>
    </View>
  );
}
