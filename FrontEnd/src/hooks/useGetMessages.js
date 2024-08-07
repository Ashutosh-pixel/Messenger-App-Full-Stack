import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { toast } from "react-hot-toast";

function useGetMessages() {
  let [messageArray, setMessageArray] = useState({});
  const [loading, setLoading] = useState(true);
  const { userSelectId } = useContext(AuthContext);
  const { usermessage, setUserMessage } = useContext(AuthContext);
  const [blank, setBlank] = useState("");
  let { dummymessage, setDummymessage } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/auth/message/recieve/${userSelectId}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error("Error fetching message");
        }

        const data = await res.json();
        if (data.blankmessage) setBlank(data.blankmessage);
        else {
          setBlank("");

          // Step 1: Create a complete array by merging recieverMessage and senderMessage arrays
          let completeMessages = [
            ...data.recieverMessage.map((msg) => ({
              ...msg,
              identity: "recieverMessage",
            })),
            ...data.senderMessage.map((msg) => ({
              ...msg,
              identity: "senderMessage",
            })),
          ];

          // Step 2: Sort the complete array by createdAt
          completeMessages.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );

          messageArray = completeMessages;

          setMessageArray(messageArray);
        }
        // console.log("messageArray = ", messageArray);
      } catch (error) {
        toast.error("Error fetching messages");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [usermessage, dummymessage, userSelectId]);

  return { loading, messageArray, blank };
}

export default useGetMessages;
