import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';
import Feather from 'react-native-vector-icons/Feather'

const AutoFocusClearTextInput = ({scan, toggleBarcode, setBCode}) => {
 
  const [bcode, setBarcode] = useState('');
 
  const handleScannedBarcode = (text) => {
    setBarcode(text);
    setBCode(text)
  }

  return (
    <View>
        {
          scan &&
          <View style={styles.textInputContainer}>
          <TextInput
            value={bcode}
            onEndEditing={(event) => {
              handleScannedBarcode(event.nativeEvent.text)
            }}
            onFocus={() => {
              toggleBarcode(true); // Show the clear button on focus
            }}
            autoFocus
            onBlur={() => {
              // Hide the clear button after a delay (500ms in this example)
              setTimeout(() => {
                toggleBarcode(false)
                setBarcode('')
                toggleBarcode(true)
              }, 300);
            }}
            style={styles.textInput}
          />
          {bcode !== '' && (
            <TouchableOpacity style={styles.iconStyle} onPress={() => setBarcode('')}>
              <Feather name={'x-circle'} size={20} color={colors.black} />
            </TouchableOpacity>
          )}
        </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({

  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  iconStyle: {
    padding: 4,
  },
  discountButton: {paddingVertical: 4,paddingHorizontal: 10, borderWidth: 1, borderColor: colors.accent, borderRadius: 10},
  discountButton2: {paddingVertical: 4,paddingHorizontal: 10, borderWidth: 1, borderColor: colors.primary, borderRadius: 10, backgroundColor: colors.primary}
  });

export default AutoFocusClearTextInput;
