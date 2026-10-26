import { FC } from "react";
import Success from "../icons/pictogram/Success";
import Error from "../icons/pictogram/Error";
import Warning from "../icons/pictogram/Warning";
import {
    fontXXLG,
    pictogramSizeMapping,
} from "../../assets/styles/constants/size";
import Info from "../icons/pictogram/Info";
import { StyleSheet, View } from "react-native";
import Fingerprint from "../icons/pictogram/Fingerprint";
import FaceId from "../icons/pictogram/FaceId";
import Lock from "../icons/pictogram/Lock";
import Thumb from "../icons/pictogram/Thumb";
import Mailbox from "../icons/pictogram/Mailbox";
import Nfc from "../icons/pictogram/Nfc";
import Link from "../icons/pictogram/Link";
import LoginLocked from "../icons/pictogram/LoginLocked";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { useTheme } from "../../context/theme/themeContext";
import { Text } from "../text/Text";
import { Spinner } from "../spinner/Spinner";
import Achievement from "../icons/pictogram/Achievement";
import Footprint from "../icons/other/Footprint";

export interface PictogramProps {
    type: "success" | "error" | "warning" | "info" | "number" | "fingerprint" | "faceId" | "lock" | "thumb" | "mailbox" | "nfc" | "loader" | "link" | "loginLocked" | "achievement" | "carbon-footprint";
    number?: number;
    loading?: boolean;
    overrideStyles?: any;
}

/**
 * Pictogram component
 * @property type - Type of the pictogram. Can be one of the following: success, error, warning, info, number, fingerprint, faceId, lock, thumb, mailbox, nfc, loader, link, loginLocked
 * @property number - Number to be displayed in the number pictogram
 * @property loading - Boolean to show the loading spinner
 * @property overrideStyles - Optional styles to override the default styles of the component.
 */
export const Pictogram: FC<PictogramProps> = ({ type, number, loading = false,overrideStyles }) => {
    const { theme } = useTheme();

    const iconProps = {
        width: pictogramSizeMapping.large,
        height: pictogramSizeMapping.large,
    };

    const getIcon = () => {
        switch (type) {
            case "success":
                return <Success {...iconProps} />;
            case "error":
                return <Error {...iconProps} />;
            case "warning":
                return <Warning {...iconProps} />;
            case "info":
                return <Info {...iconProps} />;
            case "number":
                return (
                    <View
                        style={{
                            ...styles.iconWrapper,
                            backgroundColor: theme.secondarycolor10,
                        }}
                    >
                        <Text variant="primarycolor4static" size={fontXXLG}>
                            {number ? number.toString() : ""}
                        </Text>
                    </View>
                );
            case "fingerprint":
                return <Fingerprint {...iconProps} />;
            case "faceId":
                return <FaceId {...iconProps} />;
            case "lock":
                return <Lock {...iconProps} />;
            case "thumb":
                return <Thumb {...iconProps} />;
            case "mailbox":
                return <Mailbox {...iconProps} />;
            case "nfc":
                return <Nfc {...iconProps} />;
            case "loader":
                return (
                    <View
                        style={{
                            ...styles.iconWrapper,
                            backgroundColor: theme.primarycolor3static,
                        }}
                    >
                        {loading && <Spinner color={theme.primarycolor4static} />}
                    </View>
                );
            case "link":
                return <Link {...iconProps} />;
            case "loginLocked":
                return <LoginLocked {...iconProps} />;
            case "achievement":
                return <Achievement {...iconProps} />;
            case "carbon-footprint":
                return (
                    <View style={{...styles.iconWrapper, backgroundColor: "rgba(0, 132, 127, 0.10)"}}>
                        <Footprint width={actuatedNormalize(32)} height={actuatedNormalize(32)} fill={theme.secondarycolor10} />
                    </View>
                )
            default:
                return <Info {...iconProps} />;
        }
    };

    return <View style={overrideStyles}>{getIcon()}</View>;
};

const styles = StyleSheet.create({
    iconWrapper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: pictogramSizeMapping.large - actuatedNormalize(4),
        width: pictogramSizeMapping.large - actuatedNormalize(4),
        borderRadius: actuatedNormalize(pictogramSizeMapping.large / 2),
    }
});
