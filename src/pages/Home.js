import React, {Component} from "react";

import Hero from "../components/Hero";

export class Home extends Component {
  render() {
    return (
      <Hero
        title="Splash n' Chill"
        subtitle={
          <span>
            Binge-watch photos distraction-free from the amazing{" "}
            <a
              href="https://unsplash.com/?utm_source=splashnchill&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
            >
              unsplash.com
            </a>
          </span>
        }
      />
    );
  }
}

export default Home;
