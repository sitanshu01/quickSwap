import React, { useState } from 'react';

const Dialog = ({text, messageTitle ,message, function1}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)} className='text-2xl px-3 py-2 rounded-md font-barlow bg-red-600 text-white'>{text}</button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">{messageTitle}</h2>
            <p>{message}</p>
            <button 
            onClick={()=> setIsOpen(false)}
            className='text-2xl px-3 py-2 rounded-md font-barlow bg-neutral-300 text-black'>Cancel</button>
            <button className= "text-2xl px-3 py-2 rounded-md font-barlow bg-red-600 text-white"
              onClick={() => {
                function1();
                setIsOpen(false);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Dialog;
