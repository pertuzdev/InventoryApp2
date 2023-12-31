import React, {useEffect, useState} from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';

import {styles} from './SelectImage.styles';

import {colors} from '../../styles/globalStyles';

import ImageView from 'react-native-image-viewing';
import Carousel from 'react-native-reanimated-carousel';
import {useGallery} from '../../hooks/useGallery';

const width = Dimensions.get('window').width;

export default function SelectImage({openSheetBottom, images, deleteImage}) {
  const [imageIndex, setImageIndex] = useState(0);

  const {
    galleryImages,
    galleryConfig,
    handleOpenGallery,
    renderGalleryFooterComponent,
    setGalleryConfig,
  } = useGallery({images});

  useEffect(() => {
    if (images.length === 1) {
      setImageIndex(0);
    }
  }, [images]);

  const renderImage = () => {
    if (images && images.length === 1) {
      return (
        <View style={{flex: 1, width, height: 300}}>
          <Pressable onPress={() => handleOpenGallery(0)}>
            <Image source={{uri: images[0]}} style={styles.img} />
          </Pressable>
        </View>
      );
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
              scrollAnimationDuration={400}
              onSnapToItem={index => {
                setImageIndex(index);
              }}
              renderItem={({index, item}) => (
                <Pressable onPress={() => handleOpenGallery(index)}>
                  <Image source={{uri: item}} style={styles.img} />
                </Pressable>
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
      <View style={styles.imgCont} android_ripple={{color: colors.darkGray}}>
        {renderImage()}
        {images.length > 0 && (
          <Text style={styles.paginationCarousel}>
            {imageIndex + 1} / {images.length}
          </Text>
        )}
        {images.length > 0 && (
          <Pressable
            style={styles.deleteImgButton}
            onPress={() => deleteImage(imageIndex)}>
            <Image
              source={require('../../assets/icons/ic_trash_white.png')}
              style={{width: 16, height: 16, resizeMode: 'contain'}}
            />
          </Pressable>
        )}
        <ImageView
          images={galleryImages}
          imageIndex={galleryConfig.index}
          visible={galleryConfig.isVisible && galleryImages.length > 0}
          onRequestClose={() => setGalleryConfig({isVisible: false, index: 0})}
          swipeToCloseEnabled
          FooterComponent={image => renderGalleryFooterComponent({image})}
        />
        <View style={styles.addBtnWrapper}>
          <Pressable
            style={styles.addBtn}
            onPress={openSheetBottom}
            android_ripple={{color: colors.darkGray}}>
            <Image source={require('../../assets/icons/ic_plus_white.png')} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
