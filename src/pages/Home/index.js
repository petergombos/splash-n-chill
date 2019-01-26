import React, {Component} from "react";

import Hero from "../../components/Hero";
import MostRecent from "./MostRecent";

export class Home extends Component {
  render() {
    return (
      <>
        <Hero
          mb="80px"
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
        <MostRecent />
      </>
    );
  }
}

export default Home;
