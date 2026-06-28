import ProtectedRoute from '@/components/ProtectedRoute';

export default function BuyerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['buyer', 'admin']}>
      {children}
    </ProtectedRoute>
  );
}