import { Snackbar } from "../src/components/snackbar/Snackbar";
import { useTranslation } from "react-i18next";
import {  Text } from "react-native";
import React from "react";

export default {
  title: "Components/Snackbar",
  component: Snackbar,
  argTypes: {
    text: { action: "Text", control: "text" },
    usage: { action: "Usage", control: "radio", options: ["inline", "toast"] },
    type: {
      action: "Type",
      control: "radio",
      options: ["success", "error", "warning", "info"],
    },
    actionAddon: {
      action: "Action Addon",
      control: "radio",
      options: ["close", "chevron", null],
    },
  },
  args: {
    actionAddon: null,
    loading: false,
  },
};

const InteractiveTemplate = (args: any) => {
  const { t } = useTranslation();
  let headLine = "";

  if (args.headline) {
    headLine = t("titleText");
  }

  return (
      <Snackbar {...args} text={t("loremIpsum")} headline={headLine} />
  );
};
// WE WILL KEEP ONLY TOAST VISIBLE IN THE STORYBOOK FOR NOW, BUT LEAVE THEM HERE COMMENTED AND NOT REMOVING ACTUAL COMPONENT IN CASE IT'S STILL USED IN THE APP
// export const InlineNoAction = {
//   render: InteractiveTemplate,
//   args: {
//     type: "success",
//     usage: "inline",
//   },
// };

// export const Inline = {
//   render: InteractiveTemplate,
//   args: {
//     type: "success",
//     actionAddon: "chevron",
//     usage: "inline",
//   },
// };

export const Toast = {
  render: InteractiveTemplate,
  args: {
    usage: "toast",
    type: "success",
   // actionAddon: "close",
    headline: true,
  },
};

// export const InlineWithButtons = {
//   render: InteractiveTemplate,
//   args: {
//     usage: "inline",
//     type: "success",
//     actionAddon: "close",
//     headline: true,
//     linkButton: {
//       buttonText: { children: "Action" },
//       onButtonPress: () => {},
//     },
//     linkButtonSecondary: {
//       buttonText: { children: "Action" },
//       onButtonPress: () => {},
//     },
//   },
// };

// export const ToastImage = {
//   render: InteractiveTemplate,
//   args: {
//     usage: "toast",
//     type: "success",
//     actionAddon: "close",
//     headline: true,
//     imageUrl:
//       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnlGdG6jTyeGrtqL0XPNuQpfLD7L2wZVldypCQja8Gq0vQVNk67LIBVaJF6yJNQy3wtLs&usqp=CAU",
//   },
// };

// const InteractiveTextTemplate = (args: any) => {
//   const { t } = useTranslation();
//   let headLine = "";

//   if (args.headline) {
//     headLine = t("titleText");
//   }

//   return (
//       <Snackbar {...args}  headline={headLine} />
//   );
// };

// export const InlineNoActionWithTextLink = {
//   render: InteractiveTextTemplate,
//   args: {
//     type: "info",
//     usage: "inline",
//     text: (
         
//               <Text>
//                 If you‘re a {" "}

//                 <Text
//                   style={{
//                     color:"#000",
//                     fontWeight:"700"
//                   }}
//                 >
//                  Retail Financing customer, {" "}
//                 </Text>
//                 please register through {" "}
//                 <Text
//                   style={{
//                     color:"#305A85",
//                     textDecorationStyle: "solid",
//                     textDecorationLine: "underline",
//                   }}
//                 >
//                   SAB Online
//                 </Text>
//                 {" "}
//                 Registration is not available on the app.
                  
//               </Text>
           
//         ),
//   },
// };
