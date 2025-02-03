import Image from "next/image";


const AgencyInfoBox = ({agency}) => {
  const { acronym: agencyAcronym, logo: agencyLogo, title: agencyTitle } = agency;

  return(
    <div className="grid-row flex-column">
        <span className="text-bold">{agencyAcronym}</span>
        <span className="font-sans-3xs">{agencyTitle}</span>
      </div>
      <Image
        src={agencyLogo?.mediaImage.url}
        width={24}
        height={24}
        alt={agencyLogo?.mediaImage.alt}
        priority
        className="flex-align-self-center"
      />
    </div>
  )
}