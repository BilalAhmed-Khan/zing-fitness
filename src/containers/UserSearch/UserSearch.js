import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {
  AppHeader,
  Container,
  SearchInput,
  Map,
  Text,
  ImageView,
  Loader,
  ButtonView,
} from '../../components';

import { Images } from '../../theme';
import { NavigationService, Util } from '../../utils';
import MapStyles from '../../config/MapStyles.json';

import { Styles } from './Styles';
import { getTrainerCategories, getUserData } from '../../ducks/auth';
import { UserUtill } from '../../dataUtils';
import { useDispatch, useSelector } from 'react-redux';
import { COORDINATES_DELTA } from '../../config/Constants';
import FilterModal from '../../modal/FilterModal';
import { getTrainerListing } from '../../ducks/trainer';
import { createChatRoom } from '../../ducks/chat';

const UserSearch = ({ route }) => {
  // const trainerdata = route?.params?.data ?? {};
  const userData = useSelector(getUserData);
  const mapRef = useRef();
  const FilterModalRef = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
  const [address, setAddress] = useState(UserUtill.address(userData));
  const [filterPayload, setFilterPayload] = useState({ nearbyTrainers: true });
  const debouncedSearchTerm = useDebounce(inputText, 500);
  const [currentLocation, setCurrentLocation] = useState({
    latitude: UserUtill.lat(userData),
    longitude: UserUtill.long(userData),
    ...COORDINATES_DELTA,
  });
  const [cordinates, setCordinates] = useState({
    latitude: UserUtill.lat(userData),
    longitude: UserUtill.long(userData),
    ...COORDINATES_DELTA,
  });
  // const [coordinate, setCoordinate] = useState(
  //   defaultValues.address
  //     ? {
  //         latitude: defaultValues.address.lat,
  //         longitude: defaultValues.address.lng,
  //         ...COORDINATES_DELTA,
  //       }
  //     : undefined,
  // );
  const setCoordinateMap = (region, animate = true) => {
    setCordinates(region);
    if (animate && !isLoading && mapRef.current !== null) {
      mapRef.current.animateToRegion({ ...region, ...COORDINATES_DELTA }, 1500);
    }
  };

  useEffect(() => {
    console.log('filter', { ...filterPayload });
    if (!isLoading) {
      getTrainersFilter(filterPayload);
    }
  }, [debouncedSearchTerm]);

  const getTrainersFilter = (filter, isLocation = false) => {
    if (!isLocation) {
      filter.longitude = cordinates.longitude;
      filter.latitude = cordinates.latitude;
    }
    dispatch(
      getTrainerListing.request({
        payloadApi: {
          nearbyTrainers: true,
          search: inputText,
          ...filter,
        },
        cb: item => {
          console.log('Item ===>', item);
          setData([...item]);
          // NavigationService.navigate('UserSearch', {
          //   data: item ?? [],
          // });
        },
      }),
    );
  };

  console.log('data ==>', data);
  const onPressTrainerItem = item => {
    NavigationService.navigate('UserTrainerProfile', {
      id: UserUtill.id(item),
    });
  };

  const Likes = ({ likes }) => (
    <View style={Styles.like}>
      <Image source={Images.share} />
      <Text style={Styles.likesCount}>{likes}</Text>
    </View>
  );
  const VerticalLine = () => <View style={Styles.verticalLine} />;
  const TrainerActionButtons = ({ data }) => (
    <View style={Styles.trainerActionButtonsContainer}>
      <Pressable>
        <Image source={Images.calendar} />
      </Pressable>
      <VerticalLine />
      <ButtonView
        onPress={() => {
          dispatch(
            createChatRoom.request({
              payloadApi: { userId: UserUtill.id(data) },
              identifier: UserUtill.id(data),
              cb: callbackData => {
                console.log('CALLBACK ==>', callbackData);
                NavigationService.navigate('Chat', {
                  id: callbackData.userId,
                  roomId: callbackData?.roomId,
                });
              },
            }),
          );
        }}>
        <Image source={Images.chat} />
      </ButtonView>
      {/* <VerticalLine /> */}
      {/* <Pressable>
        <Image source={Images.heart} />
      </Pressable> */}
    </View>
  );
  const trainerItem = ({ item }) => {
    const categories = Util.getTrainerCategoreis(item?.trainerCategories ?? []);
    return (
      <Pressable
        style={Styles.trainerItemContainer}
        onPress={() => onPressTrainerItem(item)}>
        <ImageView
          source={{ uri: UserUtill.image(item) }}
          borderRadius={12}
          style={Styles.trainerAvatar}
          placeholderStyle={Styles.trainerAvatar}
        />
        <View style={Styles.trainerItemContent}>
          {/* <Likes likes={item.likes} /> */}
          <Text style={Styles.trainerName}>{UserUtill.name(item)}</Text>
          <Text style={Styles.trainerType} numberOfLines={2}>
            {categories}
          </Text>
          <TrainerActionButtons data={item} />
        </View>
      </Pressable>
    );
  };

  const trainersList = () => (
    <FlatList
      style={Styles.trainerList}
      horizontal
      data={data}
      renderItem={trainerItem}
    />
  );

  const onRegionChangeComplete = region => {
    const payload = {
      ...filterPayload,
    };
    // payload.searchLocation = {
    //   cordinates: [region.longitude, region.latitude],
    // };
    payload.longitude = region.longitude;
    payload.latitude = region.latitude;

    if (isLoading) {
      setLoading(false);
    }
    setTimeout(() => {
      setCordinates({ ...region });
      getTrainersFilter(payload, true);
    }, 300);
  };

  function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(
      () => {
        // Update debounced value after delay
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);
        // Cancel the timeout if value changes (also on delay change or unmount)
        // This is how we prevent debounced value from updating if value is changed ...
        // .. within the delay period. Timeout gets cleared and restarted.
        return () => {
          clearTimeout(handler);
        };
      },
      [value, delay], // Only re-call effect if value or delay changes
    );
    return debouncedValue;
  }

  return (
    <Container>
      <AppHeader
        hideLogo
        style={Styles.header}
        notificationCount="2"
        title="Search"
        showBack
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={Styles.map}
        ref={mapRef}
        initialRegion={{
          latitude: UserUtill.lat(userData),
          longitude: UserUtill.long(userData),
          ...COORDINATES_DELTA,
        }}
        customMapStyle={MapStyles}
        onRegionChangeComplete={onRegionChangeComplete}
      />
      <View style={Styles.mapContent} pointerEvents="box-none">
        <SearchInput
          isFilter
          onPressFilter={() => {
            dispatch(
              getTrainerCategories.request({
                payloadApi: {},
                cb: data => {
                  console.log(data);
                  setTimeout(() => {
                    FilterModalRef.current.show({
                      data: data,
                      onPress: payload => {
                        setFilterPayload({ ...payload });
                        getTrainersFilter(payload);
                      },
                    });
                  }, 300);
                },
                identifier: 'TRAINER_CATEGORY',
                reset: true,
              }),
            );
          }}
          value={inputText}
          onChange={setInputText}
        />
        {trainersList()}
      </View>
      <FilterModal ref={FilterModalRef} />
      {/* <Content /> */}
      <Loader
        type={['GET_TRAINER_CATEGORY_TRAINER_CATEGORY', 'GET_TRAINER_LISTING']}
      />
    </Container>
  );
};

export default UserSearch;
