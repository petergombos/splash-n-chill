import React from "react";
import PropTypes from "prop-types";

import View from "./View";
import Flex from "./Flex";
import Text from "./Text";
import Avatar from "./Avatar";

function User({data: user, ...rest}) {
  return (
    <Flex justifyContent="flex-start" display="inline-flex" {...rest}>
      <Avatar src={user.profile_image.large} mr={2} />
      <View>
        <Text
          fontSize={2}
          fontWeight="semibold"
          color="white"
          as="a"
          target="_blank"
          href={`${
            user.links.html
          }?utm_source=splashnchill&utm_medium=referral`}
        >
          {user.name}
        </Text>
        <Text
          fontSize={1}
          color="white"
          as="a"
          target="_blank"
          href={`https://unsplash.com/?utm_source=splashnchill&utm_medium=referral`}
        >
          Unsplash
        </Text>
      </View>
    </Flex>
  );
}

User.propTypes = {
  data: PropTypes.object.isRequired
};

export default User;
