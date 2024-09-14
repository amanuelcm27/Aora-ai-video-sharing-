import { View, Image, Text, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setisSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();


  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "please fill all the fields");
      return;
    }
    setisSubmitting(true);

    try {
      const result = await createUser(form.username, form.email, form.password);
      setUser(result)
      setIsLoggedIn(true)
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    }  finally {
      setisSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center h-[75vh] px-4 my-6 ">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[130px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Join Aora
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChange={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-7"
            placeholder={`your username ...`}
          ></FormField>
          <FormField
            title="Email"
            value={form.email}
            handleChange={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            placeholder={`your email ...`}
          ></FormField>
          <FormField
            title="password"
            value={form.password}
            handleChange={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
            placeholder={`your password ...`}
          ></FormField>
          <CustomButton
            isLoading={isSubmitting}
            handlePress={submit}
            title={`Sign Up`}
            containerStyles={`mt-7`}
          ></CustomButton>
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-secondary-200">
                Sign In
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
