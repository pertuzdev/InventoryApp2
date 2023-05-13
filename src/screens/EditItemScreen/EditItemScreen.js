import React, {useRef, useState} from 'react';
import {Keyboard, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import {useForm} from 'react-hook-form';

import firestore from '@react-native-firebase/firestore';

import {updateItem} from '../../services/firestore/updateItem';
import {uploadFile} from '../../services/cloudStorage/uploadFile';

import {useAlertOnGoBack} from '../../hooks/useAlertOnGoBack';
import useImagePick from '../../hooks/useImagePick';

import {alertOnGoBack} from '../../helpers/alerts/alertOnGoBack';

import {deleteFileFromURL} from '../../services/cloudStorage/deleteFileFromURL';

import {styles} from './EditItemScreen.styles';

import ItemForm from '../../components/form/ItemForm';
import ActivityIndicator from '../../components/ActivityIndicator/ActivityIndicator';
import BottomOptions from '../../components/BottomOptions/BottomOptions';
import SelectImage from '../../components/SelectImage/SelectImage';
import BottomSheet from '../../components/BottomSheet/BottomSheet';

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';

export default function EditItemScreen({route, navigation}) {
  const {id, code, name, imagesArr, quantity, cost, date, description} =
    route.params;

  const refRBSheet = useRef();
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      code: code,
      name: name,
      images: imagesArr,
      quantity: quantity.toString(),
      cost: cost.toString(),
      date: new Date(date),
      description: description,
    },
  });

  const openSheetBottom = () => {
    refRBSheet.current.open();
  };

  const closeSheetBottom = () => {
    refRBSheet.current.close();
  };

  const {images, takePhoto, chosePhotoFromGallery, cleanPhotos} =
    useImagePick(closeSheetBottom);

  const buildPathRef = ({itemName}) => {
    const nameWithoutSpaces = itemName.replace(/\s/g, '');
    return `/images/InventoryApp_Image_${nameWithoutSpaces}_${uuidv4()}.jpg`;
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

    console.log(data, 'dataToUpdate');

    updateItem(id, data).then(() => {
      setLoading(false);
      navigation.navigate('Detail', {
        id,
        message: 'Producto actualizado',
        ...data,
      });
    });
  };

  const hasUnsavedChanges = () => {
    const {_formValues} = control;

    const validation =
      images ||
      _formValues.code !== code ||
      _formValues.name !== name ||
      Number(_formValues.cost) !== cost ||
      Number(_formValues.quantity) !== quantity ||
      _formValues.description !== description ||
      _formValues.date.toString() !== new Date(date).toString()
        ? true
        : false;

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
          <SelectImage
            openSheetBottom={openSheetBottom}
            images={[...imagesArr, ...images]}
          />
          <ItemForm
            control={control}
            errors={errors}
            dateCaptured={date}
            itemID={id}
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
