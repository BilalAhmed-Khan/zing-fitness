import { ScaledSheet } from 'react-native-size-matters';
import { Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: '40@ms',
  },
  textContent: {
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.medium,
    fontSize: '18@ms',
    marginVertical: '8@ms',
  },
  description: {
    fontFamily: Fonts.light,
    fontSize: '13@ms',
    textAlign: 'center',
    lineHeight: '25@ms',
  },
  alignStyle: { textAlign: 'center' },
});
