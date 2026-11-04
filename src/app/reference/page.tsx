import Link from "next/link";
import { Docs } from "@ariadocs/components";

export const metadata = {
  title: "Reference",
  description: "Reference material for the current experimental BSIS Rust prototype.",
};

export default function ReferenceIndex() {
  return (
    <Docs.Page>
      <Docs.Page.Title>BSIS reference</Docs.Page.Title>
      <Docs.Page.Description>
        Commands, manifest fields and security behavior in the current experimental Rust prototype.
      </Docs.Page.Description>
      <Docs.Page.Content>
        <p>
          BSIS is not a web service, and it has no public HTTP API or released SDK.
          The old example API has been removed to avoid presenting fictional endpoints as working features.
        </p>
        <h2 id="available-reference-guides">Available reference guides</h2>
        <ul>
          <li><Link href="/docs/cli">CLI commands</Link> — build, inspect, install and uninstall, with flags and examples.</li>
          <li><Link href="/docs/configuration">Configuration</Link> — the implemented version 1 JSON build schema.</li>
          <li><Link href="/docs/packaging">Packaging</Link> — the current Zstandard executable overlay format.</li>
          <li><Link href="/docs/security">Security model</Link> — verified safeguards and important limitations.</li>
          <li><Link href="/docs/troubleshooting">Troubleshooting</Link> — common setup and uninstall failures.</li>
        </ul>
        <h2 id="public-availability">Public availability</h2>
        <p>
          The core repository is private during development. These guides describe the testable
          prototype for maintainers with access; they are not a public release contract.
        </p>
      </Docs.Page.Content>
    </Docs.Page>
  );
}
