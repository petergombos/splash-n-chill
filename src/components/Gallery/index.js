import React, {Component} from "react";
import {Link} from "@reach/router";

import Photo from "../Photo";
import Status from "../Status";
import View from "../View";
import Text from "../Text";
import Fullscreen from "../Fullscreen";
import Pagination from "./Pagination";
import Controls from "./Controls";
import api from "../../utils/api.js";

import {ReactComponent as HomeIcon} from "./assets/home-solid.svg";

const LIMIT = 10;
const TIME_LIMIT = 5000;

export default class Gallery extends Component {
  state = {
    photos: null,
    currentIndex: 0,
    currentPage: 0,
    isAutoplayOn: false,
    backgroundSize: "cover",
    backgroundPositionY: 50
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    this.fetchNextBatch();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleBackgroundPositionChange = amount => {
    const {backgroundSize, backgroundPositionY} = this.state;
    const newPosition =
      amount < 0
        ? Math.max(backgroundPositionY + amount, 0)
        : Math.min(backgroundPositionY + amount, 100);
    if (backgroundSize === "cover") {
      this.setState({
        backgroundPositionY: newPosition
      });
    }
  };

  toggleBackgroundSize = () => {
    this.setState(({backgroundSize}) => ({
      backgroundSize: backgroundSize === "cover" ? "contain" : "cover"
    }));
  };

  timer = 0;
  toggleAutoPlay = () => {
    this.setState(
      ({isAutoplayOn}) => ({
        isAutoplayOn: !isAutoplayOn
      }),
      () => this.handleAutoPlayTimerReset()
    );
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
      currentIndex: Math.min(state.currentIndex + 1, state.photos.length - 1),
      backgroundPositionY: 50
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
      case 38: // Up arrow
        this.handleBackgroundPositionChange(-10);
        break;
      case 40: // down arrow
        this.handleBackgroundPositionChange(10);
        break;
      case 32: // Space
        this.toggleAutoPlay();
        break;
      case 13: // Enter
        this.toggleBackgroundSize();
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
    const {
      photos,
      currentIndex,
      backgroundSize,
      backgroundPositionY,
      isAutoplayOn
    } = this.state;
    const {query} = this.props;
    if (!photos) {
      return (
        <Status>
          <span role="img" aria-label="loading">
            📸
          </span>
        </Status>
      );
    }

    if (!photos.length) {
      return (
        <Status>
          <View mb={5}>
            <span role="img" aria-label="loading">
              🤷🏻‍♂️
            </span>{" "}
            No results found{query && `for: ${query}`}
          </View>
          <Text color="ink.1" fontSize="32px" as={Link} to="/">
            Back
          </Text>
        </Status>
      );
    }

    const previousPhoto = photos[currentIndex - 1];
    const currentPhoto = photos[currentIndex];
    const nextPhoto = photos[currentIndex + 1];

    return (
      <>
        <Fullscreen toggleKeys={[70]} disableOnUnmount>
          {({toggleFullScreen, isFullScreenEnabled}) => (
            <View position="relative">
              <View
                top="0"
                left="0"
                zIndex="20"
                position="absolute"
                width="20%"
              >
                <Link to="/">
                  <View
                    as={HomeIcon}
                    width="28px"
                    p={3}
                    color="rgba(255, 255, 255, 0.7)"
                  />
                </Link>
              </View>
              <Pagination
                onNext={this.handleNextPhotoLoad}
                onPrevious={this.handlePreviousPhotoLoad}
              />
              <Controls
                isFullScreenEnabled={isFullScreenEnabled}
                onFullScreenToggle={toggleFullScreen}
                isAutoplayOn={isAutoplayOn}
                onAutoPlayToggle={this.toggleAutoPlay}
                backgroundSize={backgroundSize}
                onPhotoSizeToggle={this.toggleBackgroundSize}
              />
              <Photo
                key={currentPhoto.id}
                data={currentPhoto}
                prefetch={true}
                onDoubleClick={toggleFullScreen}
                backgroundSize={backgroundSize}
                backgroundPositionY={backgroundPositionY}
              />
            </View>
          )}
        </Fullscreen>
        {nextPhoto && (
          <Photo
            key={nextPhoto.id + "preload"}
            data={nextPhoto}
            display="none"
          />
        )}
        {previousPhoto && (
          <Photo
            key={previousPhoto.id + "preload"}
            data={previousPhoto}
            display="none"
          />
        )}
      </>
    );
  }
}
