"use client";
import { useEffect } from 'react';

const ChatFrame = () => {
  useEffect(() => {
    const iframe = document.createElement("iframe");

    const iframeStyles = (styleString) => {
      const style = document.createElement('style');
      style.textContent = styleString;
      document.head.append(style);
    };

    iframeStyles(`
      .chat-frame {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
      }
    `);

    iframe.src = "aisaaschatbot-4c9v.onrender.com/chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    window.addEventListener("message", (e) => {
      if (e.origin !== "aisaaschatbot-4c9v.onrender.com") return null;
      let dimensions = JSON.parse(e.data);
      iframe.width = dimensions.width;
      iframe.height = dimensions.height;
      iframe.contentWindow.postMessage("0fa412c4-5e38-477a-af37-af2a249f0035", "aisaaschatbot-4c9v.onrender.com/");
    });
  }, []);

  return null;
};

export default ChatFrame;