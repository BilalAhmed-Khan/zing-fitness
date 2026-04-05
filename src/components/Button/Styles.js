import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts } from '../../theme';

export default ScaledSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: '39@ms',
    borderRadius: '20@ms',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  largeButton: {
    height: '51@ms',
    borderRadius: '30@ms',
  },
  title: {
    color: Colors.white,
    fontSize: '12@ms',
    fontFamily: Fonts.semiBold,
  },
});
