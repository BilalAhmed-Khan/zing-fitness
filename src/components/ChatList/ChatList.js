import React from 'react';
import { View, Image, Pressable } from 'react-native';
import { UserUtill } from '../../dataUtils';
import { Images } from '../../theme';
import { NavigationService } from '../../utils';
import ButtonView from '../ButtonView';
import ImageView from '../ImageView';
import Text from '../Text/Text';
import Styles from './Styles';
import moment from 'moment';

const ChatList = ({ props, onLongPress }) => {
  const formattedDate = moment(
    props?.lastMessage?.createdAt
      ? props?.lastMessage?.createdAt
      : props?.createdAt,
  ).format('h:mm A');
  console.log(props);
  const Line = () => (
    <View style={Styles.orContainer}>
      <View style={Styles.horizontalLine} />
    </View>
  );
  return (
    <View>
      <ButtonView
        style={Styles.mainView}
        onPress={() => {
          NavigationService.navigate('Chat', {
            id: UserUtill.id(props?.user ?? {}),
            roomId: props?.roomId,
          });
        }}
        onLongPress={() => onLongPress?.(props)}>
        <View style={Styles.childView}>
          <View>
            <ImageView
              source={{ uri: UserUtill.image(props.user) }}
              style={Styles.imageStyle}
              placeholderStyle={Styles.imageStyle}
              borderRadius={30}
            />
            {/* {online && (
              <Image source={Images.onlineIcon} style={Styles.onlineIcon} />
            )} */}
          </View>
          <View style={Styles.textView}>
            <Text style={Styles.usernameText}>
              {UserUtill.name(props.user)}
            </Text>
            <Text style={Styles.textStyle}>
              {props?.lastMessage?.message ?? ''}
            </Text>
          </View>
        </View>
        <View style={Styles.timeunreadView}>
          <Text style={Styles.time}>{formattedDate ?? ''}</Text>
          {props?.unreadCount > 0 && (
            <View style={Styles.unReadCountView}>
              <Text style={Styles.unReadCountText}>
                {props?.unreadCount ?? ''}
              </Text>
            </View>
          )}
        </View>
      </ButtonView>

      <Line />
    </View>
  );
};

export default ChatList;
