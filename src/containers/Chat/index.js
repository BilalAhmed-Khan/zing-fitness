import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonView, Container, FlatListApi } from '../../components';
import { NotificationUtill, UserUtill } from '../../dataUtils';
import { getUserData } from '../../ducks/auth';
import {
  createChatRoom,
  currentRoom,
  deleteChat,
  deleteMessage,
  getChatMessagesData,
  message,
} from '../../ducks/chat';
import moment from 'moment';
import styles from './styles';
import { Util } from '../../utils';
import { useEffect } from 'react';
import { DropDown } from '../../modal';

function Chat({ route }) {
  const id = route.params?.id ?? '';
  const roomId = route.params?.roomId ?? '';
  const dropDownModalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(currentRoom({ data: roomId }));
    return () => {
      dispatch(currentRoom({ data: '' }));
    };
  }, []);
  const user = useSelector(getUserData);
  const data = useSelector(getChatMessagesData(roomId));
  const [messages, setMessages] = useState([
    { id: 1, user: 'user1', message: 'Hello' },
    { id: 2, user: 'user2', message: 'Hi there' },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const flatListRef = useRef(null);

  const handleSend = () => {
    if (newMessage.trim() !== '') {
      dispatch(message.request({ msg: newMessage }));
      setNewMessage('');
      // flatListRef.current.scrollToIndex({ animated: true, index: 0 });
    }
  };
  const renderItem = ({ item, index }) => {
    const isUser1 = UserUtill.id(user) === item?.userId;
    const formattedDate = moment(item?.createdAt).format('h:mm A');
    // console.log(item, data, index);
    const isShowDate = Util.showDateNotificationFromLast(index, data);
    // console.log('isShowDate', isShowDate);
    // const currentDate = moment(item?.createdAt).format('YYYY-MM-DD');
    // const prevDate = data[index - 1]
    //   ? moment(data[index - 1].createdAt).format('YYYY-MM-DD')
    //   : null;
    // const isShowDate = prevDate !== currentDate;
    const style = index > 0 ? { marginTop: 0 } : {};

    const onLongPress = () => {
      dropDownModalRef.current.show({
        data: [{ label: 'Delete Message' }],
        isSimple: true,
        onPress: () => {
          dispatch(
            deleteMessage.request({
              messageId: item?.id,
            }),
          );
        },
      });
    };
    return (
      <>
        <View style={styles.messageContainer}>
          <ButtonView
            style={[isUser1 ? styles.user1Container : styles.user2Container]}
            onLongPress={onLongPress}
            disabled={!isUser1}
            disabledOpacity={1}>
            <Text style={isUser1 ? styles.user1Message : styles.user2Message}>
              {item.message}
            </Text>
          </ButtonView>
          <Text style={[isUser1 ? styles.messageTime : styles.messageTime1]}>
            {formattedDate}
          </Text>
        </View>
        {isShowDate ? (
          <Text style={[styles.header, style]}>
            {Util.dayFromNow(NotificationUtill.createdAt(item))}
          </Text>
        ) : null}
      </>
    );
  };

  const onChangeText = text => {};

  return (
    <Container style={styles.maincontainer} headerTitle={'Chat'}>
      <View style={styles.container}>
        <FlatListApi
          forwardedRef={flatListRef}
          showsVerticalScrollIndicator={false}
          actionType="CREATE_CHAT_ROOM"
          selectorData={getChatMessagesData}
          requestAction={createChatRoom.request}
          renderItem={renderItem}
          keyExtractor={item => `${item.id}`}
          payload={{ userId: id }}
          identifier={roomId}
          inverted
          emptyView={() => <></>}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={text => setNewMessage(text)}
            placeholder="Type a message"
            multiline
          />
          <ButtonView style={styles.sendButton} onPress={handleSend}>
            <Text style={styles.sendButtonText}>Send</Text>
          </ButtonView>
        </View>
      </View>
      <DropDown ref={dropDownModalRef} />
    </Container>
  );
}

export default Chat;
