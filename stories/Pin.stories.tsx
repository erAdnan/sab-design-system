import {Pin} from "../src/components/pinDialPad/Pin";

export default {
  title: "Components/PIN",
  component: Pin,
  argTypes: {
    info: {
      action: "Info",
      control: "text"
    },
    pinLength: {
      action: "Pin Length",
      control: "number"
    }
  },
  args: {
    info: "Please enter your passcode",
    pinLength: 6,
    onPinCompleted: (code : string) => {
      console.log(`Pin compleated: ${code}`);
    }
  }
};

export const WithFaceId = {
  args: {
    onFaceIdPress: () => {
      console.log("FaceId pressed!");
    }
  }
};

export const NoFaceId = {
  args: {}
};