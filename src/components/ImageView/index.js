// @flow
import React from 'react';
import PropTypes from 'prop-types';
import ImageLoad from 'react-native-image-placeholder';
import { Images } from '../../theme';

export default class ImageView extends React.PureComponent {
  static propTypes = {
    // placeholderSource
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    source: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
      .isRequired,
    isShowActivity: PropTypes.bool,
  };

  static defaultProps = {
    isShowActivity: true,
    style: {},
  };

  render() {
    const { isShowActivity, source, ...rest } = this.props;

    return source.uri ? (
      <ImageLoad isShowActivity={isShowActivity} source={source} {...rest} />
    ) : (
      <ImageLoad
        isShowActivity={isShowActivity}
        source={Images.placeholderImage}
        {...rest}
      />
    );
  }
}
