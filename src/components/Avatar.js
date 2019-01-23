import styled from "styled-components";
import View from "./View";

const Avatar = styled(View)`
  border: 2px solid white;
`;

Avatar.defaultProps = {
  width: ["32px", "42px"],
  as: "img",
  borderRadius: "50%"
};

export default Avatar;
