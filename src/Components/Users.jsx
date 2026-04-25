import { collection, onSnapshot } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useEffect, useState } from "react";

export default function Users({ setSelectedUser }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        uid: doc.id,
        ...doc.data()
      }))
      setUsers(data);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="p-3 border-end" style={{ width: "250px" }}>
      {users
        .filter(u =>  auth.currentUser && u.uid !== auth.currentUser.uid)
        .map(user => (
          <div
            key={user.uid}
            className="p-2 border-bottom"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedUser(user)}
          >
            {user.username}
          </div>
        ))}
    </div>
  );
}
