import React, {useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {useForm} from 'react-hook-form';

import {styles} from './CreateItemScreen.styles';

import firestore from '@react-native-firebase/firestore';

import {addItem} from '../../services/firestore/addItem';
import {uploadFile} from '../../services/cloudStorage/uploadFile';

import {useAlertOnGoBack} from '../../hooks/useAlertOnGoBack';
import useImagePick from '../../hooks/useImagePick';

import {alertOnGoBack} from '../../helpers/alerts/alertOnGoBack';

import ItemForm from '../../components/form/ItemForm';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import BottomOptions from '../../components/BottomOptions/BottomOptions';
import BottomSheet from '../../components/BottomSheet/BottomSheet';
import SelectImage from '../../components/SelectImage/SelectImage';
import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default function CreateItemScreen({navigation}) {
  const dateCaptured = new Date();

  const refRBSheet = useRef();

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: '',
      name: '',
      quantity: '1',
      cost: '',
      date: dateCaptured,
      description: '',
      images: [],
    },
  });

  const openSheetBottom = () => {
    refRBSheet.current.open();
  };

  const closeSheetBottom = () => {
    refRBSheet.current.close();
  };

  const {images, takePhoto, chosePhotoFromGallery} =
    useImagePick(closeSheetBottom);

  const buildPathRef = ({itemName}) => {
    const nameWithoutSpaces = itemName.replace(/\s/g, '');
    return `/images_products/InventoryApp_Image_${nameWithoutSpaces}_${uuidv4()}.jpg`;
  };

  const handleSave = async data => {
    setLoading(true);
    if (images && images.length > 0) {
      try {
        await Promise.all(
          images.map(async image => {
            const pathRef = buildPathRef({itemName: data.name});
            const url = await uploadFile(pathRef, image);
            data.images.push(url);
          }),
        );
      } catch (error) {
        console.log(error);
      }
    }

    data.cost = Number(data.cost);
    data.quantity = Number(data.quantity);

    data.date = firestore.Timestamp.fromDate(data.date);

    console.log(data, 'dataToSave');

    addItem(data).then(() => {
      setLoading(false);
      navigation.navigate('Home', {message: 'Producto creado'});
    });
  };

  const hasUnsavedChanges = () => {
    const {code, name, cost, description} = control._formValues;
    const validation =
      images || code || name || cost || description ? true : false;
    return validation ? true : false;
  };

  useAlertOnGoBack(navigation, hasUnsavedChanges);

  const handleCancelPress = () => {
    alertOnGoBack(navigation, hasUnsavedChanges);
  };

  return (
    <ActivityIndicator loading={loading}>
      <View style={styles.container}>
        <ScrollView style={styles.scrollCont}>
          <SelectImage openSheetBottom={openSheetBottom} images={images} />
          <ItemForm
            control={control}
            errors={errors}
            dateCaptured={dateCaptured}
          />
        </ScrollView>
        <BottomOptions
          handleCancelPress={handleCancelPress}
          handleSavePress={handleSubmit(handleSave)}
          handleSavePressOut={() => Keyboard.dismiss()}
        />
        <BottomSheet
          refRBSheet={refRBSheet}
          takePhoto={takePhoto}
          chosePhotoFromGallery={chosePhotoFromGallery}
        />
      </View>
    </ActivityIndicator>
  );
}
