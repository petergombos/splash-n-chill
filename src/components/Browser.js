import React, {Component} from "react";

import Photo from "./Photo";
import Text from "./Text";
import api from "../utils/api.js";

export default class Browser extends Component {
  state = {
    photos: null,
    currentIndex: 0,
    currentPage: 0
  };

  componentDidMount() {
    document.onkeydown = this.handleKeyDown;
    this.fetchNextBatch();
  }

  componentWillUnmount() {
    document.onkeydown = undefined;
  }

  handleKeyDown = e => {
    const {photos, currentIndex} = this.state;
    if (e.keyCode === 37) {
      this.setState(state => ({
        currentIndex: Math.max(state.currentIndex - 1, 0)
      }));
    } else if (e.keyCode === 39) {
      if (photos.length - 2 === currentIndex) {
        this.fetchNextBatch();
      }
      this.setState(state => ({
        currentIndex: Math.min(state.currentIndex + 1, state.photos.length - 1)
      }));
    }
  };

  isFetching = false;
  fetchNextBatch = async () => {
    if (this.isFetching) {
      return;
    } else {
      this.isFetching = true;
    }
    const {currentPage} = this.state;
    const nextPage = currentPage + 1;
    const {data} = await api.get(`/photos?page=${nextPage}`);
    this.preFetchImages(data);
    this.setState(state => ({
      photos: state.photos ? [...state.photos, ...data] : data,
      currentPage: nextPage
    }));
    this.isFetching = false;
  };

  preFetchImages = images => {
    images.forEach(image => {
      const img = new Image();
      img.src = image.urls.regular;
    });
  };

  render() {
    const {photos, currentIndex} = this.state;

    if (!photos) {
      return <Text>Loading...</Text>;
    }

    return <Photo key={photos[currentIndex].id} data={photos[currentIndex]} />;
  }
}
