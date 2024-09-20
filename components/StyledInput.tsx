import { Input, styled } from "tamagui";

const StyledInput = styled(Input, {
  focusStyle: {
    borderColor: "$accentColor",
  },
  size: "$5",
  borderWidth: 2,
});

export default StyledInput;
