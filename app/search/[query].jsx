import { useLocalSearchParams } from "expo-router";
import VideoCard from "../../components/VideoCard";
import useAppwrite from "../../lib/useAppwrite";
import {  searchPosts } from "../../lib/appwrite";
import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "../../components/SearchInput";
import EmptyState from "../../components/EmptyState";

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data: posts,  refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch()
  },[query])
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
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {query}
                </Text>
              </View>
              
            </View>
            <SearchInput
              placeholder={`search for video topic ...`}
              initialQuery =  { query}
           />
            
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Videos Found`}
            subtitle={`Modify your search to specific keywords`}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
