import React, {Component} from "react";
import {ThemeProvider} from "styled-components";

import theme from "./theme";
import GlobalStyle from "./GlobalStyle";
import Browser from "../components/Browser";

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Browser />
        </>
      </ThemeProvider>
    );
  }
}
