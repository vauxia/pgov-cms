import Link from "next/link";
import { GovBanner } from "@trussworks/react-uswds";
import { Alert } from '@trussworks/react-uswds';
import { PreviewAlert } from "components/preview-alert";
import { USAHeader } from "./usa--header";

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <GovBanner />
      <Alert className="margin-top-0" type="info" headingLevel="h4">
        This is a minimum viable product (MVP) build of the next iteration of performance.gov.
      </Alert>
      <div className="max-w-screen-md px-6 mx-auto">
        <USAHeader />
        <main className="grid-container margin-bottom-4">{children}</main>
      </div>
      <footer className="width-full display-block height-8 bg-black"></footer>
    </>
  );
}
