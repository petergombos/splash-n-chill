import React, {Component} from "react";

import Hero from "../../components/Hero";
import MostRecent from "./MostRecent";
import Search from "./Search";
import Collections from "./Collections";

export class Home extends Component {
  render() {
    return (
      <>
        <Hero
          mb={["40px", "80px"]}
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
        <MostRecent mb={["40px", "80px"]} />
        <Search mb={["40px", "80px"]} />
        <Collections mb={["40px", "80px"]} />
      </>
    );
  }
}

export default Home;
