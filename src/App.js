import './styles/global.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Homepage from './pages/Homepage/Homepage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AddStudent from "./pages/AddStudentPage/AddStudent";
import StudentForm from "./pages/AddStudentPage/StudentForm";
import AddCourse from './pages/AddCourses/AddCourses';
import ListStudents from './pages/ListStudents/ListStudents';
import UpdateInfo from './pages/UpdateInfo/UpdateInfo';
import RemoveStudent from './pages/RemoveStudent/RemoveStudent';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: <AdminDashboard/>,
  },
  {
    path: "/admin/addstudent",
    element: <AddStudent/>,
  },
  {
    path: "/admin/studentform",
    element: <StudentForm/>,
  },
  {
    path: "/admin/addcourse",
    element: <AddCourse/>,
  },
  {
    path: "/admin/liststudent",
    element: <ListStudents/>,
  },
  {
    path: "/admin/updateinfo",
    element: <UpdateInfo/>,
  },
  {
    path: "/admin/removestudent",
    element: <RemoveStudent/>,
  }


]);

function App() {
  return (
    <RouterProvider router={router}>
      <div className="App">
        {/* Your content here */}
      </div>
    </RouterProvider>
  );
}

export default App;
