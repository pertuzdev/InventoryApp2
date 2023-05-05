import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react';
import {BackHandler} from 'react-native';

import {alertOnGoBack} from '../helpers/alerts/alertOnGoBack';
import BackButton from '../components/Button/BackButton';

export function useAlertOnGoBack(navigation, hasUnsavedChanges) {
  //alertOnGoBack(navigation, hasUnsavedChanges);

  const fireAlert = useCallback(
    () => alertOnGoBack(navigation, hasUnsavedChanges),
    [navigation, hasUnsavedChanges],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton handlePress={fireAlert} />,
    });
  }, [navigation, fireAlert]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', fireAlert);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', fireAlert);
  }, [fireAlert]);
}
