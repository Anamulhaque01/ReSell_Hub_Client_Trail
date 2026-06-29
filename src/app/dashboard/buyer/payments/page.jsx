import PaymentsClient from './PaymentsClient';

export const metadata = {
  title: 'Payment History | ReSell Hub',
  description: 'View your transaction records, billing logs, and payment statuses.',
};

export default function PaymentsPage() {
  return <PaymentsClient />;
}