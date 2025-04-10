

import { BrowserRouter, Route, Routes } from "react-router"
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/auth/ProfilePage";
import Navbar from "./components/Navbar";
import GroupsPage from "./pages/groups/GroupsPage";
import GroupPage from "./pages/groups/GroupPage";
import DashboardPage from "./pages/dashboard/DashboardPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
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
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />

        <Route element={<PrivateRoute />}>
          <Route path='dashboard'>
            <Route index element={<DashboardPage />}/>
            <Route path='settings' element={<SettingsPage />}/>
            <Route path='profile' element={<ProfilePage />} />
          </Route>

          <Route path='groups'>
            <Route index element={<GroupsPage />} />
            <Route path=':id' element={<GroupPage />} />
            {/* <Route path="create" element={<GroupCreatePage />} />
            <Route path="edit/:id" element={<GroupEditPage />} /> */}
          </Route>

          <Route path='students'>
            <Route index element={<StudentsPage />} />
            <Route path=':id' element={<StudentPage />} />
            {/* <Route path="create" element={<StudentCreatePage />} />
            <Route path="edit/:id" element={<StudentEditPage />} /> */}
          </Route>

          <Route path='lecturers'>
            <Route index element={<LecturersPage />} />
            <Route path=':id' element={<LecturerPage />} />
            {/* <Route path="create" element={<LecturerCreatePage />} />
            <Route path="edit/:id" element={<LecturerEditPage />} /> */}
          </Route>

          <Route path='proglangs'>
            <Route index element={<ProglangsPage />} />
            <Route path=':id' element={<ProglangPage />} />
            {/* <Route path="create" element={<ProglangCreatePage />} />
            <Route path="edit/:id" element={<ProglangEditPage />} /> */}
          </Route>

          <Route path='subjects'>
            <Route index element={<SubjectsPage />} />
            <Route path=':id' element={<SubjectPage />} />
            {/* <Route path="create" element={<SubjectCreatePage />} />
            <Route path="edit/:id" element={<SubjectEditPage />} /> */}
          </Route>

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App