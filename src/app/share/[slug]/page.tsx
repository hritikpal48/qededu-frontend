import ShareDetailPage from "@/components/page/shareDetail/ShareDetailPage";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // ✅ must await
  return <ShareDetailPage slug={slug} />;
}
