import Image from "next/image";
import { FieldLogo } from "./field--logo";

const AgencyInfoBox = ({acronym, logo, title}) => {
  return(
    <div className="grid-row flex-justify flex-no-wrap">
      <div className="grid-row flex-column">
        <span className="text-bold">{acronym}</span>
        <span className="font-sans-3xs">{title}</span>
      </div>
      <div className="flex-align-self-center">
        <FieldLogo
          field_logo={logo}
          height={24}
          width={24}
        />
      </div>
    </div>
  )
}

export default AgencyInfoBox;
