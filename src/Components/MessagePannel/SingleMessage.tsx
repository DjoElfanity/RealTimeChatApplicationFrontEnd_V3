import Message from "./Messages";

interface SingleMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const SingleMessage: React.FC<SingleMessageProps> = ({
  message,
  isCurrentUser,
}) => (
  <div
    key={message.id}
    className={`flex flex-row ${
      isCurrentUser ? "justify-end" : "justify-start"
    } mx-8`}
  >
    <div
      className={`flex flex-col  rounded-2xl p-1  ${
        isCurrentUser ? "text-right bg-card-primary   " : "bg-white"
      }`}
    >
      <div
        className={`flex p-2 ${isCurrentUser ? "text-white" : "text-black"}`}
      >
        {message.content}
      </div>
    </div>
  </div>
);

export default SingleMessage;
