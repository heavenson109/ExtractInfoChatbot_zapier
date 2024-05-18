import React from 'react';
import Header from './components/Header';
import ChatRoom from './components/ChatRoom';

function App() {
  return (
    <div className='h-full'>
      <Header />
      <div className='flex gap-5 lg:px-5 h-bodyHeight'>
        <div className='w-full h-full'>
          <ChatRoom />
        </div>
      </div>
    </div>
  );
}

export default App;
