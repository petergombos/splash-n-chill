import React from "react";

import Gallery from "../components/Gallery";

function Collection({collectionId}) {
  return <Gallery endpoint={`/collections/${collectionId}/photos`} />;
}

export default Collection;
