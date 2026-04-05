import React, { useRef, useState } from 'react';
import { View, FlatList } from 'react-native';
import {
  Container,
  AppHeader,
  SearchInput,
  ChatList,
  FlatListApi,
} from '../../components';
import Styles from './Styles';
import { Images } from '../../theme';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms, getChatData, deleteChat } from '../../ducks/chat';
import { DropDown } from '../../modal';
const TrainerChat = ({ route }) => {
  const isChat = route.params?.isChat ?? false;
  const dispatch = useDispatch();
  const [textInput, setTextInput] = useState('');
  const dropDownModalRef = useRef();
  return (
    <Container
      style={Styles.container}
      showBar={!isChat}
      headerTitle={isChat ? 'Chat' : ''}>
      {!isChat && <AppHeader notificationCount="9" chat={false} />}
      <View style={Styles.secMain}>
        <SearchInput
          isFilter={true}
          value={textInput}
          onChange={setTextInput}
        />
        <FlatListApi
          showsVerticalScrollIndicator={false}
          actionType="GET_ROOMS"
          selectorData={getChatData}
          requestAction={getRooms.request}
          renderItem={({ item }) => (
            <ChatList
              props={item}
              onLongPress={data => {
                console.log('onLongPress', data);
                dropDownModalRef.current.show({
                  data: [{ label: 'Delete Chat' }],
                  isSimple: true,
                  onPress: () => {
                    dispatch(deleteChat.request({ roomId: data.roomId }));
                  },
                });
              }}
            />
          )}
          keyExtractor={item => `${item.id}`}
          payload={
            textInput !== ''
              ? {
                  search: textInput,
                }
              : {}
          }
        />
      </View>
      <DropDown ref={dropDownModalRef} />
    </Container>
  );
};

export default TrainerChat;
