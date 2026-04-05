import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Metrics } from '../../theme';

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
  selectTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: 'row',
    marginTop: Metrics.ratio(10),
    marginBottom: Metrics.ratio(30),
  },
  textStyle: {
    marginLeft: Metrics.ratio(10),
  },
  title: {
    fontSize: '14@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
});
