import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { icons } from "../constants";
import { router, usePathname } from "expo-router";

const SearchInput = ({ placeholder, initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");
  const handleSearch = () => {
    if (!query) {
      return Alert.alert("Please add something to search for");
    }
    if (pathname.startsWith("/search")) {
      router.setParams({ query });
    } else {
      router.push(`/search/${query}/`);
    }
  };
  return (
    <View className="flex-row w-full h-16 mt-4 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
      <TextInput
        className="flex-1 text-white font-psemibold text-base"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />
      <TouchableOpacity
        onPress={handleSearch}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
