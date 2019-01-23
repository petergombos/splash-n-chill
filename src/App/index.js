import React, {Component} from "react";
import {ThemeProvider} from "styled-components";
import {Router} from "@reach/router";

import theme from "./theme";
import GlobalStyle from "./GlobalStyle";

import Recent from "../pages/Recent";
import Search from "../pages/Search";
import Collection from "../pages/Collection";
import NotFound from "../pages/NotFound";
import Fullscreen from "../components/Fullscreen";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Fullscreen />
          <Router>
            <Recent path="/" />
            <Search path="/search/:query" />
            <Collection path="/collections/:collectionId" />
            <NotFound default />
          </Router>
        </>
      </ThemeProvider>
    );
  }
}
