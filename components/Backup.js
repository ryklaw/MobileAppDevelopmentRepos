// import React, { useState} from 'react';
// import { StyleSheet,View} from 'react-native';
// import Button from './components/Button.js';
// import ImageViewer from './components/ImageViewer.js';
// const PlaceholderImage = require('./assets/images/download.jpg');
// import * as ImagePicker from 'expo-image-picker';
// import MapView, {Marker} from 'react-native-maps';
// import * as MediaLibrary from 'expo-media-library';
// //import * as FileSystem from 'expo-file-system';
// // import * as SQLite from 'expo-sqlite';
// // import { schedulePushNotification } from './components/Notifications.js';
// const INITIAL_REGION = {
// 	latitude: 37.33,
// 	longitude: -122,
// 	latitudeDelta: 2,
// 	longitudeDelta: 2
// };

// export default function App() {
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [MarkerCoordinateLat, setMarkerCoordinateLat]=useState();
//     const [MarkerCoordinateLong, setMarkerCoordinateLong]=useState();
//     const getRandomImageAsync = async () => {
//       // Request permissions
//       const { status } = await MediaLibrary.requestPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'We need permission to access your camera roll.');
//         return;
//       }
  
//       // Fetch all images
//       const album = await MediaLibrary.getAlbumAsync('Camera');
//       const assets = await MediaLibrary.getAssetsAsync({
//         album: album,
//         mediaType: 'photo',
//         first: 100, // Fetch the first 100 images (adjust as needed)
//         sortBy: MediaLibrary.SortBy.creationTime,
//       });
  
//       if (assets.assets.length > 0) {
//         // Select a random image
//         const randomIndex = Math.floor(Math.random() * assets.assets.length);
//         const randomImage = assets.assets[randomIndex].uri;
//         setSelectedImage(randomImage);
//       } else {
//         Alert.alert('No images found', 'There are no images in your camera roll.');
//       }
//     };
//     const pickImageAsync = async () => {
//       let result = await ImagePicker.launchImageLibraryAsync({
//         allowsEditing: true,
//         quality: 1,
//       });
      
  
//       if (!result.canceled) {
//         setSelectedImage(result.assets[0].uri);
//       } else {
//         alert('You did not select any image.');
//       }
//     };
    
//     return (
//       <View style={styles.container}>
        
//         <View style={styles.imageContainer}>
//           <ImageViewer
//             placeholderImageSource={PlaceholderImage}
//             selectedImage={selectedImage}
//           />
//         </View>
//         <MapView style={[styles.map,{paddingTop: 100}]} 
//         initialRegion={INITIAL_REGION}
//         // onPress={e => console.log(e.nativeEvent.coordinate)}
//         // onPress={e => console.log(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude)}
//         onPress= {e => {setMarkerCoordinateLat(e.nativeEvent.coordinate.latitude); setMarkerCoordinateLong(e.nativeEvent.coordinate.longitude); console.log(e.nativeEvent.coordinate)}}
//         >
//         <Marker coordinate={{ latitude: MarkerCoordinateLat, longitude: MarkerCoordinateLong}}/>
//         </MapView>
        

//         <View style={styles.footerContainer}>
//           <Button theme="primary" label="Submit" onPress={pickImageAsync}/>
//           <Button theme="primary" label="Pick Random Image" onPress={getRandomImageAsync} />
//           {/* <Button theme="primary" label="Save to Vault" onPress={console.log(newcoordinate)}/> */}
//           {/* <Button theme="vaulttheme" label="Open Vault"/>
//           <Button theme="primary" label="Erase Vault" onPress={EraseDatabase}/> */}
//         </View>
//       </View>
//     );
// }
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       backgroundColor: '#25292e',
//       alignItems: 'center',
//     },
//     Mapcontainer: {
//       flex: 2/3,
//       borderRadius: 18
//     },
//     map: {
//       width: '82%',
//       height: '30%',
//       borderRadius: 18
//     },
//     imageContainer: {
//       flex: 1,
//       paddingTop: 58,
//     },
//     image: {
//       width: 320,
//       height: 440,
//       borderRadius: 18,
//     },
//     footerContainer: {
//       flex: 2/ 3,
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
    
