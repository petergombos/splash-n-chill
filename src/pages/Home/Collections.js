import React, {Component} from "react";

import View from "../../components/View";
import Flex from "../../components/Flex";
import {Title, Heading, Caption} from "../../components/Text";
import GalleryLink from "../../components/GalleryLink";
import api from "../../utils/api";

export class Collections extends Component {
  state = {
    collections: null
  };

  async componentDidMount() {
    const collections = await api.get("/collections");
    this.setState({
      collections
    });
  }

  render() {
    const {collections} = this.state;

    if (!collections) {
      return null;
    }

    return (
      <View maxWidth="960px" mx={[3, "auto"]} mb="80px" {...this.props}>
        <Title mb={7}>Collections</Title>
        {collections.map(c => (
          <View key={c.id} mb={38}>
            <Flex justifyContent="flex-start" alignItems="baseline" mb={3}>
              <Heading mr={3}>{c.title}</Heading>
              <Caption color="ink.2">
                {c.total_photos} photos - Curated by {c.user.name}
              </Caption>
            </Flex>
            <GalleryLink
              photos={c.preview_photos}
              linkTo={`/collections/${c.id}`}
            />
          </View>
        ))}
      </View>
    );
  }
}

export default Collections;
