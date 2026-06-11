import { homeSeo } from "@/seo/homeSeo";
import HomePage from "@/components/HomePage";

export const metadata = homeSeo;

export default function Page() {
  return <HomePage />;
}
