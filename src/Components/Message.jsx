import { auth } from "../firebase";

export default function Message({ message, selectedUser }) {
  if (!message) return null;

  const user = auth.currentUser;
  const isMe = message.senderId === auth.currentUser.uid;

  

  return (
    <div className={`d-flex mb-2 ${isMe ? "justify-content-end" : "justify-content-start"}`}>
      
      <div
        className={`p-2 px-3 rounded ${isMe ? "bg-success text-white" : "bg-light"}`}
        style={{ maxWidth: "70%" }}
      >
       

        <span>{message.text}</span>

        <div>
          <small className="text-muted">
            {message.createdAt?.toDate().toLocaleTimeString()}
          </small>
        </div>
      </div>

    </div>
  );
}



