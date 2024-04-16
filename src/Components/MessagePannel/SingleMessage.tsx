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
    className={`flex flex-row ${isCurrentUser ? "justify-end" : ""} mx-8`}
  >
    <div
      className={`flex flex-col  ${isCurrentUser ? "text-right" : "text-red"}`}
    >
      <div className="flex">{message.content}</div>
    </div>
  </div>
);

export default SingleMessage;
