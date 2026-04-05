import React, { useRef } from 'react';
import Styles from './styles';
import { View, FlatList, Image } from 'react-native';
import { ButtonView, Container, FlatListApi } from '../../components';
import { AppHeader } from '../../components';
import { Text } from '../../components';
import FavoriteTrainerListItem from '../../components/FavoriteTrainerListItem/FavoriteTrainerListItem';
import {
  getTrainerIdentifierListingData,
  getTrainerListing,
} from '../../ducks/trainer';
import { UserUtill } from '../../dataUtils';
import { NavigationService, Util } from '../../utils';
import { Images } from '../../theme';
import {
  getDashboardIdentifierListingData,
  getTrasactionListing,
} from '../../ducks/dashboard';
import { TransactionModal } from '../../modal';
const TransactionListing = ({ route }) => {
  const transactionModalRef = useRef();

  const ReceiptBoxView = ({ props, sameDate }) => {
    return (
      <View style={Styles.receiptInnerView}>
        {!sameDate && (
          <Text style={Styles.dateText}>
            {Util.formatDate(props.createdAt, 'DD MMMM YYYY')}
          </Text>
        )}
        <ButtonView
          style={Styles.receiptBox}
          onPress={() => {
            transactionModalRef.current.show({
              data: props,
              onPress: () => {
                // dispatch(deleteChat.request({ roomId: data.roomId }));
              },
            });
          }}>
          <View>
            <Text style={Styles.recText}>
              {props?.type === 'booking' ? 'Money Received' : 'Money Withdraw'}
            </Text>
            <Text style={Styles.date}>
              {Util.formatDate(props.createdAt, 'HH:mm A')}
            </Text>
          </View>
          <View style={Styles.rightView}>
            <Text
              style={[
                Styles.priceText,
                {
                  color: props?.type === 'booking' ? '#19D545' : '#D51919',
                },
              ]}>
              {`${props?.type === 'booking' ? '+' : '-'}$${props?.amount}`}
            </Text>
            <View style={Styles.ViewView}>
              <Image source={Images.viewReceiptIcon} />
              <Text style={Styles.viewText}>View</Text>
            </View>
          </View>
        </ButtonView>
      </View>
    );
  };

  return (
    <Container style={Styles.container} headerTitle={'Transaction History'}>
      {/* <View style={Styles.secMain}> */}
      <FlatListApi
        showsVerticalScrollIndicator={false}
        actionType="GET_TRASACTION_LISTING"
        identifier={'TRASACTION_LISTING'}
        selectorData={getDashboardIdentifierListingData}
        requestAction={getTrasactionListing.request}
        renderItem={({ item }) => <ReceiptBoxView props={item} />}
        keyExtractor={item => `${item.id}`}
      />
      {/* </View> */}
      <TransactionModal ref={transactionModalRef} />
    </Container>
  );
};

export default TransactionListing;
