import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Users from "./Components/Users";

import Chat from "./Components/Chat";
import SignIn from "./Components/SignIn";
import SetUsername from "./Components/SetUsername";

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [user] = useAuthState(auth);

  useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setUsername(snap.data().username);
        } else {
          setUsername(null);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    } else {
      setUsername(null);
    }
  });

  return () => unsubscribe();
}, []);


  if (!user) return <SignIn />;

  return (
    <div>
      {!username ? (
       < SetUsername />
        
      ) : (
        <div className="d-flex vh-100"> 
           <Users setSelectedUser={setSelectedUser} />
           <Chat selectedUser={selectedUser}  
           username= {username} />
        </div>
      )
      }
    </div>
  );
};

export default App;
