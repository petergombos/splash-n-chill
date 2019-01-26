import React, {Component} from "react";

import Photo from "./Photo";
import Status from "./Status";
import Fullscreen from "./Fullscreen";
import api from "../utils/api.js";

const LIMIT = 10;
const TIME_LIMIT = 5000;

export default class Gallery extends Component {
  state = {
    photos: null,
    currentIndex: 0,
    currentPage: 0,
    isAutoplayOn: false
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.fetchNextBatch();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  timer = 0;
  toggleAutoPlay = () => {
    this.setState(({isAutoplayOn}) => ({
      isAutoplayOn: !isAutoplayOn
    }));
    this.handleAutoPlayTimerReset();
  };

  handleAutoPlayTimerReset = () => {
    const {isAutoplayOn} = this.state;
    clearTimeout(this.timer);
    if (isAutoplayOn) {
      this.timer = setTimeout(() => {
        this.handleNextPhotoLoad();
      }, TIME_LIMIT);
    }
  };

  handlePreviousPhotoLoad = () => {
    this.setState(state => ({
      currentIndex: Math.max(state.currentIndex - 1, 0)
    }));
    this.handleAutoPlayTimerReset();
  };

  handleNextPhotoLoad = () => {
    const {photos, currentIndex} = this.state;
    // Fetch new batch of photos if there is only 5 images left to display
    if (photos.length - 6 === currentIndex) {
      this.fetchNextBatch();
    }
    this.setState(state => ({
      currentIndex: Math.min(state.currentIndex + 1, state.photos.length - 1)
    }));
    this.handleAutoPlayTimerReset();
  };

  handleKeyDown = e => {
    // Transition to the previous photo
    switch (e.keyCode) {
      case 37: // Left arrow
        this.handlePreviousPhotoLoad();
        break;
      case 39: // Right arrow
        this.handleNextPhotoLoad();
        break;
      case 32: // Space
        this.toggleAutoPlay();
        break;
      default:
        break;
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
        <Fullscreen />
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
