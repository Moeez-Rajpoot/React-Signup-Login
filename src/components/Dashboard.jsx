import { useEffect , useState } from 'react';
import Navbar from './navbar'; 
// import { useUser } from '../Context/UserContext';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState([]);
  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("Userdp")));
  })

  return (
    <div>
      <Navbar Profile={currentUser}/>

      <div className="bg-black w-screen h-screen">

      </div>
    </div>
  );
}

export default Dashboard;