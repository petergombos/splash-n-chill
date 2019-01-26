import React, {Component} from "react";

import View from "../../components/View";
import {Title} from "../../components/Text";
import GalleryLink from "../../components/GalleryLink";
import api from "../../utils/api";

export class MostRecent extends Component {
  state = {
    photos: null
  };

  async componentDidMount() {
    const photos = await api.get("/photos?per_page=4");
    this.setState({
      photos
    });
  }

  render() {
    const {photos} = this.state;
    return (
      <View maxWidth="960px" mx={[3, "auto"]} mb="80px">
        <Title mb={7}>Most recent</Title>
        <GalleryLink photos={photos} linkTo="/recent" />
      </View>
    );
  }
}

export default MostRecent;
