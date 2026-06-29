import BuyerOrdersClient from './BuyerOrdersClient';

export const metadata = {
  title: 'My Orders | ReSell Hub',
  description: 'Track your pending transactions, download order receipts, and manage cancellations.',
};

export default function BuyerOrdersPage() {
  return <BuyerOrdersClient />;
}