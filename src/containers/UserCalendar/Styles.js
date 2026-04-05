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
  buttonContainer:{
    flexDirection:'row',
    marginVertical:Metrics.mediumMargin,
    justifyContent:'space-evenly'
  },
  buttonStyleS:{
    width:"46%",
  },
  buttonTextStyleS:{
    fontSize:'10@ms',
    fontFamily:Fonts.medium
  },
  buttonStyleB:{
    width:"46%",
    backgroundColor:Colors.secondary,
    borderColor:Colors.white,
    borderWidth:1,
  },
})