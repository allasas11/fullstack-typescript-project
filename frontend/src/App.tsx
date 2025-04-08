

import { BrowserRouter, Route, Routes } from "react-router"
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./pages/Navbar";
import HomePage from "./HomePage";
import GroupsPage from "./pages/GroupsPage";
import GroupPage from "./pages/GroupPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPage";
import PrivateRoute from "./components/PrivateRoute";

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


        <Route path='/groups' element={<GroupsPage />} />
        <Route path='/groups/:id' element={<GroupPage />} />

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