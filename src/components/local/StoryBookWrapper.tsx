import { FC, useState } from "react";
import { View } from "react-native";
import { useTheme } from "../../context/theme/themeContext";
import { LanguageWrapper } from "./LanguageWrapper";

export const StoryBookWrapper: FC<any> = ({ children }) => {
    const { theme } = useTheme();
    const [arabic, setArabic] = useState(false);

    return (
        <View
            style={{
                backgroundColor: theme.stylesbackground2,
                padding: 16,
                flex: 1,
                width: "100%",
                maxWidth: "100%",
                minWidth: 0,
                overflow: "hidden",
            }}
        >
            <LanguageWrapper setArabic={() => setArabic(!arabic)}>
                {children}
            </LanguageWrapper>
        </View>
    );
};