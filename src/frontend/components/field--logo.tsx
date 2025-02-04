import Image from "next/image";
import { absoluteUrl } from "lib/utils";

export interface FieldLogoProps {
  field_logo: {
    name: string;
    field_media_image: {
      uri: {
        url: string;
      }
    };
    mediaImage?: {
      url: string;
    }
  };
  height: number;
  width: number;
}

export function FieldLogo({field_logo, height = 150, width = 150} : FieldLogoProps) {
  const { field_media_image, name, mediaImage } = field_logo;
  let url;
  if (mediaImage?.url) {
    url = mediaImage.url
  } else if (field_media_image?.uri.url) {
    url = absoluteUrl(field_media_image?.uri.url)
  }
  return (
    <Image
      src={url}
      width={width}
      height={height}
      alt={name}
      priority
      className=""
    />
  );
}



