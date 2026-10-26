import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "../../context/theme/themeContext";
import { Divider } from "../divider/Divider";
import {
  fontSmall,
  lineHeightSmall,
  spacingS,
  spacingXS,
  spacingXXS,
} from "../../assets/styles/constants/size";
import { Text } from "../text/Text";
import Attach from "../icons/functionals/Attach";
import { Spinner } from "../spinner/Spinner";
import { ChipsFilter } from "../chips/ChipsFilter";
import { SkeletonBox } from "../skeleton/SkeletonBox";
import { actuatedNormalize } from "../../assets/styles/utils/pixelScaling";
import { AutomationProps, getAutomationProps } from "../automationProps";

export type UploaderFileItem = {
  id: string | number;
  label: string;
  error?: boolean;
};

export interface UploaderProps extends AutomationProps {
  title: string;
  subTitle?: string;
  variant?: string;
  onIconPress?: () => void;
  handleRemoveFile?: (id: string | number) => void;
  files?: UploaderFileItem[];
  errorMessage?: string;
  loading?: boolean;
  disabled?: boolean;
  mandatory?: boolean;
  overrideStyles?: any;
  showSkeleton?: boolean;
  showDivider?: boolean;
}

/**
 * @property title - Title of the uploader
 * @property subTitle - Subtitle of the uploader
 * @property variant - add font color props as varaint to  handle error case text color
 * @property onIconPress - Function to be called when the icon is pressed
 * @property handleRemoveFile - Function to be called when the file is removed
 * @property files - Array of files; optional `error` per row for invalid chip styling
 * @property errorMessage - Footnote error under the line (e.g. "Invalid format"); line uses RAG red
 * @property loading - Loading state of the uploader
 * @property disabled - Disabled state of the uploader
 * @property mandatory - show mandatory field use this props
 * @property overrideStyles - Override styles for the uploader
 */
export const Uploader: FC<UploaderProps> = ({
  title,
  subTitle,
  variant = "primarycolor2_100",
  onIconPress = () => {},
  handleRemoveFile = (id: string | number) => {},
  files,
  loading = false,
  disabled = false,
  mandatory = false,
  overrideStyles,
  showSkeleton = false,
  showDivider=true,
  errorMessage,
  testID,
  accessibilityLabel,
}) => {
  const { theme, isDarkTheme } = useTheme();

  const attachFill =
    errorMessage && !disabled
      ? isDarkTheme
        ? theme.primarycolor3
        : theme.ragcolor3
      : disabled
        ? theme.primarycolor2_20
        : theme.primarycolor3;

  const styles = StyleSheet.create({
    container: {
      paddingTop: spacingS,
      width: "100%",
    },
    uploaderWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    files: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: spacingXS,
      paddingTop: spacingS,
    },
    divider: {
      paddingTop: spacingS,
    },
  });

  return (
    <View
      style={{ ...styles.container, ...overrideStyles }}
      {...getAutomationProps(testID, accessibilityLabel, title)}
    >
      <View style={styles.uploaderWrapper}>
        <View
          style={{
            display: "flex",
            flexDirection: "column",
            gap: spacingXXS,
          }}
        >
          <Text loading={showSkeleton} textWidth={80} mandatory={mandatory}>
            {title}
          </Text>
          {subTitle && (
            <Text
              size={fontSmall}
              variant={variant}
              loading={showSkeleton}
              textWidth={120}
            >
              {subTitle}
            </Text>
          )}
        </View>
        <View>
          {loading ? (
            <Spinner color={theme.primarycolor3} transparent />
          ) : showSkeleton ? (
            <SkeletonBox shape="circle" size="small" />
          ) : (
            <TouchableOpacity
              disabled={disabled}
              onPress={onIconPress}
              {...getAutomationProps(
                testID ? `${testID}-attach` : undefined,
                accessibilityLabel ? `${accessibilityLabel}-attach` : undefined,
                "attach"
              )}
            >
              <Attach fill={attachFill} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {files && (
        <View style={styles.files}>
          {files.map((file, index) =>
            showSkeleton ? (
              <SkeletonBox
                shape="line"
                size="small"
                overrideStyles={{ width: actuatedNormalize(64) }}
              />
            ) : (
              <ChipsFilter
                label={file.label}
                error={file.error}
                onClosePress={() => handleRemoveFile(file.id)}
                key={index}
                testID={testID ? `${testID}-file-${file.id}` : undefined}
                accessibilityLabel={
                  accessibilityLabel ? `${accessibilityLabel}-file-${file.id}` : file.label
                }
              />
            )
          )}
        </View>
      )}
      {errorMessage ? (
        <>
          <View style={styles.divider}>
            <Divider
              overrideStyles={{ backgroundColor: theme.ragcolor3, height: 1 }}
            />
          </View>
          <Text
            size={fontSmall}
            variant="primarytextcolor"
            overrideStyles={{
              color: theme.ragcolor3,
              lineHeight: lineHeightSmall,
              marginTop: spacingXS,
              width: "100%",
              textAlign: "left",
            }}
          >
            {errorMessage}
          </Text>
        </>
      ) : (
        showDivider && (
          <View style={styles.divider}>
            <Divider />
          </View>
        )
      )}
    </View>
  );
};
