import {Alert} from 'react-native';

export function alertOnDeleteImage(onDeleteImage) {
  Alert.alert(
    'Eliminar foto',
    'Esta acción es permanente y no se puede deshacer. ¿Estás seguro que quieres eliminar esta foto?',
    [
      {text: 'Cancelar', style: 'cancel', onPress: () => {}},
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: () => onDeleteImage(),
      },
    ],
  );

  return true;
}
