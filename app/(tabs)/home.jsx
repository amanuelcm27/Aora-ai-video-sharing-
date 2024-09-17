import {
  View,
  Image,
  Text,
  FlatList,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts, getLatestPosts, saveVideo } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";

const Home = () => {
  const { data :posts , refetch : refetch } = useAppwrite(getAllPosts)
  const { data :latestPosts, refetch:refetchLatest } = useAppwrite(getLatestPosts)
  const { user } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await refetchLatest();
    setRefreshing(false);
  };  

  return (
    <SafeAreaView className="bg-primary h-full"> 
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard refetch={refetch} video={item}></VideoCard>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-center flex-row">
              <View>
                <Text className="font-pmedium text-gray-100 text-sm">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>
              <View className="">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                ></Image>
              </View>
            </View>
            <SearchInput
              placeholder={`search for video topic ...`}
              otherStyles={`mt-5`}
            ></SearchInput>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3">
                Latest videos
              </Text>
              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Videos Found`}
            subtitle={`Be the first to upload a video`}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
