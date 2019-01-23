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

  render() {
    const {
      data: {urls, user}
    } = this.props;
    return (
      <View
        backgroundImage={`url(${urls.full})`}
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