//   });

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Alert } from 'react-native';
// import Button from './components/Button.js';
// import ImageViewer from './components/ImageViewer.js';
// import MapView, { Marker } from 'react-native-maps';
// import * as MediaLibrary from 'expo-media-library';
// // import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';
// import { schedulePushNotification } from './components/Notifications.js';

// const PlaceholderImage = require('./assets/images/download.jpg');

// const INITIAL_REGION = {
//   latitude: 37.33,
//   longitude: -122,
//   latitudeDelta: 2,
//   longitudeDelta: 2,
// };

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [markerCoordinate, setMarkerCoordinate] = useState(null);
//   const [markerCoordinate2, setMarkerCoordinate2] = useState(null);
//   const [markerCoordinate3, setMarkerCoordinate3] = useState(null);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
//   const [hasNotificationPermission, setHasNotificationPermission] = useState(null);


//   useEffect(() => {
//     (async () => {
//       const mediaStatus = await MediaLibrary.requestPermissionsAsync();
//       setHasMediaLibraryPermission(mediaStatus.status === 'granted');

//       const notificationStatus = await Notifications.requestPermissionsAsync();
//       setHasNotificationPermission(notificationStatus.status === 'granted');
//     })();
//   }, []);

//   const getRandomImageAsync = async () => {
//     if (hasMediaLibraryPermission === null) {
//       Alert.alert('Permission required', 'We need permission to access your camera roll.');
//       return;
//     }

//     if (!hasMediaLibraryPermission) {
//       Alert.alert('Permission denied', 'You have denied access to the camera roll.');
//       return;
//     }

//     const album = await MediaLibrary.getAlbumAsync('Camera');
//     const assets = await MediaLibrary.getAssetsAsync({
//       album: album,
//       mediaType: 'photo',
//       first: Number.MAX_SAFE_INTEGER, // Attempt to fetch all images
//       sortBy: MediaLibrary.SortBy.creationTime,
//     });

//     if (assets.assets.length > 0) {
//       const randomIndex = Math.floor(Math.random() * assets.assets.length);
//       const randomImage = assets.assets[randomIndex];

//       const assetInfo = await MediaLibrary.getAssetInfoAsync(randomImage.id);
//       setSelectedImage(assetInfo.localUri || assetInfo.uri);

//       if (assetInfo.location) {
//         const { latitude, longitude } = assetInfo.location;
//         setMarkerCoordinate2({ latitude, longitude });
//         setMarkerCoordinate3({});

//         // Log the location data to the console
//         console.log('Image Location Data:', { latitude, longitude });
//       } else {
//         Alert.alert('No location data', 'The selected image does not have location data.');
//       }
//     } else {
//       Alert.alert('No images found', 'There are no images in your camera roll.');
//     }
//   };

//   const sendNotification = async (message) => {
//     if (!hasNotificationPermission) {
//       Alert.alert('Permission required', 'We need permission to send notifications.');
//       return;
//     }

//     schedulePushNotification({
//       title:'How Far You Were Away',
//       body: message,
//       data:'data!'
//       })
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;

//     const R = 6371; // Earth's radius in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon1 - lon2);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   const handleSubmit = async () => {
//     console.log("handleSubmit called");

//     if (markerCoordinate && markerCoordinate2) {
//       const distance = calculateDistance(
//         markerCoordinate.latitude,
//         markerCoordinate.longitude,
//         markerCoordinate2.latitude,
//         markerCoordinate2.longitude
//       );
//       const message = `The distance between the map marker and the image location is ${distance.toFixed(2)} kilometers.`;
//       console.log("Distance calculated:", message);
//       await sendNotification(message);
//     } else {
//       console.log("Either marker location or image location is not set.");
//       await sendNotification("Either marker location or image location is not set.");
//     }
//     reveal(); // Call reveal to show the image location marker
//   };

