import { StyleSheet } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  header: {
    justifyContent: 'space-between',
    paddingVertical: '32@ms',
  },
  content: {
    flex: 1,
  },
  map: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
  mapContent: {
    position: 'absolute',
    height: Metrics.height - 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '90@ms',
    marginTop: 90,
  },
  trainerList: {
    flexGrow: 0,
    paddingHorizontal: Metrics.smallMargin,
  },
  trainerItemContainer: {
    height: '216@ms',
    justifyContent: 'flex-end',
    paddingHorizontal: Metrics.smallMargin,
  },
  trainerAvatar: {
    width: '90@ms',
    height: '90@ms',
    borderRadius: '12@ms',
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 28,
  },
  trainerItemContent: {
    width: '250@ms',
    height: '181@ms',
    backgroundColor: Colors.tertiary,
    borderRadius: '16@ms',
    paddingHorizontal: Metrics.largeMargin,
    justifyContent: 'flex-end',
  },
  like: {
    alignSelf: 'flex-end',
    width: '28@ms',
    alignItems: 'center',
  },
  likesCount: {
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
    marginTop: '2@ms',
  },
  trainerName: {
    fontSize: '14@ms',
    fontFamily: Fonts.medium,
    marginTop: '12@ms',
  },
  trainerType: {
    color: Colors.grey2,
    fontSize: '12@ms',
    fontFamily: Fonts.regular,
  },
  trainerActionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: Metrics.baseMargin,
    borderTopColor: Colors.grey3,
    borderTopWidth: 1,
    marginTop: Metrics.baseMargin,
  },
  verticalLine: {
    width: 1,
    height: 26,
    backgroundColor: Colors.grey3,
  },
});
