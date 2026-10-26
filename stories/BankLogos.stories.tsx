import { View } from "react-native";
import { LogoWrapper } from "../src/components/logos/LogoWrapper";
import Alinma from "../src/components/logos/banks/Alinma";
import Alrajhi from "../src/components/logos/banks/Alrajhi";
import Anb from "../src/components/logos/banks/Anb";
import RiyadBank from "../src/components/logos/banks/RiyadBank";
import BSF from "../src/components/logos/banks/BSF";
import Aljazira from "../src/components/logos/banks/Aljazira";
import SAB from "../src/components/logos/banks/SAB";
import Deutsche from "../src/components/logos/banks/Deutsche";
import IndustrialAndCommercial from "../src/components/logos/banks/IndustrialAndCommercial";
import Chase from "../src/components/logos/banks/Chase";
import MUFG from "../src/components/logos/banks/MUFG";
import BankOfChina from "../src/components/logos/banks/BankOfChina";
import UBS from "../src/components/logos/banks/UBS";
import STC from "../src/components/logos/banks/STC";
import SAIB from "../src/components/logos/banks/SAIB";
import AlBilad from "../src/components/logos/banks/AlBilad";
import GIB from "../src/components/logos/banks/GIB";
import D360 from "../src/components/logos/banks/D360";
import SNB from "../src/components/logos/banks/SNB";
import Muscat from "../src/components/logos/banks/Muscat";
import FAB from "../src/components/logos/banks/FAB";
import QNB from "../src/components/logos/banks/QNB";
import SaudiCentral from "../src/components/logos/banks/SaudiCentral";
import StandardChartered from "../src/components/logos/banks/StandardChartered";
import Ziraat from "../src/components/logos/banks/Ziraat";
import NBK from "../src/components/logos/banks/NBK";
import NationalBankOfBahrain from "../src/components/logos/banks/NationalBankOfBahrain";
import BNPParibas from "../src/components/logos/banks/BNPParibas";
import BankOfJordan from "../src/components/logos/banks/BankOfJordan";
import Sohar from "../src/components/logos/banks/Sohar";
import Meem from "../src/components/logos/banks/Meem";
import Mizuho from "../src/components/logos/banks/Mizuho";
import Urpay from "../src/components/logos/banks/Urpay";
import Neo from "../src/components/logos/banks/Neo";

export default {
  title: 'Components/Bank Logos',
  component: LogoWrapper,
  argTypes: {
    size: {action: 'Size', control: 'radio', options: ['extra-small', 'small', 'medium', 'large']}
  },
  args: {
    size: 'extra-small'
  }
}

const Template = (args: any) => {
  return (
    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 16}}>
      <LogoWrapper size={args.size} logo={<Alinma />} />
      <LogoWrapper size={args.size} logo={<Alrajhi />} />
      <LogoWrapper size={args.size} logo={<Anb />} />
      <LogoWrapper size={args.size} logo={<RiyadBank />} />
      <LogoWrapper size={args.size} logo={<BSF />} />
      <LogoWrapper size={args.size} logo={<Aljazira />} />
      <LogoWrapper size={args.size} logo={<SAB />} />
      <LogoWrapper size={args.size} logo={<Deutsche />} />
      <LogoWrapper size={args.size} logo={<IndustrialAndCommercial />} />
      <LogoWrapper size={args.size} logo={<Chase />} />
      <LogoWrapper size={args.size} logo={<MUFG />} />
      <LogoWrapper size={args.size} logo={<BankOfChina />} />
      <LogoWrapper size={args.size} logo={<UBS />} />
      <LogoWrapper size={args.size} logo={<STC />} />
      <LogoWrapper size={args.size} logo={<SAIB />} />
      <LogoWrapper size={args.size} logo={<AlBilad />} />
      <LogoWrapper size={args.size} logo={<GIB />} />
      <LogoWrapper size={args.size} logo={<D360 />} />
      <LogoWrapper size={args.size} logo={<SNB />} />
      <LogoWrapper size={args.size} logo={<Muscat />} />
      <LogoWrapper size={args.size} logo={<FAB />} />
      <LogoWrapper size={args.size} logo={<QNB />} />
      <LogoWrapper size={args.size} logo={<SaudiCentral />} />
      <LogoWrapper size={args.size} logo={<StandardChartered />} />
      <LogoWrapper size={args.size} logo={<Ziraat />} />
      <LogoWrapper size={args.size} logo={<NBK />} />
      <LogoWrapper size={args.size} logo={<NationalBankOfBahrain />} />
      <LogoWrapper size={args.size} logo={<BNPParibas />} />
      <LogoWrapper size={args.size} logo={<BankOfJordan />} />
      <LogoWrapper size={args.size} logo={<Sohar />} />
      <LogoWrapper size={args.size} logo={<Meem />} />
      <LogoWrapper size={args.size} logo={<Mizuho />} />
      <LogoWrapper size={args.size} logo={<Urpay />} />
      <LogoWrapper size={args.size} logo={<Neo />} />
      <LogoWrapper size={args.size} logo={require('../src/assets/images/EmiratesNDBLogo.png')} isSvg={false} />
      <LogoWrapper size={args.size} logo={require('../src/assets/images/VisionBankLogo.png')} isSvg={false} />
    </View>
  )
}

export const Logos = {
  render: Template
}