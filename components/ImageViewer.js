import { StyleSheet, Image} from 'react-native';

export default function ImageViewer({ placeholderImageSource, selectedImage }) {
  const imageSource = selectedImage  ? { uri: selectedImage } : placeholderImageSource;

  return <Image source={imageSource} style={[styles.image, styles.centered]} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
  centered: {
    alignContent: 'center',
    justifyContent: 'center'
  }
});
