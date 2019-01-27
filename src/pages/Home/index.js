import React, {Component} from "react";

import Hero from "../../components/Hero";
import View from "../../components/View";
import MostRecent from "./MostRecent";
import Search from "./Search";
import Collections from "./Collections";

import {ReactComponent as TwitterIcon} from "./assets/twitter-brands.svg";
import {ReactComponent as GithubIcon} from "./assets/github-brands.svg";

export class Home extends Component {
  render() {
    return (
      <>
        <Hero
          mb={["40px", "80px"]}
          title="Splash n' Chill"
          subtitle={
            <>
              <View mb={6}>
                Binge-watch photos distraction-free from the amazing{" "}
                <a
                  href="https://unsplash.com/?utm_source=splashnchill&utm_medium=referral"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  unsplash.com
                </a>
              </View>
              <View display="inline-flex">
                <a
                  href="https://twitter.com/pepegombos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <View width="24px" as={TwitterIcon} mx={3} />
                </a>
                <a
                  href="https://github.com/petergombos/splash-n-chill"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <View width="24px" as={GithubIcon} mx={3} />
                </a>
              </View>
            </>
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
