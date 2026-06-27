import logoUrl from "@/assets/logo.svg";
import { Image, type ImageProps } from "@chakra-ui/react";

const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Descubra RN";

type AppLogoProps = Omit<ImageProps, "src" | "alt"> & {
  alt?: string;
};

export const AppLogo = ({ alt = APP_NAME, ...props }: AppLogoProps) => (
  <Image
    src={logoUrl}
    alt={alt}
    objectFit="contain"
    flexShrink={0}
    {...props}
  />
);
