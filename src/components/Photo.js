import React, {Component} from "react";
import PropTypes from "prop-types";
import "styled-components/macro";

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
      data: {urls},
      prefetch
    } = this.props;
    if (prefetch) {
      this.full = new Image();
      this.full.onload = () => {
        this.setState({
          isFullLoaded: true
        });
      };
      this.full.src = urls.full;
    }
  }

  componentWillUnmount() {
    if (this.props.prefetch) {
      this.full.src = "";
    }
  }

  render() {
    const {
      data: {urls, user},
      ...rest
    } = this.props;
    const {isFullLoaded} = this.state;
    return (
      <View
        bg="black"
        style={{
          backgroundImage: `url(${isFullLoaded ? this.full.src : urls.regular})`
        }}
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        width="100%"
        {...rest}
      >
        <Flex
          position="absolute"
          bottom={0}
          left={0}
          p={3}
          justifyContent="flex-start"
          width="100%"
          css="background-image:linear-gradient(-175deg,rgba(238, 238, 238, 0),92%,rgba(69, 69, 69, 0.58) 105%)"
        >
          <Avatar src={user.profile_image.large} mr={2} />
          <View>
            <Text
              fontSize={2}
              fontWeight="semibold"
              color="white"
              as="a"
              target="_blank"
              mb={1}
              href={`${
                user.links.html
              }?utm_source=splashnchill&utm_medium=referral`}
            >
              {user.name}
            </Text>
            <Text
              fontSize={1}
              color="white"
              as="a"
              target="_blank"
              href={`https://unsplash.com/?utm_source=splashnchill&utm_medium=referral`}
            >
              Unsplash
            </Text>
          </View>
        </Flex>
      </View>
    );
  }
}

export default Photo;
