import React, {Component} from "react";
import {navigate} from "@reach/router";

import View from "../../../components/View";
import Flex from "../../../components/Flex";
import TextInput from "../../../components/TextInput";
import Button from "../../../components/Button";
import {Title} from "../../../components/Text";

import {ReactComponent as SearchSvg} from "./assets/search-solid.svg";

export default class Search extends Component {
  state = {
    query: ""
  };

  handleInputChange = ({target: {value}}) => {
    this.setState({
      query: value
    });
  };

  handleSearchSubmit = e => {
    const {query} = this.state;
    e.preventDefault();
    if (query) {
      navigate(`/search/${encodeURIComponent(query)}`);
    }
  };

  render() {
    const {query} = this.state;
    return (
      <View maxWidth="960px" mx={[3, "auto"]} {...this.props}>
        <Title mb={7}>Something specific</Title>
        <Flex as="form" onSubmit={this.handleSearchSubmit}>
          <TextInput
            value={query}
            onChange={this.handleInputChange}
            placeholder="Search by tags like: music, nature, love…"
            flex="1"
            borderRadius="4px 0 0 4px"
            left={
              <View color="ink.2" px={5}>
                <SearchSvg width="24px" />
              </View>
            }
          />
          <Button borderRadius="0 4px 4px 0" disabled={!query}>
            Search
          </Button>
        </Flex>
      </View>
    );
  }
}
