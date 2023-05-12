import React from 'react';
import GalleryFooter from '../components/GalleryFooter/GalleryFooter';
import {useState} from 'react';

export const useGallery = ({images}) => {
  const galleryImages = images.map(image => ({uri: image}));
  const [galleryConfig, setGalleryConfig] = useState({
    isVisible: false,
    index: 0,
  });

  const renderGalleryFooterComponent = ({image}) => {
    console.log('motam', image);
    return <GalleryFooter image={image} galleryImages={galleryImages} />;
  };

  const handleOpenGallery = index => {
    setGalleryConfig({isVisible: true, index});
  };

  return {
    galleryImages,
    galleryConfig,
    setGalleryConfig,
    renderGalleryFooterComponent,
    handleOpenGallery,
  };
};
