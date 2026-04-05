import { ScaledSheet } from 'react-native-size-matters';
import { Fonts } from '../../theme';

export const Styles = ScaledSheet.create({
  title: {
    fontSize: '16@ms',
    fontFamily: Fonts.semiBold,
    textTransform: 'uppercase',
    textAlign: 'center',
    width: '40%',
    alignSelf: 'center',
  },
});
