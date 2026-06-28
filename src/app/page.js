// src/app/page.js
import HomeClientView from "@/components/global/HomeClientView";

export const metadata = {
  title: "ReSell Hub | Second-Hand Marketplace Platform",
  description: "Buy and sell pre-owned products safely and efficiently. Reduce waste and promote sustainable consumption.",
};

export default function HomePage() {
  return <HomeClientView />;
}