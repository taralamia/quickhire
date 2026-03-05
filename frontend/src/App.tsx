import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { 
  Landing, 
  JobSearch, 
  JobDetails, 
  DashboardJobs, 
  Dashboard, 
  DashboardApplicants,
  DashboardMessages,
  DashboardSettings,
  Companies,
  Login ,
  AdminPage
} from './pages';
import { DashboardLayout } from './components/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/jobs" element={<JobSearch />} />
        <Route path="/jobs/:id" element={<JobDetails />} />
        <Route path="/companies" element={<Companies />} />
        <Route path="/login" element={<Login />} />
        
        {/* Dashboard Routes with Sidebar Layout */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="jobs" element={<DashboardJobs />} />
          <Route path="applicants" element={<DashboardApplicants />} />
          <Route path="messages" element={<DashboardMessages />} />
          <Route path="settings" element={<DashboardSettings />} />
          <Route path="admin" element={<AdminPage />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
