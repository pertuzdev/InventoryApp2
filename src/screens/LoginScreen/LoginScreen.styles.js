import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50,
  },

  logWp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logo: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
  },
  btnWp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 25,
    marginHorizontal: 50,
    paddingVertical: 12,
  },
  navButtonText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 14,
    fontWeight: '500',
    color: '#2e64e5',
    marginHorizontal: 16,
    textAlign: 'center',
  },
  btnWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginVertical: 16,
    marginHorizontal: 16,
    marginBottom: 60,
  },
});
