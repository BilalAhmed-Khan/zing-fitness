import React from "react";
import { ImageViewHttp } from "..";

const RoundImage = ({
  source,
  url,
  size = 30,
  borderRadius,
  style,
  ...rest
}) => {
  return (
    <ImageViewHttp
      style={[{ width: size, height: size, borderRadius: size / 2 }, style]}
      borderRadius={borderRadius || size / 2}
      placeholderStyle={{ width: size / 2, height: size / 2 }}
      isLocal={typeof source === "number"}
      source={source}
      url={url}
      isShowActivity
      {...rest}
    />
  );
};

export default RoundImage;
