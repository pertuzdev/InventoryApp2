import {useState} from 'react';
import {Dimensions} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;

export default function useImagePick(actionAfterImage) {
  const [images, setImages] = useState([]);
  const [photoTaken, setPhotoTaken] = useState(null);

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

  const cropPhoto = ({imgPath}) => {
    ImagePicker.openCropper({
      path: imgPath,
      cropperCircleOverlay: false,
      cropperToolbarTitle: 'Crop Image',
      cropperToolbarColor: '#FFFFFF',
      freeStyleCropEnabled: true,
      showCropGuidelines: false,
      showCropFrame: true,
    })
      .then(image => {
        setImages([image.path, ...images]);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const takePhoto = () => {
    ImagePicker.openCamera({
      width,
      height: 300,
    })
      .then(img => {
        cropPhoto({imgPath: img.path});
        //setImages([...images, img.path]);
        actionAfterImage();
      })
      .catch(e => {
        console.log(e);
      });
  };

  return {
    images,
    takePhoto,
    photoTaken,
    setPhotoTaken,
    setImages,
    chosePhotoFromGallery,
    cleanPhotos,
    cropPhoto,
  };
}
