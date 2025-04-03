"use client";

import { useEffect } from "react";

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
        bottom: 30px;
        right: 30px;
        border: none;
        z-index: 1000;
      }
    `);

    // iframe.src = "https://aisaaschatbot-4c9v.onrender.com/chatbot";
    iframe.src = "http://localhost:3000/chatbot";
    iframe.classList.add('chat-frame');
    document.body.appendChild(iframe);

    const messageHandler = (e) => {
      // if (e.origin !== "https://aisaaschatbot-4c9v.onrender.com") return null;
      if (e.origin !== "http://localhost:3000") return null;
      let dimensions;
      // Check if e.data is already an object
      if (typeof e.data === 'object' && e.data !== null) {
        dimensions = e.data; // Use it directly
      } else if (typeof e.data === 'string') {
        try {
          dimensions = JSON.parse(e.data); // Parse if it’s a string
        } catch (error) {
          console.error("Failed to parse e.data as JSON:", e.data, error);
          return; // Exit if parsing fails
        }
      } else {
        console.error("Unexpected e.data type:", e.data);
        return; // Exit if data is neither object nor string
      }

      // Ensure dimensions has width and height
      if (dimensions.width && dimensions.height) {
        iframe.width = dimensions.width;
        iframe.height = dimensions.height;
        iframe.contentWindow.postMessage(
          "0fa412c4-5e38-477a-af37-af2a249f0035",
           "http://localhost:3000/"
          // "https://aisaaschatbot-4c9v.onrender.com/"
        );
      } else {
        console.warn("Dimensions missing width or height:", dimensions);
      }
    };

    window.addEventListener("message", messageHandler);

    // Cleanup function
    return () => {
      window.removeEventListener("message", messageHandler);
      if (document.body.contains(iframe)) {
        document.body.removeChild(iframe);
      }
      const style = document.querySelector('style');
      if (style && document.head.contains(style)) {
        document.head.removeChild(style);
      }
    };
  }, []);
  return null;
};

export default ChatFrame;