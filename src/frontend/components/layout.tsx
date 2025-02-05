import { GovBanner } from "@trussworks/react-uswds";
import { Alert } from '@trussworks/react-uswds';
import { PreviewAlert } from "components/preview-alert";
import { USAHeader } from "./usa--header";

export function Layout({ children }) {
  return (
    <>
      <PreviewAlert />
      <GovBanner />
      <div className="px-6 mx-auto">
        <USAHeader />
        <main className="">{children}</main>
      </div>
      <footer className="width-full display-block height-8 bg-black"></footer>
    </>
  );
}
