import Link from "next/link";
import { Docs, OpenAPI } from "@ariadocs/components";

export default function ReferenceIndex() {
  return (
    <Docs.Page>
      <Docs.Page.Title>API reference preview</Docs.Page.Title>
      <Docs.Page.Description>
        This is an AriaDocs OpenAPI demonstration only. BSIS has no published HTTP API yet.
      </Docs.Page.Description>
      <p className="mb-6 text-sm">
        The example /health operation below is a placeholder, not a real BSIS endpoint.
        Read the{" "}
        <Link href="/docs/configuration" className="underline underline-offset-4">
          configuration proposals
        </Link>{" "}
        for the current direction of the developer API.
      </p>
      <OpenAPI.Docs />
    </Docs.Page>
  );
}