//   const reveal = () => {
//     setMarkerCoordinate3(markerCoordinate2);
//   };

//   const handleMapPress = (e) => {
//     setMarkerCoordinate(e.nativeEvent.coordinate);
//     console.log("Map pressed:", e.nativeEvent.coordinate);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer
//           placeholderImageSource={PlaceholderImage}
//           selectedImage={selectedImage}
//         />
//       </View>
//       <MapView
//         style={styles.map}
//         initialRegion={INITIAL_REGION}
//         onPress={handleMapPress}
//       >
//         {markerCoordinate && (
//           <Marker coordinate={markerCoordinate} />
//         )}
//         {markerCoordinate3 && (
//           <Marker coordinate={markerCoordinate3} 
//           pinColor='orange'/>
//         )}
//       </MapView>
//       <View style={styles.footerContainer}>
//         <Button theme="primary" label="Pick Random Image" onPress={getRandomImageAsync} />
//         <Button theme="primary" label="Submit" onPress={handleSubmit} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   map: {
//     width: '82%',
//     height: '30%',
//     borderRadius: 18,
//     paddingTop:200,
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 20,
//     paddingBottom: 245,
//   },
//   footerContainer: {
//     flex: 2/ 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Alert } from 'react-native';
// import Button from './components/Button.js';
// import ImageViewer from './components/ImageViewer.js';
// import MapView, { Marker } from 'react-native-maps';
// import * as MediaLibrary from 'expo-media-library';
// import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';

// const PlaceholderImage = require('./assets/images/download.jpg');

// const INITIAL_REGION = {
//   latitude: 37.33,
//   longitude: -122,
//   latitudeDelta: 2,
//   longitudeDelta: 2,
// };

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [markerCoordinate, setMarkerCoordinate] = useState(null);
//   const [markerCoordinate2, setMarkerCoordinate2] = useState(null);
//   const [markerCoordinate3, setMarkerCoordinate3] = useState(null);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
//   const [hasNotificationPermission, setHasNotificationPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const mediaStatus = await MediaLibrary.requestPermissionsAsync();
//       setHasMediaLibraryPermission(mediaStatus.status === 'granted');

//       const notificationStatus = await Notifications.requestPermissionsAsync();
//       setHasNotificationPermission(notificationStatus.status === 'granted');
//     })();
//   }, []);

//   const getRandomImageAsync = async () => {
//     if (hasMediaLibraryPermission === null) {
//       Alert.alert('Permission required', 'We need permission to access your camera roll.');
//       return;
//     }

//     if (!hasMediaLibraryPermission) {
//       Alert.alert('Permission denied', 'You have denied access to the camera roll.');
//       return;
//     }

//     const album = await MediaLibrary.getAlbumAsync('Camera');
//     const assets = await MediaLibrary.getAssetsAsync({
//       album: album,
//       mediaType: 'photo',
//       first: Number.MAX_SAFE_INTEGER, // Attempt to fetch all images
//       sortBy: MediaLibrary.SortBy.creationTime,
//     });

//     if (assets.assets.length > 0) {
//       const randomIndex = Math.floor(Math.random() * assets.assets.length);
//       const randomImage = assets.assets[randomIndex];

//       const assetInfo = await MediaLibrary.getAssetInfoAsync(randomImage.id);
//       setSelectedImage(assetInfo.localUri || assetInfo.uri);

//       if (assetInfo.location) {
//         const { latitude, longitude } = assetInfo.location;
//         setMarkerCoordinate2({ latitude, longitude });

//         // Log the location data to the console
//         console.log('Image Location Data:', { latitude, longitude });
//       } else {
//         Alert.alert('No location data', 'The selected image does not have location data.');
//       }
//     } else {
//       Alert.alert('No images found', 'There are no images in your camera roll.');
//     }
//   };

//   const sendNotification = async (message) => {
//     if (!hasNotificationPermission) {
//       Alert.alert('Permission required', 'We need permission to send notifications.');
//       return;
//     }

