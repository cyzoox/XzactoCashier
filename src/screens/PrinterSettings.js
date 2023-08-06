import React, { useState } from 'react';
import { View, Text, Button, Picker, TextInput , TouchableOpacity} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import BluetoothPrinter from 'react-native-bluetooth-escpos-printer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useStore } from '../context/StoreContext';
import AppHeader from '../components/AppHeader';

const PrintingSettings = () => {
  const { fontType, fontSize, updateFontSettings } = useStore();
  const [selectedFont, setSelectedFont] = useState(fontType);
  const [selectedFontSize, setSelectedFontSize] = useState(fontSize);
  const [textToPrint, setTextToPrint] = useState('Hello, world!');

  const handlePrint = () => {
    BluetoothPrinter.printText(textToPrint, { fontSize: selectedFontSize, fontType: selectedFont });
  };

  const handleFontTypeChange = async (newFontType) => {
    setSelectedFont(newFontType);
    await saveSettingsToAsyncStorage(newFontType, selectedFontSize);
  };

  const handleFontSizeChange = async (newFontSize) => {
    setSelectedFontSize(newFontSize);
    await saveSettingsToAsyncStorage(selectedFont, newFontSize);
  };

  const saveSettingsToAsyncStorage = async (newFontType, newFontSize) => {
    try {
      const settings = JSON.stringify({ fontType: newFontType, fontSize: newFontSize });
      await AsyncStorage.setItem('printer_settings', settings);
    } catch (error) {
      console.error('Error saving printer settings to AsyncStorage:', error);
    }
  };

  return (
    <View>
         <AppHeader 
            centerText="Printer Settings"
            leftComponent={
                <TouchableOpacity onPress={()=> navigation.goBack()}>
                  <EvilIcons name={'arrow-left'} size={30} color={colors.white}/>
                </TouchableOpacity>
            } 
          />
      <Text>Printing Screen</Text>
      <TextInput
        placeholder="Enter text to print"
        value={textToPrint}
        onChangeText={setTextToPrint}
      />
      <Picker
        selectedValue={selectedFont}
        onValueChange={handleFontTypeChange}
      >
        <Picker.Item label="Font A" value="A" />
        <Picker.Item label="Font B" value="B" />
        {/* Add more font options as needed */}
      </Picker>
      <Picker
        selectedValue={selectedFontSize}
        onValueChange={handleFontSizeChange}
      >
        <Picker.Item label="Small" value={1} />
        <Picker.Item label="Medium" value={2} />
        <Picker.Item label="Large" value={3} />
        {/* Add more font size options as needed */}
      </Picker>
      <Button title="Print" onPress={handlePrint} />
    </View>
  );
};

export default PrintingSettings;
