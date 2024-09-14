import VideoCard from "../../components/VideoCard";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { View, Image, FlatList, TouchableOpacity, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "../../constants";
import EmptyState from "../../components/EmptyState";
import { useGlobalContext } from "../../context/GlobalProvider";
import InfoBox from "../../components/InfoBox";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user.$id));
  const [refreshing , setRefreshing  ] = useState()
  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };  
  const logout = async () => {
    await signOut();
    setIsLoggedIn(false);
    setUser(null);
    router.replace('/sign-in')
  };
  useEffect(() => {
    refetch();
  }, []);
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item}></VideoCard>}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4 ">
            <TouchableOpacity
              className=" w-full mb-10 items-end"
              onPress={logout}
            >
              <Image source={icons.logout} className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-20 h-20 rounded-lg ">
              <Image
                source={{ uri: user?.avatar }}
                className="w-full h-full rounded-full "
                resizeMode="cover"
              />
            </View>
            <InfoBox
              title={user?.username}
              containerStyles=" mt-5 "
              titleStyles="text-lg"
            />
            <View className=" flex-row">
              <InfoBox
                title={posts.length || 0}
                containerStyles=" mr-10 "
                titleStyles="text-xl"
                subtitle =  'Posts'

              />
              <InfoBox
                title="1.2k"
                titleStyles="text-xl"
                subtitle =  'Followers'
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title={`No Videos Found`}
            subtitle={`Modify your search to specific keywords`}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Profile;
