import * as FileSystem from 'expo-file-system';

const pathToRunData = FileSystem.documentDirectory + 'RunData7.json';

export async function appendDataToRunData(data) {
  try{
    console.log('Appending data to RunData.json:', data);
    const fileExists = await FileSystem.getInfoAsync(pathToRunData);
    let existingData = [];
    if (fileExists.exists) {
      const fileData = await FileSystem.readAsStringAsync(pathToRunData);
      existingData = JSON.parse(fileData);
    }
    existingData.push(data);
    console.log(existingData);
    await FileSystem.writeAsStringAsync(pathToRunData, JSON.stringify(existingData));
    console.log('Data successfully appended to RunData.json');
  }catch(e){
    console.error(e);
  }
}