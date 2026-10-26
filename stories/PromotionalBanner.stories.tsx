import { PromotionalBanner } from "../src/components/banner/PromotionalBanner";
import CreditCards from "../src/assets/svgs/illustration/CreditCards.svg"
import OpenAnAccount from "../src/assets/svgs/illustration/opennewaccount.svg"
import { actuatedNormalize } from "../src/assets/styles/utils/pixelScaling";

export default {
  title: "Components/PromotionalBanner",
  component: PromotionalBanner,
  argTypes: {
    title: { action: "Title", control: "text" },
    body: { action: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ", control: "text" },
  },
  args: {
    title: "Text", 
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
    loading: false,
  },
};


export const Default = {
   args: {
        title: "Text", 
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ",
        imgProps: {
            localSvg: CreditCards,
            width:actuatedNormalize(101),
            height:actuatedNormalize(55),
           
        },
        linkButtonText: "Link Text"
    },
};

export const OpenAccount = {
    args: {
         title: "Open New Account", 
         body: "Open a new account with us in just a few easy steps. ",
         imgProps: {
             localSvg: OpenAnAccount,
             width:actuatedNormalize(84),
             height:actuatedNormalize(75),
            
         },
         linkButtonText: "Apply Now"
     },
 };