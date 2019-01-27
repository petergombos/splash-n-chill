import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import "styled-components/macro";

import View from "../View";
import Flex from "../Flex";

import {ReactComponent as LeftIcon} from "./assets/angle-left-solid.svg";
import {ReactComponent as RightIcon} from "./assets/angle-right-solid.svg";

const Container = styled(View)`
  cursor: pointer;
  * {
    visibility: hidden;
  }
  &:hover {
    * {
      visibility: visible;
    }
  }
`;
Container.defaultProps = {
  position: "absolute",
  height: "100vh"
};

function Pagination({onNext, onPrevious}) {
  return (
    <>
      <Container left="0" onClick={onPrevious}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          height="100%"
        >
          <View
            color="rgba(255,255,255,0.7)"
            width="36px"
            px={5}
            py={3}
            bg="rgba(0, 0, 0, 0.1)"
            css="border-radius: 0 4px 4px 0;"
            as={LeftIcon}
          />
        </Flex>
      </Container>
      <Container right="0" onClick={onNext}>
        <Flex
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          height="100%"
        >
          <View
            color="rgba(255,255,255,0.7)"
            width="36px"
            px={5}
            py={3}
            bg="rgba(0, 0, 0, 0.1)"
            css="border-radius: 4px 0 0 4px;"
            as={RightIcon}
          />
        </Flex>
      </Container>
    </>
  );
}

Pagination.propTypes = {
  onNext: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired
};

export default Pagination;
