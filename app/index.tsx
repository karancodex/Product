import StyledButton from "@/components/StyledButton";
import { useAuth } from "@/hooks/useAuth";
import { useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";

type Props = {};

const IndexScreen = (props: Props) => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleSignin = () => {
    navigation.navigate("auth/signin");
  };

  const handleSignup = () => {
    navigation.navigate("auth/signup");
  };

  useEffect(() => {
    if (user) {
      navigation.navigate("dashboard/index");
    }
  }, [user, navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        flex={1}
        gap={"$2"}
        justifyContent="center"
        alignItems="center"
        padding={"$4"}
      >
        <Text fontWeight={"bold"} fontSize={"$8"}>
          Welcome To
        </Text>
        <Text fontWeight={"bold"} fontSize={"$10"}>
          Product
        </Text>
        <View gap={"$2"} width={"100%"} marginTop={"$4"}>
          <StyledButton onPress={handleSignin}>Sign In</StyledButton>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IndexScreen;
