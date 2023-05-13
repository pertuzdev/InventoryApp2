import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../styles/globalStyles';

const width = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imgCont: {
    width,
    height: 300,
    backgroundColor: colors.gray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width,
    height: 300,
  },
  splashImg: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    //backgroundColor: 'blue',
  },
  addBtnWrapper: {
    width,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: 20,
  },
  addBtn: {
    backgroundColor: colors.primaryBlue,
    padding: 8,
    borderWidth: 1,
    borderRadius: 100,
  },
  paginationCarousel: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontFamily: 'Poppins',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 2,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
  },
  deleteImgButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontFamily: 'Poppins',
    fontSize: 13,
    color: 'white',
    textAlign: 'center',
    padding: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 100,
  },
});
