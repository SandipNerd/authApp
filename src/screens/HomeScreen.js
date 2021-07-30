import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

import CustomButton from '../components/CustomButton';

const HomeScreen = () => {
  const [imageUri, setImageUri] = useState(' ');
  const [imageName, setyImageName] = useState();
  const [loading, setLoading] = useState(false);

  const chooseImageHandler = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.launchImageLibrary(options, response => {
      if (response.didCancel) {
        alert('You cancelled image picker');
      } else if (response.error) {
        alert('ImagePicker Error');
      } else {
        const uri = response.assets[0].uri;
        const name = response.assets[0].fileName;
        setImageUri(uri);
        setyImageName(name);
      }
    });
  };

  const uploadImageHandler = async () => {
    if (imageUri === ' ') {
      alert('Image not selected!');
      return;
    }
    setLoading(true);
    await storage()
      .ref(imageName)
      .putFile(imageUri)
      .then(snapshot => {
        alert(`Image has been successfully uploaded.`);
        setLoading(false);
        setImageUri('');
      })
      .catch(e => alert('Failed to upload the image'));
    setLoading(false);
  };

  return (
    <View style={styles.screen}>
      <Modal visible={loading} transparent={true}>
        <View style={styles.modal}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </Modal>
      {imageUri !== ' ' ? (
        <Image
          style={styles.image}
          source={{uri: imageUri}}
          resizeMode="cover"
        />
      ) : (
        <Text style={styles.welcome}>Upload Image</Text>
      )}

      <CustomButton title="choose image" click={chooseImageHandler} />
      <CustomButton title="upload image" click={uploadImageHandler} />
      <CustomButton
        title="logout"
        click={() => {
          auth()
            .signOut()
            .then(() => console.log('User signed out!'));
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  welcome: {
    fontWeight: 'bold',
    fontSize: 30,
    width: 350,
    height: 250,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'grey',
  },
  image: {
    width: 350,
    height: 250,
  },
});

export default HomeScreen;
