import React from 'react';
import {Image, Pressable, Text, View} from 'react-native';

import RBSheet from 'react-native-raw-bottom-sheet';

import {styles} from './BottomSheet.styles';
import {colors} from '../../styles/globalStyles';
import {usePermissions} from '../../hooks/usePermissions';

export default function BottomSheet({
  refRBSheet,
  takePhoto,
  chosePhotoFromGallery,
}) {
  const {
    handleCameraPermissions,
    handleMediaFilesPermissions,
    hasCameraPermissions,
    hasMediaFilesPermissions,
  } = usePermissions();

  const handleTakePhoto = () => {
    handleCameraPermissions();

    if (hasCameraPermissions()) takePhoto();
  };

  const handleGallery = () => {
    handleMediaFilesPermissions();
    if (hasMediaFilesPermissions) chosePhotoFromGallery();
  };
  return (
    <RBSheet
      ref={refRBSheet}
      height={170}
      animationType={'fade'}
      closeOnDragDown={true}
      closeOnPressMask={true}
      openDuration={0}
      closeDuration={0}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
        draggableIcon: {
          backgroundColor: '#000',
        },
      }}>
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>Foto del producto</Text>
        <View style={styles.sheetWrapper}>
          <Pressable
            style={styles.sheetBtn}
            android_ripple={{color: colors.mediumGray}}
            onPress={handleTakePhoto}>
            <View style={styles.sheetBtnWrapp}>
              <Image
                style={styles.sheetOptIcon}
                source={require('../../assets/icons/ic_camera.png')}
              />
            </View>
            <Text style={styles.sheetIconTxt}>Cámara</Text>
          </Pressable>
          <Pressable
            style={styles.sheetBtn}
            android_ripple={{color: colors.mediumGray}}
            onPress={handleGallery}>
            <View style={styles.sheetBtnWrapp}>
              <Image
                style={styles.sheetOptIcon}
                source={require('../../assets/icons/ic_gallery.png')}
              />
            </View>
            <Text style={styles.sheetIconTxt}>Galería</Text>
          </Pressable>
        </View>
      </View>
    </RBSheet>
  );
}
