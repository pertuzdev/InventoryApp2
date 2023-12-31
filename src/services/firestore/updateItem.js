import firestore from '@react-native-firebase/firestore';

export const updateItem = async (id, data) => {
  return firestore()
    .collection('Items')
    .doc(id)
    .update(data)
    .then(() => {
      console.log('Item updated!');
    })
    .catch(e => {
      console.log(e);
    });
};
