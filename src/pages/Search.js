import React from "react";

import Browser from "../components/Browser";

function Search({query}) {
  return <Browser endpoint={`/search/photos?query=${query}`} />;
}

export default Search;
