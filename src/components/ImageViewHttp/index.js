// @flow
import ImageLoad from "react-native-image-placeholder";
import PropTypes from "prop-types";
import React from "react";

import Image from "../Image";
import { DataHandler } from "../../utils";
import { Images } from "../../theme";

export default class ImageViewHttp extends React.PureComponent {
  static propTypes = {
    // placeholderSource
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    isShowActivity: PropTypes.bool,
    url: PropTypes.any,
    isLocal: PropTypes.bool,
    cache: PropTypes.string,
    source: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  };

  static defaultProps = {
    isShowActivity: false,
    url: "",
    style: {},
    isLocal: false,
    cache: "force-cache",
  };
  render() {
    const { isShowActivity, cache, url, isLocal, source, ...rest } = this.props;
    if (isLocal) {
      return <Image {...rest} source={url || source} />;
    }

    return (url && url !== "") || source ? (
      <ImageLoad
        isShowActivity={isShowActivity}
        {...rest}
        source={source}
        networkInfo={DataHandler.getIsInternetConnected()}
      />
    ) : (
      <ImageLoad
        isShowActivity={isShowActivity}
        {...rest}
        source={Images.dummy}
      />
    );
  }
}
