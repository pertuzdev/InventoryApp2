import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';

import Carousel from 'react-native-reanimated-carousel';
import {colors} from '../../styles/globalStyles';
import {styles} from './ItemDetailScreen.styles';

import {deleteFileFromURL} from '../../services/cloudStorage/deleteFileFromURL';
import {deleteItem} from '../../services/firestore/deleteItem';

import {formatDate} from '../../helpers/dates';

import Button from '../../components/Button/Button';

import {useGallery} from '../../hooks/useGallery';
const width = Dimensions.get('window').width;

export default function ItemDetailScreen({route, navigation}) {
  const {id, code, name, images, quantity, cost, date, description} =
    route.params;

  const [imageIndex, setImageIndex] = useState(0);

  const {
    galleryImages,
    galleryConfig,
    handleOpenGallery,
    renderGalleryFooterComponent,
    setGalleryConfig,
  } = useGallery({images});

  const formatCost = () => {
    return cost / Math.floor(cost) === 1 ? `$ ${cost}.00` : `$ ${cost}`;
  };

  const normalizeDate = () => {
    const {standardDate} = formatDate({date: date.toDate()});
    return standardDate;
  };

  const goToEdit = () => {
    navigation.navigate('Edit', {
      id,
      code,
      name,
      imagesArr: images,
      quantity,
      cost,
      date: date.toDate().toString(),
      description,
    });
  };

  const removeItem = async () => {
    if (images && images.length > 0) {
      try {
        await Promise.all(
          images.map(async image => {
            await deleteFileFromURL(image);
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }

    await deleteItem(id);
    navigation.navigate('Home', {
      message: 'Producto eliminado',
    });
  };

  const fireAlert = () => {
    Alert.alert(
      'ELIMINAR PRODUCTO',
      '¿Estás seguro que deseas eliminar este producto?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Aceptar', onPress: () => removeItem()},
      ],
    );
  };

  const showToast = (message = '') => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, [name, navigation]);

  useEffect(() => {
    if (route.params?.message) {
      showToast(route.params.message);
      navigation.setParams({message: ''});
    }
  }, [route.params?.message, navigation]);

  const renderImage = () => {
    if (images.length === 1) {
      return (
        <View style={{flex: 1, width, height: 300}}>
          <Pressable onPress={() => handleOpenGallery(0)}>
            <Image source={{uri: images[0]}} style={styles.img} />
          </Pressable>
        </View>
      );
    }

    if (images.length > 1) {
      return (
        <>
          <View style={{flex: 1}}>
            <Carousel
              width={width}
              height={300}
              pagingEnabled={true}
              data={images}
              autoPlayReverse={false}
              autoFillData={false}
              scrollAnimationDuration={200}
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
    <View style={styles.container}>
      <ScrollView style={styles.scrollCont}>
        <View style={styles.head}>
          <View style={styles.imgCont}>
            {renderImage()}
            {images.length > 0 && (
              <Text style={styles.carouselPagination}>
                {imageIndex + 1} / {images.length}
              </Text>
            )}

            <ImageView
              images={galleryImages}
              imageIndex={galleryConfig.index}
              visible={galleryConfig.isVisible && galleryImages.length > 0}
              onRequestClose={() =>
                setGalleryConfig({isVisible: false, index: 0})
              }
              swipeToCloseEnabled
              FooterComponent={image => renderGalleryFooterComponent({image})}
            />
          </View>
        </View>
        <View style={styles.productInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Cantidad</Text>
            <Text style={styles.productTxt}>{quantity}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Código</Text>
            <Text style={styles.productTxt}>{code}</Text>
          </View>
          {cost ? (
            <View style={styles.infoRow}>
              <Text style={styles.productLabel}>Costo</Text>
              <Text style={styles.productTxt}>{formatCost()}</Text>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.infoRow}>
            <Text style={styles.productLabel}>Fecha de ingreso</Text>
            <Text style={styles.productTxt}>{normalizeDate()}</Text>
          </View>
          {description ? (
            <View style={styles.desc}>
              <Text style={styles.descLabel}>Descripción</Text>
              <Text style={styles.productTxt}>{description}</Text>
            </View>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
      <View style={styles.options}>
        <Button
          label="Eliminar"
          backgroundColor={colors.red}
          onPressIn={fireAlert}
        />
        <Button label="Editar" onPress={goToEdit} />
      </View>
    </View>
  );
}
