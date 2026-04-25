
import { updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function SetUsername() {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) return;

    await updateProfile(user,{
      displayName:username
    });
    if (!username || username.trim() === "") {
      alert("Enter a valid username");
      return;
    }
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
     username: username,
     email: user.email
    });
    if (!username || username.trim() === "") {
      alert("Enter a username");
      return;
    }
    setUsername(username);
    window.location.reload(); // simple way to refresh app
  
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter username"
      />
      <button type="submit">Save</button>
    </form>
  );
}

export default SetUsername;

