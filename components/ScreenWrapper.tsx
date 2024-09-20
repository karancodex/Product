import React from "react";
import {
  SafeAreaInsetsContext,
  SafeAreaProvider,
} from "react-native-safe-area-context";
import { ScrollView, View, XStack } from "tamagui";
import StyledFooter from "./StyledFooter";
import StyledHeader from "./StyledHeader";

type Props = {
  header?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
};

const ScreenWrapper = ({ header, children, footer }: Props) => {
  return (
    <SafeAreaProvider>
      <SafeAreaInsetsContext.Consumer>
        {(inset) => (
          <View flex={1} pt={header ? "" : inset?.top}>
            {header && (
              <StyledHeader pt={inset?.top}>
                <XStack gap={"$2"}>{header}</XStack>
              </StyledHeader>
            )}
            <ScrollView nestedScrollEnabled>{children}</ScrollView>
            {footer && <StyledFooter>{footer}</StyledFooter>}
          </View>
        )}
      </SafeAreaInsetsContext.Consumer>
    </SafeAreaProvider>
  );
};

export default ScreenWrapper;
