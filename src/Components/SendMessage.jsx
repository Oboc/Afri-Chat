import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useState } from "react";
import {doc, setDoc, getDoc} from "firebase/firestore";
import {useRef} from "react"
import { getChatId } from "./utils";

export default function SendMessage({ selectedUser, username }) {
  const [message, setMessage] = useState("");
  const user = auth.currentUser;
  const typingTimeout = useRef (null)
  // HANDLE TYPING (OUTSIDE)
  const handleTyping = async (e) => {
  const value = e.target.value;
  setMessage(value);
  if (!user || !selectedUser) return;
  const chatId = getChatId(user.uid, selectedUser.uid);
  if (!value.trim()) return;
  try {
    // ✅ set typing TRUE
    await setDoc(doc(db, "typing", chatId, "users", user.uid), {
      userId: user.uid,
      isTyping: true,
    });

    // clear previous timeout
    clearTimeout(typingTimeout.current);

    // set new timeout
    typingTimeout.current = setTimeout(async () => {
      await setDoc(doc(db, "typing", chatId, "users", user.uid), {
        userId: user.uid,
        isTyping: false,
      });
    }, 2000); // 2 seconds is better UX than 5
  } catch (err) {
    console.error(err);
  }
};

  //  SEND MESSAGE (SEPARATE)
  const sendMessage = async (e) => {
  e.preventDefault();

  if (!message.trim()) return;
  if (!auth.currentUser || !selectedUser) return;

  const chatId = getChatId(
    auth.currentUser.uid,
    selectedUser.uid
  );

  try {
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message, // ✅ FIXED
      senderId: auth.currentUser.uid,
      username: username,
      senderEmail: auth.currentUser.email,
      createdAt: serverTimestamp(),
    });

    setMessage(""); // ✅ clear input
  } catch (err) {
    console.error("Send error:", err);
  }
};
  return (
   <form className="d-flex p-2 border-top bg-white" onSubmit={sendMessage}>
  <input
    type="text"
    value={message}
    onChange={handleTyping}
    placeholder="Type message..."
  />
  <button className="btn gold-btn round-circle px-3" type="submit"> Send</button>
</form>
  );

}

