import { notFound } from "next/navigation";
import { OpenAPI } from "@ariadocs/components";
import { openapi } from "@/lib/openapi";

type Props = { params: Promise<{ operation: string }> };

export default async function OperationPage({ params }: Props) {
  const { operation } = await params;
  const endpoint = await openapi.getOperation(operation);
  if (!endpoint) notFound();

  return <OpenAPI.Operation id={operation} headingLevel={1} />;
}

export async function generateStaticParams() {
  const paths = await openapi.getPagePaths();
  return paths.map((path) => ({ operation: path.slice(1) }));
}
