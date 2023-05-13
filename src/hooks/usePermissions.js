import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request} from 'react-native-permissions';

export const permissionInitState = {
  locationStatus: 'unavailable',
  cameraStatus: 'unavailable',
  mediaFilesStatus: 'unavailable',
};

export const usePermissions = () => {
  const [permissions, setPermissions] = useState(permissionInitState);

  const validateCameraPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.CAMERA);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.CAMERA);
    }

    setPermissions({
      ...permissions,
      cameraStatus: permissionStatus,
    });
  };

  const verifyCameraPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.CAMERA);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.CAMERA);
    }

    setPermissions(oldPermissions => ({
      ...oldPermissions,
      cameraStatus: permissionStatus,
    }));
  };

  const validateMediaFilesPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else {
      permissionStatus = await request(
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      );
    }

    setPermissions({
      ...permissions,
      mediaFilesStatus: permissionStatus,
    });
  };

  const verifyMediaFilesPermission = async () => {
    let permissionStatus;

    if (Platform.OS === 'ios') {
      permissionStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    } else {
      permissionStatus = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    }

    setPermissions(oldPermissions => ({
      ...oldPermissions,
      mediaFilesStatus: permissionStatus,
    }));
  };

  const hasCameraPermissions = () => {
    console.log(permissions.cameraStatus);
    if (
      permissions.cameraStatus === 'unavailable' ||
      permissions.cameraStatus === 'denied' ||
      permissions.cameraStatus === 'blocked'
    ) {
      return false;
    }

    return true;
  };

  const hasMediaFilesPermissions = () => {
    if (
      permissions.mediaFilesStatus === 'unavailable' ||
      permissions.mediaFilesStatus === 'denied' ||
      permissions.mediaFilesStatus === 'blocked'
    ) {
      return false;
    }

    return true;
  };

  const handleCameraPermissions = () => {
    if (
      permissions.cameraStatus === 'denied' ||
      permissions.cameraStatus === 'unavailable'
    ) {
      validateCameraPermission();
    }
  };

  const handleMediaFilesPermissions = () => {
    if (
      permissions.mediaFilesStatus === 'denied' ||
      permissions.mediaFilesStatus === 'unavailable'
    ) {
      validateMediaFilesPermission();
    }
  };

  useEffect(() => {
    verifyCameraPermission();
    verifyMediaFilesPermission();
  }, []);

  return {
    permissions,
    validateCameraPermission,
    validateMediaFilesPermission,
    verifyCameraPermission,
    verifyMediaFilesPermission,
    handleCameraPermissions,
    handleMediaFilesPermissions,
    hasCameraPermissions,
    hasMediaFilesPermissions,
  };
};
