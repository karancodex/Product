import { FormProps } from "@/@types/form";
import { LoginFormDto } from "@/@types/user";
import StyledButton from "@/components/StyledButton";
import StyledInput from "@/components/StyledInput";
import { AntDesign } from "@expo/vector-icons";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { Link, useNavigation } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Card, H2, H3, Paragraph, View } from "tamagui";
import zod from "zod";

type Props = {};

const SigninScreen = (props: Props) => {
  const navigation = useNavigation();
  const loginForm = useForm<LoginFormDto>({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: handleSubmit,
  });

  function handleSubmit(props: FormProps<LoginFormDto>) {
    console.log(props.value);
    navigation.navigate("dashboard/index");
  }

  return (
    <SafeAreaView>
      <View padding={"$4"}>
        <H2 textAlign="center" mb={"$4"}>
          Product
        </H2>
        <Card>
          <Card.Header>
            <H3>Sign In</H3>
          </Card.Header>
          <View paddingHorizontal={"$4"} gap={"$2"}>
            <View gap={"$2"}>
              <loginForm.Field
                name="email"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: zod.string().email({
                    message: "Please enter a valid email address.",
                  }),
                }}
              >
                {(field) => (
                  <>
                    <Paragraph theme={"alt2"}>Email</Paragraph>
                    <StyledInput
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      inputMode="email"
                      placeholder="Ex: john.doe@gmail.com"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <Paragraph color={"$red10"}>
                        {field.state.meta.errors.join(", ")}
                      </Paragraph>
                    )}
                  </>
                )}
              </loginForm.Field>
            </View>
            <View gap={"$2"}>
              <loginForm.Field
                name="password"
                validatorAdapter={zodValidator()}
                validators={{
                  onChange: zod.string().min(1, {
                    message: "Password is required.",
                  }),
                }}
              >
                {(field) => (
                  <>
                    <Paragraph theme={"alt2"}>Password</Paragraph>
                    <StyledInput
                      value={field.state.value}
                      onChangeText={field.handleChange}
                      onBlur={field.handleBlur}
                      inputMode="text"
                      secureTextEntry
                      placeholder="Your password"
                    />
                    {field.state.meta.errors.length > 0 && (
                      <Paragraph color={"$red10"}>
                        {field.state.meta.errors.join(", ")}
                      </Paragraph>
                    )}
                  </>
                )}
              </loginForm.Field>
            </View>
          </View>
          <Card.Footer
            padding={"$4"}
            flexDirection="column"
            gap={"$2"}
            marginTop={"$2"}
          >
            <StyledButton onPress={loginForm.handleSubmit}>
              Sign In
            </StyledButton>
            <Paragraph textAlign="center" paddingTop={"$2"}>
              Don't have an account?{" "}
              <Link style={{ color: "skyblue" }} href={"/auth/signup"}>
                Create one.
              </Link>
            </Paragraph>
            <View flexDirection="row" alignItems="center" gap={"$2"}>
              <View borderTopWidth={0.5} flex={1} borderColor={"$color"} />
              <Paragraph fontWeight={"bold"}>OR</Paragraph>
              <View borderTopWidth={0.5} flex={1} borderColor={"$color"} />
            </View>
            <StyledButton
              backgroundColor={"$red10"}
              icon={<AntDesign name="google" size={24} color={"white"} />}
            >
              Sign in with Google
            </StyledButton>
          </Card.Footer>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default SigninScreen;
