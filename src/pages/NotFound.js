import React from "react";

import Status from "../components/Status";

function NotFound() {
  return (
    <Status>
      Not found{" "}
      <span role="img" aria-label="Not found icon">
        😭
      </span>
    </Status>
  );
}

export default NotFound;
