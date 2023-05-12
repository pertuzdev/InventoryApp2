import React from 'react';
import {Text} from 'react-native';
import {styles} from './GalleryFooter.styles';

const GalleryFooter = ({image, galleryImages}) => {
  return (
    <Text style={styles.imageViewFooter}>
      {image.imageIndex + 1} / {galleryImages.length}
    </Text>
  );
};

export default GalleryFooter;
