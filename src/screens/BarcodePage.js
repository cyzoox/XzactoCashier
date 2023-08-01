import React,{useState, useRef, useEffect} from 'react';
import { TouchableOpacity, ImageBackground,StyleSheet, View, Text, Dimensions, Image, TouchableWithoutFeedback, ScrollView, TextInput, Button} from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';

import {  } from 'react-native-paper';
import colors from '../themes/colors';
import AutoFocusClearTextInput from '../components/AutoFocusClearTextInput';
import { useStore } from '../context/StoreContext';
const KEYS_TO_FILTERSs = ['sku'];

export default function BarcodePage() {
    // const { user } = useAuth();
    const { 
      stores,
      products,
      createList,
      onSaveList,
       products_list,
       inventory,
       option,
       addon
     } = useStore();
   
    const [scan, toggleBcode] = useState(true);
    const [barcode, setBarcode] = useState('');
  console.log(filteredProducts)
    const handleScannedBarcode = (code) => {
        
    const filteredProducts = products.filter(createFilter(code, KEYS_TO_FILTERSs))
        setBarcode(code)
        console.log(code)
  
    }
 
  return (
        <View>
            <Text style={{textAlign:'center', fontSize: 20, fontWeight:'bold'}}>BARCODE MODE </Text>
        <View style={{marginHorizontal: 20}}>
        <AutoFocusClearTextInput  scan={scan} toggleBarcode={toggleBcode} setBCode={handleScannedBarcode}/>
        </View>
        <View style={{ margin: 5, flexDirection:'row', justifyContent:'space-between'}}>
        <Button buttonStyle={{backgroundColor: colors.red, borderRadius: 5, paddingHorizontal:20}} title="  Cancel  " onPress={()=> overlayVisible(false)}/>
          <Button buttonStyle={{backgroundColor: colors.accent, borderRadius: 5, paddingHorizontal:20}} title="  Save  " onPress={()=> handleInput()}/>
          </View>
     
        <View style={{flexDirection:'row', justifyContent:'space-around'}}>
       {/* <View style={{flex: 2,  margin: 5}}>
          <Button buttonStyle={{backgroundColor: colors.red}} title="Add B.O" onPress={()=> onCreateBO()}/>
          </View>
          <View style={{flex: 2,  margin: 5}}>
          <Button buttonStyle={{backgroundColor: colors.red}} title="Add to Return" onPress={()=> onCreateReturn()}/>
          </View>*/}
              </View>
        </View>
  );
}