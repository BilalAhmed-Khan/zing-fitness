import { StyleSheet } from 'react-native';
import { Colors, Fonts, Metrics } from '../../theme';

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Colors.tertiary,
  },
  container: {
    flex: 1,
    // backgroundColor: '#fff',
  },
  messageContainer: {
    marginBottom: 10,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.white,
  },
  message: {
    fontSize: 16,
    color: Colors.white,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Colors.secondary,
  },
  messageTime: {
    fontSize: 12,
    color: Colors.grey1,
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  messageTime1: {
    fontSize: 12,
    color: Colors.grey1,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  user1Container: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    paddingHorizontal: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(5),
    borderRadius: 10,
  },
  user2Container: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.tertiary,
    paddingHorizontal: Metrics.ratio(10),
    paddingVertical: Metrics.ratio(5),
    borderRadius: 10,
  },
  user1Message: {
    color: '#fff',
  },
  user2Message: {
    color: Colors.white,
  },
  header: {
    color: Colors.white,
    fontFamily: Fonts.medium,
    fontSize: Fonts.size.size_16,
    textTransform: 'uppercase',
    paddingTop: Metrics.ratio(30),
    paddingBottom: Metrics.ratio(12),
    alignSelf: 'center',
  },
});

export default styles;
