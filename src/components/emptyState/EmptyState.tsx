import React, { FC, ReactElement } from "react";
import { StyleSheet, View } from "react-native";
import { Title, TitleProps } from "../text/Title";
import { Rag, RagProps } from "../rag/Rag";
import { Button, ButtonProps } from "../button/Button";
import { fontLarge, fontMediumLarge, spacingM, spacingS, spacingXS } from "../../assets/styles/constants/size";
import fonts from "../../assets/styles/constants/fonts";
import { EmptyStateSkeleton } from "./EmptyStateSkeleton";

interface EmptyStateProps {
  textProps: TitleProps;
  iconProps: RagProps;
  /** Optional custom image/icon to show instead of the RAG icon (e.g. logo, illustration, SAB360 icon) */
  image?: React.ReactNode;
  showButton?: boolean;
  buttonProps?: ButtonProps;
  loading?: boolean;
}

/**
 * @property textProps: Text props for text content (title and subtitle)
 * @property iconProps: RagProps for adjusting the icon type and size
 * @property showButton: Boolean to show/hide button
 * @property buttonProps: Accepts all props for Button component (buttonText, disabled, variant, color,...)
 */

export const EmptyState: FC<EmptyStateProps> = ({
  textProps,
  iconProps,
  image,
  showButton = false,
  buttonProps,
  loading = false,
}) => {
  return loading ? (
    <EmptyStateSkeleton showButton={showButton} />
  ) : (
    <View style={styles.container}>
      {image != null ? (
        <View style={styles.imageContainer}>{image}</View>
      ) : (
        <Rag
          {...iconProps}
          size={iconProps.size || "extralarge"}
          type={iconProps.type || "warning"}
        />
      )}
      <Title
        size={fontLarge}
        subtitleSize={fontMediumLarge}
        subtitleVariant="primarytextcolor2"
        mediumFont={true}
        centered
        overrideStyles={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          textAlign: "center",
          alignItems: "center",
          alignSelf: "center",
          gap: spacingXS,
        }}
        {...textProps}
      />
      {showButton && (
        <Button
          buttonText={buttonProps?.buttonText || { children: "OK" }}
          onButtonPress={() => buttonProps && buttonProps.onButtonPress()}
          color={buttonProps?.color ?? "blueAccent"}
          variant={buttonProps?.variant}
          size={buttonProps?.size}
          disabled={buttonProps?.disabled || false}
        />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingHorizontal: spacingS,
    paddingVertical: spacingM,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingS,
    alignSelf: "stretch",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});
