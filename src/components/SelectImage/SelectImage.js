import React, {useState} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';

import {styles} from './SelectImage.styles';

import {colors} from '../../styles/globalStyles';

import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

export default function SelectImage({openSheetBottom, images}) {
  const [imageIndex, setImageIndex] = useState(0);

  console.log('rose', images);

  const renderImage = () => {
    if (images && images.length === 1) {
      return <Image source={{uri: images[0]}} style={styles.img} />;
    }

    if (images && images.length > 1) {
      return (
        <>
          <View style={{flex: 1}}>
            <Carousel
              loop
              width={width}
              height={300}
              pagingEnabled={true}
              data={images}
              autoPlayReverse={false}
              autoFillData={false}
              scrollAnimationDuration={1000}
              onSnapToItem={index => {
                setImageIndex(index);
              }}
              renderItem={({index, item}) => (
                <Image source={{uri: item}} style={styles.img} />
              )}
            />
          </View>
        </>
      );
    }

    return (
      <Image
        source={require('../../assets/icons/ic_camera.png')}
        style={styles.splashImg}
      />
    );
  };

  return (
    <View style={styles.head}>
      <Pressable
        style={styles.imgCont}
        onPress={openSheetBottom}
        android_ripple={{color: colors.darkGray}}>
        {renderImage()}
        {images.length > 0 && (
          <Text style={styles.imageViewFooter}>
            {imageIndex + 1} / {images.length}
          </Text>
        )}
        <View style={styles.addBtnWrapper}>
          <Pressable
            style={styles.addBtn}
            onPress={openSheetBottom}
            android_ripple={{color: colors.darkGray}}>
            <Image source={require('../../assets/icons/ic_plus_white.png')} />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}
