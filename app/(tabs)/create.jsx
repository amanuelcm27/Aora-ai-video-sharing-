import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import { icons } from "../../constants";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
const Create = () => {
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });
  const { user } = useGlobalContext();
  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type: selectType === "image" ? "image/*" : "video/*",
    });
    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    }
  };
  const submit = async () => {
    if (!form.prompt || !form.title || !form.thumbnail || !form.video) {
      return Alert.alert("please fill all fields. ");
    }
    setUploading(true);
    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });
      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
      setUploading(false);
    } catch (error) {
      Alert.alert("Error", error.message);
      setUploading(false);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };
  const clearForm = (type) => {
    setForm({ ...form, [type]: null });
  };
  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView>
        <View className="px-4 my-6">
          <Text className="text-2xl text-white font-psemibold">
            Upload Video
          </Text>
          <FormField
            title={`Video Title`}
            value={form.title}
            placeholder={`Give your video a catchy title ...`}
            handleChange={(e) => setForm({ ...form, title: e })}
            otherStyles={`mt-10`}
          />
          <View className="mt-7 space-y-2">
            <View className="flex-row items-center ">
              <Text className="flex-1 text-base text-gray-100 font-pmedium">
                Upload Video
              </Text>
              <TouchableOpacity onPress={() => clearForm("video")}>
                <Text className="text-white">Clear</Text>
              </TouchableOpacity>
            </View>

            {form.video ? (
              <Video
                className="w-full h-60 bg-black-200 rounded-xl mt-3"
                source={{ uri: form.video.uri }}
                resizeMode={ResizeMode.COVER}
                useNativeControls
                isLooping
              ></Video>
            ) : (
              <TouchableOpacity onPress={() => openPicker("video")}>
                <View className="w-full h-40 bg-black-200 rounded-xl mt-3 justify-center items-center">
                  <Image
                    className="w-10 h-10"
                    source={icons.upload}
                    resizeMode="contain"
                  />
                </View>
              </TouchableOpacity>
            )}
            <View className="mt-6 space-y-2">
              <View className="flex-row items-center ">
                <Text className="flex-1 text-base text-gray-100 font-pmedium">
                  Thumbnail Image
                </Text>
                <TouchableOpacity onPress={() => clearForm("thumbnail")}>
                  <Text className="text-white">Clear</Text>
                </TouchableOpacity>
              </View>
              {form.thumbnail ? (
                <Image
                  className="w-full h-64 bg-black-200 rounded-xl mt-3"
                  source={{ uri: form.thumbnail.uri }}
                  resizeMode="cover"
                ></Image>
              ) : (
                <TouchableOpacity onPress={() => openPicker("image")}>
                  <View className="w-full h-16 px-4 space-x-2 bg-black-200 rounded-xl mt-3 flex-row justify-center items-center">
                    <Image
                      resizeMode="contain"
                      className="w-8 h-8"
                      source={icons.upload}
                    />
                    <Text className="text-sm text-gray-100 font-pmedium">
                      Choose a file
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <FormField
              title={`Ai Prompt`}
              value={form.prompt}
              placeholder={`The prompt you used to create this video `}
              handleChange={(e) => setForm({ ...form, prompt: e })}
              otherStyles={`mt-7`}
            />
            <CustomButton
              containerStyles="mt-7"
              handlePress={submit}
              isLoading={uploading}
              title={`Publish video`}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
