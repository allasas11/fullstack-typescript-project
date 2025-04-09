

import { BrowserRouter, Route, Routes } from "react-router"
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./pages/Navbar";
import HomePage from "./HomePage";
import GroupsPage from "./pages/groups/GroupsPage";
import GroupPage from "./pages/groups/GroupPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute";
import StudentsPage from "./pages/students/StudentsPage";
import StudentPage from "./pages/students/StudentPage";
import LecturersPage from "./pages/lecturers/LecturersPage";
import LecturerPage from "./pages/lecturers/LecturerPage";
import ProglangsPage from "./pages/proglangs/ProglangsPage";
import ProglangPage from "./pages/proglangs/ProglangPage";
import SubjectsPage from "./pages/subjects/SubjectsPage";
import SubjectPage from "./pages/subjects/SubjectPage";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/main' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/profile' element={<ProfilePage />} />

        <Route path='groups'>
          <Route index element={<GroupsPage />} />
          <Route path=':id' element={<GroupPage />} />
        </Route>

        <Route path='students'>
          <Route index element={<StudentsPage />} />
          <Route path=':id' element={<StudentPage />} />
        </Route>

        <Route path='lecturers'>
          <Route index element={<LecturersPage />} />
          <Route path=':id' element={<LecturerPage />} />
        </Route>

        <Route path='proglangs'>
          <Route index element={<ProglangsPage />} />
          <Route path=':id' element={<ProglangPage />} />
        </Route>

        <Route path='subjects'>
          <Route index element={<SubjectsPage />} />
          <Route path=':id' element={<SubjectPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path='dashboard'>
            <Route index element={<DashboardPage />}/>
            <Route path='settings' element={<SettingsPage />}/>
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App