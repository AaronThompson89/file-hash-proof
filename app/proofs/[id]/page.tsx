import { ProofDetailPage } from "@/components/pages/proof-detail-page";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProofDetailPage id={id} />;
}
