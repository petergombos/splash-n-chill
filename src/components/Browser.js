import React, {Component} from "react";

import Photo from "./Photo";
import Status from "./Status";
import api from "../utils/api.js";

const LIMIT = 10;

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

  toggleFullScreen() {
    const fullscreenElement =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement ||
      document.webkitFullscreenElement;
    if (!fullscreenElement) {
      const fullscreenRequester =
        document.documentElement.requestFullscreen ||
        document.documentElement.webkitRequestFullScreen ||
        document.documentElement.mozRequestFullScreen ||
        document.documentElement.msRequestFullScreen;
      if (fullscreenRequester) {
        fullscreenRequester.call(document.documentElement);
      }
    } else {
      const exitFullscreen =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozExitFullscreen ||
        document.msExitFullscreen;
      if (exitFullscreen) {
        exitFullscreen.call(document);
      }
    }
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
    } else if (e.keyCode === 13) {
      this.toggleFullScreen();
    }
  };

  isFetching = false;
  fetchNextBatch = async () => {
    const {currentPage, isLastPage} = this.state;
    const {endpoint} = this.props;

    // Prevent double fetching the same page
    if (this.isFetching || isLastPage) {
      return;
    } else {
      this.isFetching = true;
    }
    const nextPage = currentPage + 1;

    // Grab new images from API
    const data = await api.get(
      `${endpoint}${endpoint.indexOf("?") > -1 ? "&" : "?"}page=${nextPage}`
    );

    // Prefetch normal size images
    this.preFetchImages(data);

    // Update state
    this.setState(state => ({
      photos: state.photos ? [...state.photos, ...data] : data,
      currentPage: nextPage,
      isLastPage: data.length < LIMIT ? true : false
    }));

    this.isFetching = false;
  };

  preFetchImages = images => {
    images.forEach(image => {
      const img = new Image();
      img.importance = "low";
      img.src = image.urls.regular;
      const avatar = new Image();
      avatar.importance = "low";
      avatar.src = image.user.profile_image.large;
    });
  };

  render() {
    const {photos, currentIndex} = this.state;

    if (!photos) {
      return (
        <Status>
          <span role="img" aria-label="loading">
            📸
          </span>
        </Status>
      );
    }

    const previousPhoto = photos[currentIndex - 1];
    const currentPhoto = photos[currentIndex];
    const nextPhoto = photos[currentIndex + 1];

    return (
      <>
        {previousPhoto && (
          <Photo
            key={previousPhoto.id + "preload"}
            data={previousPhoto}
            display="none"
          />
        )}
        <Photo key={currentPhoto.id} data={currentPhoto} prefetch={true} />
        {nextPhoto && (
          <Photo
            key={nextPhoto.id + "preload"}
            data={nextPhoto}
            display="none"
          />
        )}
      </>
    );
  }
}
