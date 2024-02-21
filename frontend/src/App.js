import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <div className='h-full'>
      <Header />
      <div className='flex gap-5 px-5 h-bodyHeight'>
        <div className='max-w-[250px] w-full'>
          <Sidebar />
        </div>
        <div className='w-full'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}

export default App;
