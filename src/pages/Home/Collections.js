import React, {Component} from "react";

import View from "../../components/View";
import Flex from "../../components/Flex";
import {Title, Heading, Caption} from "../../components/Text";
import GalleryLink from "../../components/GalleryLink";
import api from "../../utils/api";

function getDocHeight() {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

export class Collections extends Component {
  state = {
    collections: null,
    currentPage: 1
  };

  componentDidMount() {
    this.handleFetch();
    this.mounted = true;
    document.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  handleScroll = e => {
    const offset = window.pageYOffset;
    const docHeight = getDocHeight();
    const distanceToBottom = docHeight - offset - window.innerHeight;
    if (distanceToBottom < window.innerHeight && !this.isFetching) {
      this.handleFetch();
    }
  };

  isFetching = false;
  handleFetch = async () => {
    this.isFetching = true;
    const {currentPage, collections} = this.state;
    const data = await api.get(`/collections?page=${currentPage}`);
    this.mounted &&
      this.setState({
        collections: collections ? [...collections, ...data] : data,
        currentPage: currentPage + 1
      });
    this.isFetching = false;
  };

  render() {
    const {collections} = this.state;

    if (!collections) {
      return null;
    }

    return (
      <View maxWidth="960px" mx={[3, "auto"]} mb="80px" {...this.props}>
        <Title mb={[5, 7]}>Collections</Title>
        {collections.map(c => (
          <View key={c.id} mb={["24px", "38px"]}>
            <Flex
              justifyContent="flex-start"
              alignItems="baseline"
              flexDirection={["column", "row"]}
              mb={3}
            >
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
