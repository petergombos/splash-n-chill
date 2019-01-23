import React, {Component} from "react";

import Photo from "./Photo";
import Text from "./Text";
import api from "../utils/api.js";

export default class Browser extends Component {
  state = {
    photos: null,
    currentIndex: 0
  };

  async componentDidMount() {
    const {data} = await api.get("/photos");
    this.setState({
      photos: data
    });
  }

  render() {
    const {photos, currentIndex} = this.state;

    if (!photos) {
      return <Text>Loading...</Text>;
    }

    return <Photo data={photos[currentIndex]} />;
  }
}
