import { useEffect, useRef } from "react";
import { io } from "socket.io-client";

/**
 * useSocket - React hook to connect to a Socket.IO server and listen for events.
 * @param {string} url - The Socket.IO server URL.
 * @param {Object} eventHandlers - Map of event names to handler functions.
 */
export default function useSocket(url, eventHandlers) {
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url);

    // Register event listeners
    Object.entries(eventHandlers).forEach(([event, handler]) => {
      socketRef.current.on(event, handler);
    });

    return () => {
      // Cleanup listeners and disconnect
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socketRef.current.off(event, handler);
      });
      socketRef.current.disconnect();
    };
    // eslint-disable-next-line
  }, [url, ...Object.values(eventHandlers)]);
}