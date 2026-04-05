import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  addimageStyle: {
    padding: 8,
  },
  title: {
    marginLeft: Metrics.smallMargin,
    fontSize: '16@ms',
    fontFamily: Fonts.regular,
  },
  subTitle: {
    // marginTop: Metrics.smallMargin,
    marginLeft: Metrics.smallMargin,
    fontSize: '14@ms',
    fontFamily: Fonts.regular,
    color: Colors.grey2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Metrics.smallMargin,
    paddingLeft: Metrics.smallMargin,
    paddingRight: Metrics.baseMargin,
    borderWidth: 1,
    borderColor: Colors.grey5,
    borderRadius: '12@ms',
    marginVertical: Metrics.smallMargin,
  },
});
