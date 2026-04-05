import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Colors, Fonts, Metrics } from '../../theme';
export default function TopTabs({
  tabData,
  renderViews,
  tabIndicatorColor = Colors.primary,
  activeTabColor = Colors.primary,
  labelColor = Colors.white,
  indicatorContainerStyleCustom = {
    backgroundColor: Colors.appBackgroundColor,
  },
  ...rest
}) {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabData);
  const renderScene = SceneMap(renderViews);
  const renderTabBar = props => {
    return (
      <View>
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: tabIndicatorColor }}
          indicatorContainerStyle={indicatorContainerStyleCustom}
          style={{
            backgroundColor: Colors.white,
            marginHorizontal: Metrics.ratio(17),
            elevation: 0,
          }}
          labelStyle={{
            color: labelColor,
            textTransform: 'capitalize',
            fontFamily: Fonts.regular,
            fontWeight: '400',
          }}
          activeColor={activeTabColor}
        />
      </View>
    );
  };

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      {...rest}
    />
  );
}
