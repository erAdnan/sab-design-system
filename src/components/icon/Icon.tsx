import { FC, useMemo } from "react";
import {
  ArrowSvgsDark,
  ArrowSvgsLight,
  BankingSvgsLight,
  BankingSvgsDark,
  FunctionalsSvgsDark,
  FunctionalsSvgsLight,
  NotificationsSvgsDark,
  NotificationsSvgsLight,
  OthersSvgsDark,
  OthersSvgsLight,
  Sab360SvgsLight,
  Sab360SvgsDark,
  SocialSvgsDark,
  SocialSvgsLight,
  FilledSvgsLight,
  FilledSvgsDark,
  UsersSvgsLight,
  UsersSvgsDark,
} from "./IconList";
import { SvgProps } from "react-native-svg";
import { useTheme } from "../../context/theme/themeContext";

export interface LocalIconProps extends SvgProps {
  type:
    | "banking"
    | "functionals"
    | "users"
    | "notifications"
    | "arrows"
    | "other"
    | "social"
    | "filled"
    | "sab360";
  name: string;
  isWhite?: boolean;
}

/**
 * 
 * @property type - Selects the group (folder) where the icon is located
 * @property name - name of the icon
 * @property isWhite - use when you need white icon in both light/dark mode 
 */

const Icon: FC<LocalIconProps> = ({
  type = "arrows",
  name = "arrow_down",
  isWhite = false,
  ...props
}) => {
  const { isDarkTheme } = useTheme();

  const svgs = useMemo(() => {
    switch (type) {
      case "arrows":
        return isDarkTheme || isWhite ? ArrowSvgsDark : ArrowSvgsLight;
      case "banking":
        return isDarkTheme || isWhite ? BankingSvgsDark : BankingSvgsLight;
      case "functionals":
        return isDarkTheme || isWhite
          ? FunctionalsSvgsDark
          : FunctionalsSvgsLight;
      case "users":
        return isDarkTheme || isWhite ? UsersSvgsDark : UsersSvgsLight;
      case "notifications":
        return isDarkTheme || isWhite
          ? NotificationsSvgsDark
          : NotificationsSvgsLight;
      case "other":
        return isDarkTheme || isWhite ? OthersSvgsDark : OthersSvgsLight;
      case "social":
        return isDarkTheme || isWhite ? SocialSvgsDark : SocialSvgsLight;
      case "sab360":
        return isDarkTheme || isWhite ? Sab360SvgsDark : Sab360SvgsLight;
      case "filled":
        return isDarkTheme || isWhite ? FilledSvgsDark : FilledSvgsLight;
      default:
        return ArrowSvgsLight;
    }
  }, [type, isDarkTheme, isWhite]);

  const SvgIcon = svgs[name];

  if (!SvgIcon) {
    return null; // fallback if icon not found
  }

  return <SvgIcon width={props.width || 24} height={props.height || 24} {...props} />;
};
export default Icon;
