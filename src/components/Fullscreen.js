import {Component} from "react";
import PropTypes from "prop-types";

export class Fullscreen extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    toggleKeys: PropTypes.array,
    disableOnUnmount: PropTypes.bool
  };

  static defaultProps = {
    onChange: () => {},
    toggleKeys: [13]
  };

  state = {
    isFullScreenEnabled: false
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    const {disableOnUnmount} = this.props;
    const {isFullScreenEnabled} = this.state;
    document.removeEventListener("keydown", this.handleKeyDown);
    if (disableOnUnmount && isFullScreenEnabled) {
      this.toggleFullScreen();
    }
  }

  toggleFullScreen = () => {
    this.setState(({isFullScreenEnabled}) => ({
      isFullScreenEnabled: !isFullScreenEnabled
    }));
    const {onChange} = this.props;
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
        onChange(true);
      }
    } else {
      const exitFullscreen =
        document.exitFullscreen ||
        document.webkitExitFullscreen ||
        document.mozExitFullscreen ||
        document.msExitFullscreen;
      if (exitFullscreen) {
        exitFullscreen.call(document);
        onChange(false);
      }
    }
  };

  handleKeyDown = e => {
    const {toggleKeys} = this.props;
    if (toggleKeys.includes(e.keyCode)) {
      this.toggleFullScreen();
    }
  };

  render() {
    const {children} = this.props;
    const {isFullScreenEnabled} = this.state;
    return children
      ? children({isFullScreenEnabled, toggleFullScreen: this.toggleFullScreen})
      : null;
  }
}

export default Fullscreen;
