import { Button, GetProps, styled } from "tamagui";

const StyledButton = styled(Button, {
  name: "StyledButton",
  backgroundColor: "$blue10",
  color: "$white1",
  borderRadius: "$10",
  fontWeight: "bold",
});

export type StyledButtonProps = GetProps<typeof StyledButton>;

export default StyledButton;
