import { StyleSheet, View, Pressable, Text, Alert, Modal } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React, { useState} from 'react';
import ImageViewer from './ImageViewer.js';
const PlaceholderImage = require('../assets/images/download.jpg');
import { openDatabase } from '../App.js';

async function fetchImageDataAndConvert() {
  try {
    // Open the database
    const db = await openDatabase();
    // Execute a SQL query to fetch BLOB data
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Image',
        [],
        (_, { rows }) => {
          const len = rows.length;
          console.log(`Rows found: ${len}`);
          for (let i = 0; i < len; i++) {
            const { imageData } = rows.item(i);
            console.log(`ImageData retrieved`);
            // Convert the retrieved BLOB data to a Blob object
            const blob = new Blob([imageData], { type: 'image/jpeg' });

            // Create a URL for the Blob object
            const imageUrl = URL.createObjectURL(blob);

            // Use the imageUrl as needed (e.g., display in an <img> tag)
            console.log(`Image URL: ${imageUrl}`);
            return(imageUrl)
          }
        },
        (_, error) => {
          console.log('Error occurred while fetching data from database:', error);
        }
      );
    });
  } catch (error) {
    console.error('Error while opening database:', error);
  }
}


export default function Button ({ label, theme, onPress }) {
  const [modalVisible, setModalVisible] = useState(false);
  if( theme === 'vaulttheme') {
    //fetchImageDataAndConvert()
    return(
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Your Vault</Text>
            <ImageViewer imageSource={PlaceholderImage}/>
              <Pressable
                style={[styles.modalContainer, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close Vault</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Pressable
          style={[styles.buttonContainer, styles.buttonOpen, { backgroundColor: "white" }]}
          onPress={() => setModalVisible(true)}>
          <Text style={[styles.buttonLabel, { color: "black"}]}>{label}</Text>
        </Pressable>
      </View>
    )
  }
  if (theme === "primary") {
      return (
        <View style={[styles.buttonContainer, { borderWidth: 4, borderColor: "#ffd33d", borderRadius: 18 }]}>
          <Pressable
            style={[styles.button, { backgroundColor: "#fff" }]}
            onPress={onPress}
          >
            <FontAwesome
              name="picture-o"
              size={18}
              color="#25292e"
              style={styles.buttonIcon}
            />
            <Text style={[styles.buttonLabel, { color: "#25292e" }]}>{label}</Text>
            
        </Pressable>

        </View>
      );
    }
    return (
      <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
    );
  }


const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'grey',
    borderRadius: 14,
    padding: 30,
    paddingBottom: 75,
    paddingTop: 75,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
  },
  modalContainer: {
    width: 320,
    height: 68,
    marginHorizon: 20,
    alignItems: "center",
    justifyItems: "center",
    paddingTop: 50,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: "bold",
  },
});