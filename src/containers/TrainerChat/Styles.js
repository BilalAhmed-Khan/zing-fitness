import { ScaledSheet } from 'react-native-size-matters';
import { Colors, Fonts, Metrics } from '../../theme';

export default ScaledSheet.create({
    container: {
        backgroundColor: Colors.tertiary,
    },
    secMain: {
        flex: 1,
        backgroundColor: Colors.secondary,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
});
