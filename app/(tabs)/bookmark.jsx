import { useLocalSearchParams } from "expo-router";
import VideoCard from "../../components/VideoCard";
import useAppwrite from "../../lib/useAppwrite";
import { getAllPosts, searchPosts } from "../../lib/appwrite";
import { View, Image, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";

const Bookmark = () => {
  const { query } = useLocalSearchParams();

  const { data: posts } = {data : ''}


  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 ">
            <View className="justify-between items-center flex-row">
              <View>
                
                <Text className="text-2xl font-psemibold text-white">
                  Saved Videos
                </Text>
              </View>
              
            </View>
            <SearchInput
              placeholder={`search for saved video ...`}
              initialQuery =  { query}
           />
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Saved Videos`}
            subtitle={`Get Started by creating or bookmarking videos`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Bookmark;
