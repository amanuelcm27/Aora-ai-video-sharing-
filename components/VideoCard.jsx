import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { icons } from "../constants";
import { useState } from "react";
import { Video, ResizeMode } from "expo-av";
import { useGlobalContext } from "../context/GlobalProvider";
import { saveVideo } from "../lib/appwrite";

const VideoCard = ({
  video: {
    $id,
    title,
    thumbnail,
    video,
    saver,
    creator: { username, avatar },
  },
  refetch,
}) => {
  const [play, setPlay] = useState(false);
  const { user } = useGlobalContext();
  const handleSave = async (videoId) => {
    try {
      await saveVideo(videoId,user.$id);
    }
    catch (e) {
      Alert.alert("Problem saving video")
    }
}
  const handleBookmarking = async () => {
    await handleSave($id);
    await refetch();
  };
  const saved = saver.some(saver => saver.$id === user.$id)
  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center items-center flex-row flex-1">
          <View className="w-[46px] h-[46px] rounded-full overflow-hidden  ">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>
          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="text-sm text-white font-psemibold"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {username}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleBookmarking} className="pt-2">
          <Image
            source={icons.bookmark}
            resizeMode="contain"
            tintColor={ saved ? "#FFA001" : "#CDCDE0" }
            className=" w-6 h-6 "
          />
        </TouchableOpacity>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-60 rounded-xl mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          className="w-full h-60 relative justify-center items-center mt-3 "
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-5"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            className="w-12 h-12 absolute"
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
