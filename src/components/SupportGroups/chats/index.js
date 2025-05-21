import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../utils/firebase";

import { Button, TextField, InputAdornment } from "@mui/material";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatList = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 1rem;
`;

const ChatMessage = styled.div`
  margin-bottom: 1rem;
  align-self: ${(props) => (props.sent ? "flex-end" : "flex-start")};
`;

const ChatText = styled.div`
  background-color: #e0e0e0;
  padding: 0.5rem;
  border-radius: 10px;
`;

const ChatMeta = styled.div`
  font-size: 0.75rem;
  color: gray;
  margin-top: 0.25rem;
`;

const ChatInputContainer = styled.div`
  padding: 1rem;
`;

const ChatInput = styled(TextField)`
  width: 100%;
`;

const Chats = ({ groupId }) => {
  const user = useSelector((state) => state.auth.user);
  const [chatText, setChatText] = useState("");
  const [chats, setChats] = useState([]);
  const lastMessageRef = useRef(null);
  const isMountedRef = useRef(false);

  useEffect(() => {
    const chatsRef = collection(db, "groups", groupId, "chats");
    const q = query(chatsRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const chats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chats);
    });
    return unsubscribe;
  }, [groupId]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (!isMountedRef.current) {
      setTimeout(() => {
        isMountedRef.current = true;
      }, 1000);
    }
  }, [chats]);

  const handleChatSubmit = async (event) => {
    event.preventDefault();
    if (chatText.trim() === "") return;

    try {
      const chatData = {
        text: chatText.trim(),
        userId: user.uid,
        displayName: user.displayName,
        timestamp: serverTimestamp(),
      };

      const groupChatsRef = collection(db, "groups", groupId, "chats");
      await addDoc(groupChatsRef, chatData);
      setChatText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ height: window.innerHeight - 64 }}>
      <ChatList>
        {chats.map((chat, index) => (
          <ChatMessage
            key={chat.id}
            className={chat.isFlagged ? "flagged" : ""}
            sent={chat.userId === user.uid}
            ref={index === chats.length - 1 ? lastMessageRef : null}
          >
            <ChatText>
              {chat.isFlagged ? "Message flagged" : chat.text}
            </ChatText>
            <ChatMeta>
              {chat.timestamp?.toDate().toLocaleString()} -{" "}
              {chat.userId === user.uid ? "You" : chat.displayName}
            </ChatMeta>
          </ChatMessage>
        ))}
      </ChatList>
      <form onSubmit={handleChatSubmit}>
        <ChatInputContainer>
          <ChatInput
            placeholder="Type a message..."
            value={chatText}
            onChange={(e) => setChatText(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button variant="contained" type="submit" size="large">
                    Send
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </ChatInputContainer>
      </form>
    </Container>
  );
};

export default Chats;
