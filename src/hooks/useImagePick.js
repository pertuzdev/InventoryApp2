import {useState} from 'react';
import {Dimensions} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;

export default function useImagePick(actionAfterImage) {
  const [images, setImages] = useState([]);

  const cleanPhotos = () => {
    ImagePicker.cleanPermanentFiles() //cleanPermanentFiles
      .then(() => {
        console.log('removed all images from pictures directory');
      })
      .catch(e => {
        console.log(e);
      });
  };

  const chosePhotoFromGallery = () => {
    ImagePicker.openPicker({
      width,
      height: 300,
      cropping: true,
      multiple: true,
    })
      .then(imgs => {
        console.log(imgs, 'imageFromGallery2');
        const paths = imgs.map(img => img.path);
        setImages([...images, ...paths]);
        actionAfterImage();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width,
      height: 300,
      cropping: true,
      freeStyleCropEnabled: true,
    })
      .then(img => {
        console.log(img, 'imageFromCamera');
        setImages([...images, img.path]);
        actionAfterImage();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return {images, takePhoto, chosePhotoFromGallery, cleanPhotos};
}
