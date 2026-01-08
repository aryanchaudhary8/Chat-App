import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";
import { getInitialsAvatar } from "../../utils/avatar";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);

  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  const profilePic = fromMe
    ? authUser?.profilePic
    : selectedConversation?.profilePic;

  const fallbackAvatar = getInitialsAvatar(
    fromMe ? authUser?.username : selectedConversation?.username
  );

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full overflow-hidden">
          <img
            src={profilePic || fallbackAvatar}
            alt="profile"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackAvatar;
            }}
          />
        </div>
      </div>

      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass}`}>
        {message.message}
      </div>

      <div className="chat-footer opacity-50 text-xs">
        {formattedTime}
      </div>
    </div>
  );
};

export default Message;
