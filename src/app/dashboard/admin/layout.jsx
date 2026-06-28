import ProtectedRoute from '@/components/ProtectedRoute';

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <div className="admin-panel-wrapper">
        {children}
      </div>
    </ProtectedRoute>
  );
}