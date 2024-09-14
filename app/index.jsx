import { Link, Redirect, router } from "expo-router";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "../components/CustomButton";
import { StatusBar } from "expo-status-bar";
import { useContext, useEffect } from "react";
import { useGlobalContext } from "../context/GlobalProvider";

const RootLayout = () => {
  const { isLoading, isLoggedIn } = useGlobalContext();
  if (!isLoading && isLoggedIn) {
    return <Redirect href={`/home`}></Redirect>;
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full h-[85vh]   justify-center items-center px-4  ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[84px]"
          ></Image>
          <Image
            source={images.cards}
            resizeMode="contain"
            className="min-w-[380px] h-[300px]"
          ></Image>
          <View className="relative mt-5 ">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless opportunites with
              <Text className="text-secondary-200"> Aora</Text>
            </Text>
            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 -right-8 "
              resizeMode="contain"
            ></Image>
          </View>
          <Text className="text-sm text-gray-100 mt-7 text-center">
            where creativity meets innovation embark on a journey of limitless
            exploration with Aora
          </Text>
          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")}
            containerStyles="w-full mt-7"
          ></CustomButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default RootLayout;
