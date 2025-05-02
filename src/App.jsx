import {createBrowserRouter, createRoutesFromElements, RouterProvider ,Route} from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Loans from './pages/Loans';
import Services from './pages/Services';
import Contact from './pages/Contact';

//Layouts
import BaseLayout from './layouts/BaseLayout';
import GuestLayout from './layouts/GuestLayout';
import AuthenticatedLayout from './layouts/AuthenticatedLayout';

//Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

//User pages
import UserDashboard from './pages/users/Dashboard';
import WireTransfer from './pages/users/WireTransfer';
import LocalTransfer from './pages/users/LocalTransfer';
import DepositMoney from './pages/users/DepositMoney';
import LoanManagement from './pages/users/LoanManagement';
import SupportCenter from './pages/users/SupportCenter';
import Transactions from './pages/users/Transactions';
import UserSettings from './pages/users/UserSettings';
import InternalTransfer from './pages/users/InternalTransfer';
import Investment from './pages/users/Investment';
import BuyCrypto from './pages/users/BuyCrypto';
import SavingsStatement from './pages/users/SavingsStatement';
import CheckingStatement from './pages/users/CheckingStatement';

//Admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import Users from './pages/admin/Users';
import ManageTransactions from './pages/admin/ManageTransactions';
import ManageLoans from './pages/admin/ManageLoans';
import DepositRequests from './pages/admin/DepositRequests';
import AdminSettings from './pages/admin/AdminSettings';


//Others
import { requireAuth } from './utils/protect';
import NotFound from './pages/NotFound';
import Error from './components/Error';






function App() {
  
  const router = createBrowserRouter(createRoutesFromElements(
    <>

      <Route path='/' element={<BaseLayout />}>
        <Route index element={<Home />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/loans' element={<Loans />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/contact_us' element={<Contact />}></Route>
      </Route>

      <Route path='/account' element={<GuestLayout />}>
        <Route path='login' element={<Login />}></Route>
        <Route path='register' element={<Register />}></Route>
      </Route>

      <Route path='/account' element={<AuthenticatedLayout />}  errorElement={<Error />}  loader={async({request})=> await requireAuth(request)}>
        {/* Admin Related Routes */}
        <Route path='admin/dashboard' element={<AdminDashboard />}></Route>
        <Route path='admin/manage_users' element={<Users />}></Route>
        <Route path='admin/manage_transactions' element={<ManageTransactions />}></Route>
        <Route path='admin/manage_loans' element={<ManageLoans />}></Route>
        <Route path='admin/deposit_requests' element={<DepositRequests />}></Route>
        <Route path='admin/settings' element={<AdminSettings />}></Route>
       

        {/* User's Related Routes */}
        <Route path='user/dashboard' element={<UserDashboard />}></Route>
        <Route path='user/wire_transfer' element={<WireTransfer />}></Route>
        <Route path='user/local_transfer' element={<LocalTransfer />}></Route>
        <Route path='user/internal_transfer' element={<InternalTransfer />}></Route>
        <Route path='user/buy_crypto' element={<BuyCrypto />}></Route>
        <Route path='user/savings_statement' element={<SavingsStatement />}></Route>
        <Route path='user/checking_statement' element={<CheckingStatement />}></Route>
        <Route path='user/deposit_money' element={<DepositMoney />}></Route>
        <Route path='user/loan_management' element={<LoanManagement />}></Route>
        <Route path='user/support' element={<SupportCenter />}></Route>
        <Route path='user/transactions' element={<Transactions />}></Route>
        <Route path='user/investment' element={<Investment />}></Route>
        <Route path='user/settings' element={<UserSettings />}></Route>
      </Route>
      <Route path="*" element={<NotFound />} />

    </>
  ))

  return (
    <RouterProvider router={router} />
  )
}

export default App
