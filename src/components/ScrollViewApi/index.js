import { ScrollView, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { LoaderViewApi, ErrorViewApi, EmptyViewApi } from '../ApiViews';
import { AppStyles, Colors } from '.././../theme';
import { Util, DataHandler } from '../../utils';

import { getRequestFlag } from '../../ducks/requestFlags';

class ScrollViewApi extends React.PureComponent {
  static propTypes = {
    style: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),

    contentContainerStyle: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.object,
      PropTypes.number,
    ]),
    requestAction: PropTypes.func.isRequired,
    actionType: PropTypes.string.isRequired,
    selectorData: PropTypes.func.isRequired,
    data: PropTypes.any.isRequired,
    payload: PropTypes.object,
    content: PropTypes.func.isRequired,
    emptyView: PropTypes.func,
    isRefreshControlEnable: PropTypes.bool,
    loaderView: PropTypes.func,
    errorView: PropTypes.func,
    dynamicAction: PropTypes.any,
    url: PropTypes.any,
    isContentOnly: PropTypes.bool,
    customPullToRefresh: PropTypes.bool,
    checkDataEmpty: PropTypes.bool,
    emptyMessage: PropTypes.string,
  };

  static defaultProps = {
    loaderView: undefined,
    errorView: undefined,
    emptyView: undefined,
    isRefreshControlEnable: true,
    url: undefined,
    isContentOnly: false,
    dynamicAction: undefined,
    customPullToRefresh: false,
    contentContainerStyle: {},
    checkDataEmpty: false,
    payload: {},
    emptyMessage: '',
  };

  isFirstTimeRefreshed = false;

  componentDidMount() {
    const { checkDataEmpty, data } = this.props;
    if (checkDataEmpty && Util.isNotEmpty(data)) {
    } else {
      this.sendRequestFirstTime();
    }
  }

  componentDidUpdate(prevProps) {
    const { requestFlags, payload } = this.props;
    const { failure, loading } = requestFlags;

    // set boolean for first time refresh so do not add view at bottom
    if (!failure && !loading) {
      this.isFirstTimeRefreshed = true;
    }

    if (failure) {
      // alert
    }
    if (Util.compareDeep(prevProps.payload, payload)) {
      this.sendRequest(false, true);
    }
  }

  sendRequest = (isPullToRefresh = false, isResetData = false) => {
    const { requestAction, url, identifier, dynamicAction, payload } =
      this.props;

    const { dispatch } = DataHandler.getStore();

    const payloadAction = {
      payloadApi: payload,
      isPullToRefresh,
      isResetData,
    };

    if (identifier) {
      payloadAction.identifier = identifier;
    }
    if (url) {
      payloadAction.url = url;
    }
    if (dynamicAction) {
      payloadAction.dynamicAction = url;
    }
    dispatch(requestAction(payloadAction));
  };

  sendRequestFirstTime = () => {
    this.sendRequest(false, true);
  };

  onRefresh = () => {
    this.sendRequest(true);
  };

  renderLoaderView = () => {
    const { loaderView } = this.props;

    if (loaderView) {
      return loaderView();
    }

    return <LoaderViewApi />;
  };

  renderErrorView = () => {
    const { errorView, requestFlags } = this.props;
    const { errorMessage } = requestFlags;

    if (errorView) {
      return errorView(errorMessage, this.sendRequestFirstTime);
    }

    return (
      <ErrorViewApi
        errorMessage={errorMessage}
        onPressRetry={this.sendRequestFirstTime}
      />
    );
  };

  renderEmptyView = () => {
    const { emptyView, emptyMessage } = this.props;
    if (emptyView) {
      return emptyView();
    }

    return <EmptyViewApi emptyMessage={emptyMessage} />;
  };

  render() {
    const {
      requestFlags,
      data,
      content,
      isRefreshControlEnable,
      style,
      isContentOnly,
      contentContainerStyle,
    } = this.props;
    const { loading, failure, isPullToRefresh } = requestFlags;

    const objectIsEmpty = Util.isEmpty(data);
    const showLoading = loading && objectIsEmpty;
    const showError = failure && objectIsEmpty;
    const showContent = !objectIsEmpty;

    const dataEmpty = objectIsEmpty;

    // console.log("data scrollviewapi", data);

    if (showLoading) {
      return this.renderLoaderView();
    }

    if (showError) {
      return this.renderErrorView();
    }

    if (dataEmpty) {
      return this.renderEmptyView();
    }

    if (showContent) {
      if (isContentOnly) {
        return (
          <View style={[AppStyles.container, style]}>{content(data)}</View>
        );
      }
      const refreshControl = isRefreshControlEnable ? (
        <RefreshControl
          refreshing={isPullToRefresh}
          onRefresh={this.onRefresh}
          tintColor={Colors.primary}
          colors={[Colors.primary]}
        />
      ) : null;
      return (
        <ScrollView
          style={[AppStyles.container, style]}
          refreshControl={refreshControl}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={contentContainerStyle}>
          {content(data)}
        </ScrollView>
      );
    }
    return null;
  }
}

const mapStateToProps = (store, ownProps) => {
  const requestFlagIdentifier = ownProps.identifier
    ? `${ownProps.actionType}_${ownProps.identifier}`
    : ownProps.actionType;
  return {
    requestFlags: getRequestFlag(requestFlagIdentifier)(store),
    data: ownProps.identifier
      ? ownProps.selectorData(ownProps.identifier)(store)
      : ownProps.selectorData(store),
  };
};

export default connect(mapStateToProps, null)(ScrollViewApi);
