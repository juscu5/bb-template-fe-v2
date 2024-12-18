import { Navigate } from 'react-router-dom';
import { useAccountStore } from '@/_shared/store/AccountStore';

interface PublicRoutesProps {
  element: React.ReactNode;
}

export default function PublicRoutesWrapper({ element }: PublicRoutesProps) {
  const { account } = useAccountStore();

  return !account ? element : <Navigate to={'/dashboard'} replace />;
}
