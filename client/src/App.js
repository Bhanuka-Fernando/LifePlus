import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/publicRoute';


//Banuka
import LoginPage from './pages/Banuka/LoginPage';
import HealthCareManagerReg from './pages/Banuka/HealthCareManagerReg';
import HealthCareManagerDashboard from './pages/Banuka/HealthCareManagerDashboard';
import PatientSearch from './pages/Banuka/PatientsSearch';
import AddPatient from './pages/Banuka/ManageAccount';
import DigitalCard from './pages/Banuka/DigitalCard';
import UpdatePatientPage from './pages/Banuka/UpdatePatient';
import PatientScansPage from './pages/Banuka/PatientScansPage';
import AddDoctor from './pages/Banuka/AddDoctor';
import PatientProfilePage from './pages/Banuka/PatientProfilePage';
import PatientScansPatient from './pages/Banuka/PatientScansPatient';
import ReportPage from './pages/Banuka/ReportsPage';

//Bhanuka
import CentralizedDoctors from '../src/pages/BhanukaFdo/CentralizedDoctors'
import BookingForm from '../src/pages/BhanukaFdo/AppointmentBookingForm'
import MyAppointments from '../src/pages/BhanukaFdo/myAppointments';
import CentralizedLabServices from '../src/pages/BhanukaFdo/centralizedLabServices';
import LabBookingForm from '../src/pages/BhanukaFdo/labBookingForm';
import CentralizedHealthcare from '../src/pages/BhanukaFdo/centralizedHealthcare';
import PatientHome from '../src/pages/BhanukaFdo/Home';
import MyPayment from './pages/BhanukaFdo/myPayments';

//Dushan

import DoctorRegistration from './pages/Dushan/DoctorRegistration/DoctorRegistration';
import DoctorList from './pages/Dushan/DoctorListView/DoctorListView';
import DoctorEdit from './pages/Dushan/DoctorEditDelete/DoctorEdit';
import DoctorHome from './pages/Dushan/DoctorHome/DoctorHome';
import Hospital from './pages/Dushan/Hospitals/HospitalRegistration';
import StaffLogin from './pages/Dushan/StaffLogin/StaffLogin';
import DoctorOverview from './pages/Dushan/Overview/DoctorOverView';


//geshika
import AllPatients from "./pages/Geshika/AllPatients";
import PatientDetails from "./pages/Geshika/PatientDetails";


function App() {
  const {loading} = useSelector(state => state.alerts)
  return (
    <>
    
      <BrowserRouter>
      {loading && <Spinner />}

      <Routes>

        <Route path='/' 
        element={
        <HomePage />
        } />
        <Route path='/login' 
        element={
        
          <Login />
        
        } />
        <Route path='/register' 
        element={
          <Register />
        } />

        {/*Banuka*/}
        <Route
        path='/HealthCareProvider_Login'
        element={<LoginPage/>}
        />

        <Route
        path='/HealthCareProvider_Register'
        element={<HealthCareManagerReg/>}
        />

        <Route
        path='/HealthCareProvider/Dashboard'
        element={<HealthCareManagerDashboard/>
        }/>

        <Route
        path='/HealthCareProvider/Dashboard/Patients'
        element={<PatientSearch/>}
        />

        <Route
        path='/HealthCareProvider/Dashboard/Patients/AddPatient'
        element={<AddPatient/>}
        />

        <Route
        path='/HealthCareProvider/Dashboard/Patients/DigitalCard'
        element={<DigitalCard/>}
        />

        <Route
        path='/HealthCareProvider/Dashboard/Patients/UpdatePatient/:id'
        element={<UpdatePatientPage/>}
        />

        <Route
        path='/HealthCareProvider/Dashboard/Patients/Scanned/:id'
        element={<PatientScansPage/>}
        />

        <Route
        path='/Dashboard/AddDoctor'
        element={<AddDoctor/>}
        />

        <Route
        path='/Patient/Profile'
        element={<PatientProfilePage/>}
        />

        <Route
        path='/Patient/Profile/ScanLogs/:id'
        element={<PatientScansPatient/>}
        />

        <Route path='/Dashboard/reports' element={<ReportPage/>} />

        {/*Dushan*/}

        
        <Route path='/DoctorRegistration'
          element={<DoctorRegistration/>}/>
        <Route path='/DoctorList'
          element={<DoctorList/>}/>
        <Route path='/DoctorEdit'
          element={<DoctorEdit/>}/>  
        <Route path='/DoctorHome'
          element={<DoctorHome/>}/>  
        <Route path='/Hospital'
          element={<Hospital/>}/> 
        <Route path='/StaffLogin'
          element={<StaffLogin/>}/> 
          <Route path='/DoctorOverview'
          element={<DoctorOverview/>}/>


        {/* BhanukaFdo */}

        <Route path="/Patient-home" element={<PatientHome />} />
        <Route path="/centralized-doctors/:hospitalId" element={<CentralizedDoctors />} />
        <Route path="/bookingForm/:doctorId/:hospitalId/:wardNo/:docName/:specialization/:docPayment/:doctorAvailableTime/:hospitalName" element={<BookingForm />} />
        <Route path="/my-appointments/:email" element={<MyAppointments />} />
        <Route path="/lab-services" element={<CentralizedLabServices />} />
        <Route path="/lab-BookingForm/:hospitalId/:labId/:testType/:hospitalName/:serviceName/:servicePayment" element={<LabBookingForm />} />
        <Route path="/healthCare/:hospitalId/:hospitalName" element={<CentralizedHealthcare />} />
        <Route path="/my-payments/:email" element={<MyPayment />} />



          {/* Geshika */}

          <Route path="/patientRecords" element={<AllPatients />} />
          <Route path="/patient-details/:id" element={<PatientDetails />} />
      </Routes>
      </BrowserRouter>
     
    
    </>
  );
}

export default App;
