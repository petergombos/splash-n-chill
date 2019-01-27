import React, {Component} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import View from "../View";
import Flex from "../Flex";

import {ReactComponent as CompressIcon} from "./assets/compress-solid.svg";
import {ReactComponent as ExpandIcon} from "./assets/expand-solid.svg";
import {ReactComponent as PlayIcon} from "./assets/play-solid.svg";
import {ReactComponent as StopIcon} from "./assets/stop-solid.svg";
import {ReactComponent as ZoomOutIcon} from "./assets/search-minus-solid.svg";
import {ReactComponent as ZoomInIcon} from "./assets/search-plus-solid.svg";

const Icon = styled(View)`
  cursor: pointer;
  &:last-of-type {
    margin-right: 0;
  }
`;
Icon.defaultProps = {
  color: "rgba(255, 255, 255, 0.7)",
  width: "24px",
  mr: 6,
  cursor: "pointer"
};

export class Controls extends Component {
  static propTypes = {
    onFullScreenToggle: PropTypes.func.isRequired,
    isFullScreenEnabled: PropTypes.bool,
    onAutoPlayToggle: PropTypes.func.isRequired,
    isAutoplayOn: PropTypes.bool,
    onPhotoSizeToggle: PropTypes.func.isRequired,
    backgroundSize: PropTypes.string
  };

  render() {
    const {
      onFullScreenToggle,
      isFullScreenEnabled,
      onAutoPlayToggle,
      isAutoplayOn,
      onPhotoSizeToggle,
      backgroundSize,
      ...rest
    } = this.props;
    return (
      <Flex
        position="absolute"
        bottom="12px"
        right="12px"
        zIndex="20"
        {...rest}
      >
        {isFullScreenEnabled ? (
          <Icon as={CompressIcon} onClick={onFullScreenToggle} />
        ) : (
          <Icon as={ExpandIcon} onClick={onFullScreenToggle} />
        )}
        {isAutoplayOn ? (
          <Icon as={StopIcon} onClick={onAutoPlayToggle} />
        ) : (
          <Icon as={PlayIcon} onClick={onAutoPlayToggle} />
        )}
        {backgroundSize === "cover" ? (
          <Icon as={ZoomOutIcon} onClick={onPhotoSizeToggle} />
        ) : (
          <Icon as={ZoomInIcon} onClick={onPhotoSizeToggle} />
        )}
      </Flex>
    );
  }
}

export default Controls;
