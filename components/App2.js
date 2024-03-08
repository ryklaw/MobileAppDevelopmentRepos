// const { getDefaultConfig } = require('expo/metro-config');
// const defaultConfig = getDefaultConfig(__dirname);
// defaultConfig.resolver.assetExts.push('db');

// module.exports = defaultConfig;

// import * as FileSystem from 'expo-file-system';
// import * as SQLite from 'expo-sqlite';
// import { Asset } from 'expo-asset';

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//   }
//   await FileSystem.downloadAsync(
//     Asset.fromModule(require(pathToDatabaseFile)).uri,
//     FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
//   );
//   return SQLite.openDatabase('myDatabaseName.db');
// }
// const db = SQLite.openDatabase('dbName', version);

// const readOnly = true;
// await db.transactionAsync(async tx => {
//   const result = await tx.executeSqlAsync('SELECT COUNT(*) FROM USERS', []);
//   console.log('Count:', result.rows[0]['COUNT(*)']);
// }, readOnly);