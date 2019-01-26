import React from "react";

import Gallery from "../components/Gallery";

function Search({query}) {
  return <Gallery endpoint={`/search/photos?query=${query}`} />;
}

export default Search;
