import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import Registration from './Components/Register';
import Header from './Components/Header';
import{Outlet} from 'react-router-dom'
import SidebarComponent from './Components/SideBar';



function App() {
  return (
    <div className="App">
      <Header/>
      <Outlet/>
    </div>
  );
}

export default App;
