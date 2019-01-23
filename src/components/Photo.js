import React, {Component} from "react";
import PropTypes from "prop-types";

import View from "./View";
import Flex from "./Flex";
import Text from "./Text";
import Avatar from "./Avatar";

export class Photo extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  state = {
    isFullLoaded: false
  };

  componentDidMount() {
    const {
      data: {urls}
    } = this.props;
    this.full = new Image();
    this.full.onload = () => {
      this.setState({
        isFullLoaded: true
      });
    };
    this.full.src = urls.full;
  }

  render() {
    const {
      data: {urls, user}
    } = this.props;
    const {isFullLoaded} = this.state;
    return (
      <View
        backgroundImage={`url(${isFullLoaded ? this.full.src : urls.regular})`}
        backgroundPosition="center"
        backgroundSize="cover"
        height="100%"
        width="100%"
      >
        <Flex position="fixed" bottom={3} left={3}>
          <Avatar src={user.profile_image.large} mr={2} />
          <Text fontSize={3} fontWeight="semibold" color="white">
            {user.name}
          </Text>
        </Flex>
      </View>
    );
  }
}

export default Photo;
