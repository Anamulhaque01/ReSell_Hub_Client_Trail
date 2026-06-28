import ProtectedRoute from '@/components/ProtectedRoute';

export default function SellerLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['seller']}>
      <div className="seller-dashboard-wrapper">
        {children}
      </div>
    </ProtectedRoute>
  );
}