//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Distance Check",
//         body: message,
//       },
//       trigger: null, // sends immediately
//     });
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;

//     const R = 6371; // Earth's radius in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon1 - lon2);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   const handleSubmit = async () => {
//     console.log("handleSubmit called");

//     if (markerCoordinate && markerCoordinate2) {
//       const distance = calculateDistance(
//         markerCoordinate.latitude,
//         markerCoordinate.longitude,
//         markerCoordinate2.latitude,
//         markerCoordinate2.longitude
//       );
//       const message = `The distance between the map marker and the image location is ${distance.toFixed(2)} kilometers.`;
//       console.log("Distance calculated:", message);
//       await sendNotification(message);
//     } else {
//       console.log("Either marker location or image location is not set.");
//       await sendNotification("Either marker location or image location is not set.");
//     }
//     reveal(); // Call reveal to show the image location marker
//   };

//   const reveal = () => {
//     setMarkerCoordinate3(markerCoordinate2);
//   };

//   const handleMapPress = (e) => {
//     setMarkerCoordinate(e.nativeEvent.coordinate);
//     console.log("Map pressed:", e.nativeEvent.coordinate);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer
//           placeholderImageSource={PlaceholderImage}
//           selectedImage={selectedImage}
//         />
//       </View>
//       <MapView
//         style={styles.map}
//         initialRegion={INITIAL_REGION}
//         onPress={handleMapPress}
//       >
//         {markerCoordinate && (
//           <Marker coordinate={markerCoordinate} />
//         )}
//         {markerCoordinate3 && (
//           <Marker coordinate={markerCoordinate3} 
//           pinColor='orange'/>
//         )}
//       </MapView>
//       <View style={styles.footerContainer}>
//         <Button theme="primary" label="Pick Random Image" onPress={getRandomImageAsync} />
//         <Button theme="primary" label="Submit" onPress={handleSubmit} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   map: {
//     width: '82%',
//     height: '30%',
//     borderRadius: 18,
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 58,
//   },
//   footerContainer: {
//     flex: 2 / 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

// import React, { useState, useEffect } from 'react';
// import { StyleSheet, View, Alert, Modal} from 'react-native';
// import Button from './Button.js';
// import ImageViewer from './ImageViewer.js';
// import MapView, { Marker } from 'react-native-maps';
// import * as MediaLibrary from 'expo-media-library';
// import * as Location from 'expo-location';
// import * as Notifications from 'expo-notifications';
// import { schedulePushNotification } from './Notifications.js';

// const PlaceholderImage = require('./assets/images/download.jpg');

// const INITIAL_REGION = {
//   latitude: 37.33,
//   longitude: -122,
//   latitudeDelta: 2,
//   longitudeDelta: 2,
// };

// export default function App() {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [markerCoordinate, setMarkerCoordinate] = useState(null);
//   const [markerCoordinate2, setMarkerCoordinate2] = useState(null);
//   const [markerCoordinate3, setMarkerCoordinate3] = useState(null);
//   const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
//   const [hasNotificationPermission, setHasNotificationPermission] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const mediaStatus = await MediaLibrary.requestPermissionsAsync();
//       setHasMediaLibraryPermission(mediaStatus.status === 'granted');

//       const notificationStatus = await Notifications.requestPermissionsAsync();
//       setHasNotificationPermission(notificationStatus.status === 'granted');
//     })();
//   }, []);

//   const getRandomImageAsync = async () => {
//     console.log("randomstart")
//     if (hasMediaLibraryPermission === null) {
//       Alert.alert('Permission required', 'We need permission to access your camera roll.');
//       return;
//     }

//     if (!hasMediaLibraryPermission) {
//       Alert.alert('Permission denied', 'You have denied access to the camera roll.');
//       return;
//     }
//     console.log("permission checked")

//     const album = await MediaLibrary.getAlbumAsync('Camera');
//     const assets = await MediaLibrary.getAssetsAsync({
//       album: album,
//       mediaType: 'photo',
//       first: Number.MAX_SAFE_INTEGER, // Attempt to fetch all images
//       // sortBy: MediaLibrary.SortBy.creationTime,
//     });
//     console.log("imagespulled")

