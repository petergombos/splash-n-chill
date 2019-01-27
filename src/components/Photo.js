import React, {Component} from "react";
import PropTypes from "prop-types";
import "styled-components/macro";

import View from "./View";
import User from "./User";

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
        <User
          data={user}
          position="absolute"
          bottom={0}
          left={0}
          p={3}
          width="100%"
          css="background-image:linear-gradient(-175deg,rgba(238, 238, 238, 0),92%,rgba(69, 69, 69, 0.58) 105%)"
        />
      </View>
    );
  }
}

export default Photo;
