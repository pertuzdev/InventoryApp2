import React from 'react';
import {View, Text, Pressable, Image} from 'react-native';

import {styles} from './CardItem.styles';
import {colors} from '../../styles/globalStyles';
import {TextStyles} from '../../styles/globalStyles';

export default function CardItem({
  navigation,
  style,
  id = '',
  code = '',
  name = '',
  imageURL = '',
  quantity = 1,
  cost = '',
  date = {},
  description = '',
  images = [],
}) {
  let imagesToUse = [];

  if (imageURL) {
    imagesToUse = [imageURL];
  } else if (images && images.length > 0) {
    imagesToUse = images;
  }

  const handlePress = () => {
    navigation.navigate('Detail', {
      id,
      code,
      name,
      images: imagesToUse,
      quantity,
      cost,
      date,
      description,
    });
  };

  return (
    <Pressable
      style={[styles.container, style]}
      android_ripple={{color: colors.mediumGray}}
      onPress={handlePress}>
      <View style={[styles.wrapper]}>
        <View style={styles.imgCont}>
          {imagesToUse?.length > 0 ? (
            <Image style={styles.img} source={{uri: imagesToUse[0]}} />
          ) : (
            <Image
              style={styles.splashImg}
              source={require('../../assets/icons/ic_camera.png')}
            />
          )}
        </View>
        <View style={styles.txtWrapper}>
          <Text style={TextStyles.cardTitle}>{name}</Text>
          <Text style={[styles.cardDescription, TextStyles.cardDescription]}>
            {code}
          </Text>
          <Text style={[styles.cardDescription, TextStyles.cardDescription]}>
            {`${quantity} Disponibles`}
          </Text>
        </View>
        <View style={styles.arrow}>
          <Image source={require('../../assets/icons/ic_arrow_right.png')} />
        </View>
      </View>
    </Pressable>
  );
}
