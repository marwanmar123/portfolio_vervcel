import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./Layout/Layout";
import LayoutDashboard from "./Layout/LayoutDashboard";
import Register from "./Component/Auth/Register";
import Login from "./Component/Auth/Login";
import Porftolio from "./Pages/Porftolio";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import Dashboard from "./Pages/Dashboard";
import CreateCategory from "./Pages/Category/CreateCategory";
import Categories from "./Pages/Category/Categories";
import Projects from "./Pages/Project/Projects";
import CreateProject from "./Pages/Project/CreateProject";
import ProjectsCategory from "./Pages/Project/ProjectsCategory";
import ProjectDetails from "./Pages/Project/ProjectDetails";
import CreateSkill from "./Pages/Skills/CreateSkill";
import SkillsList from "./Pages/Skills/SkillsList";
import ProfileList from "./Pages/Profile/ProfileList";
import EditProfile from "./Pages/Profile/EditProfile";
import MyPage from "./Pages/Profile/MyPage";
import EditSkill from "./Pages/Skills/EditSkill";
import EditProject from "./Pages/Project/EditProject";
import Contact from "./Pages/Contact/Contact";
import MyContacts from "./Pages/Contact/MyContacts";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Porftolio />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
          </Route>
          <Route element={<LayoutDashboard />}>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/category/create" element={<CreateCategory />}></Route>
            <Route path="/categories" element={<Categories />}></Route>
            <Route path="/projects" element={<Projects />}></Route>
            <Route path="/project/create" element={<CreateProject />}></Route>
            <Route path="/projectCategory" element={<ProjectsCategory />}></Route>
            <Route path="/project/:id" element={<ProjectDetails />}></Route>
            <Route path="/project/edit/:id" element={<EditProject />}></Route>
            <Route path="/skill/create" element={<CreateSkill />}></Route>
            <Route path="/skills" element={<SkillsList />}></Route>
            <Route path="/skill/edit/:id" element={<EditSkill />}></Route>
            <Route path="/profiles" element={<ProfileList />}></Route>
            <Route path="/profile/edit/:id" element={<EditProfile />}></Route>
            <Route path="/profile" element={<MyPage />}></Route>
            <Route path="/contacts" element={<MyContacts />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
