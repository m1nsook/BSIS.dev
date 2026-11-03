import Link from "next/link";
import { Docs, OpenAPI } from "@ariadocs/components";

export default function ReferenceIndex() {
  return (
    <Docs.Page>
      <Docs.Page.Title>API Reference</Docs.Page.Title>
      <Docs.Page.Description>
        Example endpoints. Replace openapi.yaml with your real specification.
      </Docs.Page.Description>
      <p className="mb-6 text-sm">
        <Link href="/docs" className="underline underline-offset-4">
          Documentation
        </Link>
      </p>
      <OpenAPI.Docs />
    </Docs.Page>
  );
}
