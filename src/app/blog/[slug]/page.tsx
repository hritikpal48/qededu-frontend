// app/product/[slug]/page.tsx
import { Metadata } from 'next';

interface PageProps {
  params: {
    slug: string;
  };
}

// Optional: You can use generateMetadata for dynamic titles
export const generateMetadata = ({ params }: PageProps): Metadata => {
  return {
    title: `Product - ${params.slug}`,
  };
};

export default async function Page({ params }: PageProps) {
  const { slug } = params;

  // You can fetch data here if needed, e.g.:
  // const product = await getProductBySlug(slug);

  return (
    <div>
      <h1>Product Slug: {slug}</h1>
      {/* <p>{product.description}</p> */}
    </div>
  );
}
