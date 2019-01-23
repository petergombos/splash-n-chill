import {Component} from "react";
import PropTypes from "prop-types";

export class Fullscreen extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    toggleKeys: PropTypes.array
  };

  static defaultProps = {
    onChange: () => {},
    toggleKeys: [13]
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  toggleFullScreen() {
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
  }

  handleKeyDown = e => {
    const {toggleKeys} = this.props;
    if (toggleKeys.includes(e.keyCode)) {
      this.toggleFullScreen();
    }
  };

  render() {
    return null;
  }
}

export default Fullscreen;
