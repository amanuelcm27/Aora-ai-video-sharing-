import VideoCard from "../../components/VideoCard";
import {  getSavedVideos, saveVideo,  } from "../../lib/appwrite";
import { View, Text, FlatList, Alert, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";

const Bookmark = () => {

  const [savedVideos , setSavedVideos] = useState(null)
  const [refreshing ,setRefreshing ]= useState(false)
  const { user } = useGlobalContext();
  const fetchSavedVideos = async () => {
    try {
      setRefreshing(true)
      const response = await getSavedVideos(user.$id);
      setSavedVideos(response)
      setRefreshing(false)
    }
    catch (e) {
      Alert.alert("Couldn't get saved videos right now")
    }
  }

  useEffect(() => {
    fetchSavedVideos()
  },[])
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={savedVideos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard refetch={fetchSavedVideos}  video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-center flex-row">
              <View>
                
                <Text className="text-2xl font-psemibold text-white">
                  Saved Videos
                </Text>
              </View>
              
            </View>
           
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Saved Videos`}
            subtitle={`Get Started by creating or bookmarking videos`}
          />
        )}
        refreshControl={
          <RefreshControl onRefresh={fetchSavedVideos} refreshing={refreshing}>

          </RefreshControl>
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
