import Image from "next/image";
import { absoluteUrl } from "lib/utils";


export function FieldLogo({field_logo}) {
  return (
    <Image
      src={absoluteUrl(field_logo.field_media_image.uri.url)}
      width={150}
      height={150}
      alt={field_logo.name}
      priority
      className="margin-top-3"
    />
  );
}



