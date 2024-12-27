import MarketplaceDetailPage from "@/components/Pages/Marketplace/MarketPlaceDetails/MarketplaceDetailed";
import { Metadata } from "next";
interface IMarketPlaceDetails {
  id: string;
  productName: string;
  productDescription: string;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Fetch marketPlace data based on the dynamic id
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_IP}/api/v1/product/${params.id}`
  );
  const responseData = await res.json();
  const marketPlaceData: IMarketPlaceDetails = responseData?.data?.attributes?.product;
  return {
    title: `${marketPlaceData?.productName} - Locate | Horticulture Specialists`,
    description: marketPlaceData?.productName,
    keywords: `MarketPlace, details, ${marketPlaceData?.productDescription}`,
  };
}
const Page = ({ params }: { params: { id: string } }) => {
  return <MarketplaceDetailPage id={params?.id} />;
};

export default Page;
