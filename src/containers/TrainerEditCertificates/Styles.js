import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  uploadTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  addCertificateContainer: {
    height: '120@ms',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey5,
    borderRadius: '14@ms',
    marginVertical: Metrics.baseMargin,
  },
  addCertificateTitle: {
    fontSize: '7@ms',
    fontFamily: Fonts.regular,
    marginTop: Metrics.smallMargin,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  certificateView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  crossStyle: {
    width: 40,
    height: 40,
  },
  crossButtonStyle: {
    position: 'absolute',
    top: 0,
    right: -5,
  },
  imageCard: {
    marginRight: 10,
    marginTop: Metrics.smallMargin,
  },
  imageStyle: {
    width: Metrics.width / 2 - 22,
    height: Metrics.ratio(140),
  },
  addimageStyle: {
    padding: 5,
    // backgroundColor: 'red',
  },
});
