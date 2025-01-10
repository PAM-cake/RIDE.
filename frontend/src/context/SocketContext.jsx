import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

// Create Socket Context
export const SocketDataContext = createContext();
const socket = io(`${import.meta.env.VITE_BASE_URL}`); 

const SocketProvider = ({ children }) => {

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket server');
    });

  }, []); 

  

  return (
    <SocketDataContext.Provider value={{ socket }}>
      {children}
    </SocketDataContext.Provider>
  );
};

export default SocketProvider;
