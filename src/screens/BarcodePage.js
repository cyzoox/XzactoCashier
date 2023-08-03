import React, { useState, useRef, useEffect } from "react";
import {
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  Button,
} from "react-native";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SearchInput, { createFilter } from "react-native-search-filter";
import moment from "moment";
import {} from "react-native-paper";
import colors from "../themes/colors";
import AutoFocusClearTextInput from "../components/AutoFocusClearTextInput";
import { useStore } from "../context/StoreContext";
import { useAuth } from "../context/AuthContext";
import formatMoney from "accounting-js/lib/formatMoney.js";
import AppHeader from "../components/AppHeader";
const KEYS_TO_FILTERSs = ["sku"];

export default function BarcodePage({ navigation, route }) {
  const { store_info } = route.params;
  const { user } = useAuth();
  const {
    stores,
    products,
    createList,
    onSaveList,
    products_list,
    inventory,
    option,
    addon,
  } = useStore();

  const [scan, toggleBcode] = useState(true);
  const [barcode, setBarcode] = useState("");
  const [scanned, setScanned] = useState([]);
  const [no_product, setNoProduct] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    // Calculate the total based on the scanned products
    const newTotal = scanned.reduce(
      (accumulator, element) => accumulator + element.quantity * element.sprice,
      0
    );

    setTotal(newTotal);
  }, [scanned]);

  const handleScannedBarcode = (code) => {
    const filteredProducts = products.filter(
      createFilter(code, KEYS_TO_FILTERSs)
    );

    if (filteredProducts.length > 0) {
      const scannedProduct = scanned.find((item) => item.sku === code);

      if (scannedProduct) {
        const newScannedProduct = {
          _partition: `project=${user.id}`,
          _id: filteredProducts[0]._id,
          name: filteredProducts[0].name,
          brand: filteredProducts[0].brand,
          oprice: filteredProducts[0].oprice,
          sprice: filteredProducts[0].sprice,
          unit: filteredProducts[0].unit,
          category: filteredProducts[0].category,
          store_id: store_info._id,
          store: filteredProducts[0].store,
          quantity: 1,
          uid: filteredProducts[0].pr_id,
          timeStamp: moment().unix(),
          addon: "",
          sku: filteredProducts[0].sku,
          addon_price: 0,
          addon_cost: 0,
          option: "",
          withAddtional: false,
        };

        onSaveList(newScannedProduct, user, store_info);
        setNoProduct(false);
      } else {
        // If no product with the same SKU exists, add the scanned product to the array
        const newScannedProduct = {
          _partition: `project=${user.id}`,
          _id: filteredProducts[0]._id,
          name: filteredProducts[0].name,
          brand: filteredProducts[0].brand,
          oprice: filteredProducts[0].oprice,
          sprice: filteredProducts[0].sprice,
          unit: filteredProducts[0].unit,
          category: filteredProducts[0].category,
          store_id: store_info._id,
          store: filteredProducts[0].store,
          quantity: 1,
          uid: filteredProducts[0].pr_id,
          timeStamp: moment().unix(),
          addon: "",
          sku: filteredProducts[0].sku,
          addon_price: 0,
          addon_cost: 0,
          option: "",
          withAddtional: false,
        };

        onSaveList(newScannedProduct, user, store_info);
        setNoProduct(false);
      }
    } else {
      // Handle the case where no matching product is found
      setNoProduct(true);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppHeader
        centerText="BARCODE MODE"
        leftComponent={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <EvilIcons name={"arrow-left"} size={30} color={colors.white} />
          </TouchableOpacity>
        }
      />

      <View style={{ marginHorizontal: 20 }}>
        <AutoFocusClearTextInput
          scan={scan}
          toggleBarcode={toggleBcode}
          setBCode={handleScannedBarcode}
        />
      </View>
      <Text
        style={{
          textAlign: "center",
          paddingVertical: 5,
          fontSize: 18,
          fontWeight: "bold",
          color: colors.red,
        }}
      >
        {no_product && "No product found."}
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
          paddingVertical: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Product</Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Quantity</Text>
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>Total</Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {products_list.map((element, index) => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingVertical: 10,
              }}
            >
              <Text style={{ textAlign: "left" }} key={index}>
                {element.name}
              </Text>
              <Text key={index}>x{element.quantity}</Text>
              <Text key={index}>
                {formatMoney(element.quantity * element.sprice, {
                  symbol: "₱",
                  precision: 2,
                })}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
      <View
        style={{
          padding: 20,

          borderTopWidth: 1,
          borderTopColor: "gray",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Total</Text>
        <Text style={{ fontSize: 18 }}>
          {formatMoney(total, { symbol: "₱", precision: 2 })}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <View style={{ flex: 1, margin: 10 }}>
          <TouchableOpacity
            style={
              products_list.length == 0
                ? {
                    backgroundColor: colors.charcoalGrey,
                    marginRight: 2,
                    borderRadius: 15,
                    paddingVertical: 10,
                  }
                : {
                    backgroundColor: colors.accent,
                    marginRight: 2,
                    borderRadius: 15,
                    paddingVertical: 10,
                  }
            }
            onPress={() => {
              products_list.length === 0 ? {} : navigation.navigate("Checkout"),
                toggleBcode(false);
            }}
          >
            <Text style={{ textAlign: "center" }}>P A Y</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
