/**
 * Asset modules resolved by Metro (react-native-svg-transformer) and
 * Storybook web (@svgr/webpack). Without these, TypeScript reports TS2307
 * on `.svg` / image imports in `src/` and `stories/`.
 */
declare module "*.svg" {
  import type { FC } from "react";
  import type { SvgProps } from "react-native-svg";
  const content: FC<SvgProps>;
  export default content;
}

declare module "*.png" {
  const content: number;
  export default content;
}

declare module "*.jpg" {
  const content: number;
  export default content;
}

declare module "*.jpeg" {
  const content: number;
  export default content;
}

declare module "*.gif" {
  const content: number;
  export default content;
}

declare module "*.webp" {
  const content: number;
  export default content;
}
