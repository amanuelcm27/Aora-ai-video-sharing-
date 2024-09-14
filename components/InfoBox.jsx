import { View, Text } from "react-native";
import React from "react";

const InfoBox = ({ title, containerStyles, subtitle, titleStyles }) => {
  return (
    <View className={containerStyles}>
      <Text className={` text-white ${titleStyles} text-center font-psemibold`}>
        {title}
      </Text>
      <Text  className = 'text-sm text-gray-100 font-pregular' >{subtitle}</Text>
    </View>
  );
};

export default InfoBox;
