import { useEffect, useState, useRef } from "react";
import { collection, query, orderBy, onSnapshot, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { getChatId } from "./utils";
import Message from "./Message";
import SendMessage from "./SendMessage";

export default function Chat({ selectedUser, username }) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null) 

 useEffect(() => {
  if (!auth.currentUser || !selectedUser) return;

  const chatId = getChatId(auth.currentUser.uid, selectedUser.uid);

  // ensure chat exists
  setDoc(doc(db, "chats", chatId), {
    participants: [auth.currentUser.uid, selectedUser.uid],
  }, { merge: true });

  // 🔹 MESSAGES LISTENER
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt")
  );
const unsubscribeMessages = onSnapshot(q, (snapshot) => {
    setMessages(
      snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
    );
  });
   // 🔹 TYPING LISTENER
  const typingRef = collection(db, "typing", chatId, "users");

  const unsubscribeTyping = onSnapshot(typingRef, (snapshot) => {
    let isTyping = false;

    snapshot.forEach((doc) => {
      const data = doc.data();
      // ignore yourself
      if (
        doc.id !== auth.currentUser.uid &&
        data.isTyping === true
      ) {
        isTyping = true;
      }
    });
    setIsTyping(isTyping);
  });
    return () => {
    unsubscribeMessages();
    unsubscribeTyping();
  };
}, [selectedUser]);
    





  useEffect(() => {
  bottomRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
},[messages])

  if (!selectedUser) {
    return <div className="p-3">Select a user to start chatting</div>;
  }



  return (
    <div className="flex-grow-1 d-flex flex-column">
      <div className="p-2 border-bottom fw-bold">
        {selectedUser?.username}
      </div>
      

      <div className="flex-grow-1 overflow-auto p-3">
        {messages.map((msg) => (
          <Message 
          key={msg.id} 
          message={msg}
          selectedUser={selectedUser} 
          />
        ))}
          {isTyping && (
    <div className="px-3 text-muted"style={{ fontSize: "12px", color: "gray" }}>
      typing...
    </div>
       )}


        <div ref={bottomRef}></div>
      </div>

      

      <SendMessage selectedUser={selectedUser}  username={username} />
      
    </div>
  );
}

