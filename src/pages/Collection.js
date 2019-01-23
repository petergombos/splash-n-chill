import React from "react";

import Browser from "../components/Browser";

function Collection({collectionId}) {
  return <Browser endpoint={`/collections/${collectionId}/photos`} />;
}

export default Collection;
