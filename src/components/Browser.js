import React, {Component} from "react";

import Photo from "./Photo";
import Text from "./Text";
import api from "../utils/api.js";

export default class Browser extends Component {
  state = {
    photos: null,
    currentIndex: 0,
    currentPage: 100
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
    // Transition to the next photo
    if (e.keyCode === 37) {
      this.setState(state => ({
        currentIndex: Math.max(state.currentIndex - 1, 0)
      }));
      // Transition to the previous photo
    } else if (e.keyCode === 39) {
      // Fetch new batch of photos if there is only 5 images left to display
      if (photos.length - 6 === currentIndex) {
        this.fetchNextBatch();
      }
      this.setState(state => ({
        currentIndex: Math.min(state.currentIndex + 1, state.photos.length - 1)
      }));
    }
  };

  isFetching = false;
  fetchNextBatch = async () => {
    // Prevent double fetching the same page
    if (this.isFetching) {
      return;
    } else {
      this.isFetching = true;
    }
    const {currentPage} = this.state;
    const nextPage = currentPage + 1;

    // Grab new images from API
    const {data} = await api.get(`/photos?page=${nextPage}`);

    // Prefetch normal size images
    this.preFetchImages(data);

    // Update state
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
