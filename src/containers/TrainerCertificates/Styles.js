import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export const Styles = ScaledSheet.create({
  uploadTitle: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
  },
  addCertificateContainer: {
    height: '122@ms',
    // width: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.grey5,
    borderRadius: '14@ms',
    marginVertical: Metrics.baseMargin,
  },
  imageStyle: {
    height: '120@ms',
    width: '100%',
  },
  addCertificateTitle: {
    fontSize: '7@ms',
    fontFamily: Fonts.regular,
    marginTop: Metrics.smallMargin,
  },
  button: {
    marginTop: Metrics.baseMargin,
  },
});