//     if (assets.assets.length > 0) {
//       const randomIndex = Math.floor(Math.random() * assets.assets.length);
//       const randomImage = assets.assets[randomIndex];

//       const assetInfo = await MediaLibrary.getAssetInfoAsync(randomImage.id);
//       setSelectedImage(assetInfo.localUri || assetInfo.uri);

//       if (assetInfo.location) {
//         const { latitude, longitude } = assetInfo.location;
//         setMarkerCoordinate2({ latitude, longitude });

//         // Log the location data to the console
//         console.log('Image Location Data:', { latitude, longitude });
//       } else {
//         Alert.alert('No location data', 'The selected image does not have location data.');
//       }
//     } else {
//       Alert.alert('No images found', 'There are no images in your camera roll.');
//     }
//   };

//   const sendNotification = async (message) => {
//     if (!hasNotificationPermission) {
//       Alert.alert('Permission required', 'We need permission to send notifications.');
//       return;
//     }

//     // await Notifications.scheduleNotificationAsync({
//     //   content: {
//     //     title: "Distance Check",
//     //     body: message,
//     //   },
//     //   trigger: null, // sends immediately
//     // });
//     schedulePushNotification({
//       title:'How far away you were',
//       body: message,
//       data:'data!'
//     })
//   };

//   const calculateDistance = (lat1, lon1, lat2, lon2) => {
//     const toRad = (value) => (value * Math.PI) / 180;

//     const R = 6371; // Earth's radius in kilometers
//     const dLat = toRad(lat2 - lat1);
//     const dLon = toRad(lon1 - lon2);
//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
//       Math.sin(dLon / 2) * Math.sin(dLon / 2);
//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//     const distance = R * c; // Distance in kilometers
//     return distance;
//   };

//   const handleSubmit = async () => {
//     console.log("handleSubmit called");

//     if (markerCoordinate && markerCoordinate2) {
//       const distance = calculateDistance(
//         markerCoordinate.latitude,
//         markerCoordinate.longitude,
//         markerCoordinate2.latitude,
//         markerCoordinate2.longitude
//       );
//       const message = `The distance between the map marker and the image location is ${distance.toFixed(2)} kilometers.`;
//       console.log("Distance calculated:", message);
//       await sendNotification(message);
//     } else {
//       console.log("Either marker location or image location is not set.");
//       await sendNotification("Either marker location or image location is not set.");
//     }
//     reveal(); // Call reveal to show the image location marker
//   };

//   const reveal = () => {
//     setMarkerCoordinate3(markerCoordinate2);
//   };

//   const handleMapPress = (e) => {
//     setMarkerCoordinate(e.nativeEvent.coordinate);
//     console.log("Map pressed:", e.nativeEvent.coordinate);
//   };
//   function thething(){
//     getRandomImageAsync()
//     setMarkerCoordinate3({})
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.imageContainer}>
//         <ImageViewer
//           placeholderImageSource={PlaceholderImage}
//           selectedImage={selectedImage}
//         />
//       </View>
//       <MapView
//         style={styles.map}
//         initialRegion={INITIAL_REGION}
//         onPress={handleMapPress}
//       >
//         {markerCoordinate && (
//           <Marker coordinate={markerCoordinate} />
//         )}
//         {markerCoordinate3 && (
//           <Marker coordinate={markerCoordinate3} 
//           pinColor='orange'/>
//         )}
//       </MapView>
//       <View style={styles.footerContainer}>
//         <Button theme="primary" label="Pick Random Image" onPress={thething} />
//         <Button theme="primary" label="Submit" onPress={handleSubmit} />
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#25292e',
//     alignItems: 'center',
//   },
//   map: {
//     width: '82%',
//     height: '30%',
//     borderRadius: 18,
//   },
//   imageContainer: {
//     flex: 1,
//     paddingTop: 58,
//   },
//   footerContainer: {
//     flex: 2 / 3,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
