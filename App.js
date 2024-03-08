//import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
//import Vault from './components/Vault.js';
//import App2 from './components/normal.js';
import { StyleSheet,View} from 'react-native';
import Button from './components/Button.js';
import ImageViewer from './components/ImageViewer.js';
const PlaceholderImage = require('./assets/images/download.jpg');
import * as ImagePicker from 'expo-image-picker';
//import * as FileSystem from 'expo-file-system';
import * as SQLite from 'expo-sqlite';
import { schedulePushNotification } from './components/Notifications.js';

export async function openDatabase(){
  const table = "Images_table";
  const db= SQLite.openDatabase('SavedPhotos.db');
  db.transaction((tx)=> {
    tx.executeSql(`
      CREATE TABLE IF NOT EXISTS Image
         (
        ImageData TEXT
      );`,
      [table],
      (tx, result) => {
        console.log("DBS");
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
  console.log("Image Table Created")
  return SQLite.openDatabase('SavedPhotos.db');
}
export async function EraseDatabase(){
  const table = "Images_table";
  const db= SQLite.openDatabase('SavedPhotos.db');
  db.transaction((tx)=> {
    tx.executeSql(`
      DROP TABLE Image`,
      [table],
      (tx, result) => {
        console.log("DBS");
      },
      (tx, error) => {
        console.log(error);
      }
    );
  });
  console.log("Table Deleted")
  return SQLite.openDatabase('SavedPhotos.db recreated');
}

export default function App() {
  //openDatabase()
    const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        //setShowAppOptions(true);
      } else {
        alert('You did not select any image.');
      }
    };
    
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
        </View>
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose an Image" onPress={pickImageAsync}/>
          <Button theme="primary" label="Save to Vault" onPress={SaveToDatabase}/>
          <Button theme="vaulttheme" label="Open Vault"/>
          <Button theme="primary" label="Erase Vault" onPress={EraseDatabase}/>
        </View>
      </View>
    );


    async function SaveToDatabase(evt) {
      console.log("Selected image start:", selectedImage);
      try {
        // Open the database
        const db = await openDatabase();
    
        // Function to convert the image URI to a Blob
        const blobbedImage = async (uri) => {
          const response = await fetch(uri);
          return await response.blob();
        };
    
        // Save the Blob to the database
        const saveBlobToDB = async (blob) => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql(
                'INSERT INTO Image (ImageData) VALUES (?)',
                [blob],
                (_, { rowsAffected }) => {
                  if (rowsAffected > 0) {
                    schedulePushNotification({
                      title:'Image saved to database',
                      body:'Thanks for Saving',
                      data:'data!'
                    })
                    console.log('Image saved to database successfully');
                    resolve();
                  } else {
                    console.log('Image could not be saved to database');
                    reject(new Error('Image could not be saved to database'));
                  }
                },
                (_, error) => {
                  console.log('Error occurred while saving image to database:', error);
                  reject(error);
                }
              );
            });
          });
        };
    
        // Convert selected image to Blob
        const blob = await blobbedImage(selectedImage);
    
        // Save Blob to database
        await saveBlobToDB(blob);
      } catch (error) {
        console.error('Error while saving image to database:', error);
      }
    }    
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      paddingTop: 58,
    },
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
    footerContainer: {
      flex: 2 / 3,
      alignItems: 'center',
    },
  });
