import React, { useEffect, useState } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { PiUploadSimpleBold } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import logoColorSVG from '../assets/logos/TheMark-Logo-Icon-Colour.svg';
import axios from 'axios';
import { Loader2 } from 'lucide-react'

const Icons = {
  spinner: Loader2,
};

const QAS = [
  {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  }, {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  },
  {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  },
  {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  },
  {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  },
  {
    question: "Name, email, address from https://microsoft.com",
    answers: [
      { name: "Bill gates", email: "billgates@gmail.com", address: "USA, New york" },
      { name: "Steve jobs", email: "stevejobs@gmail.com", address: "USA, California" },
      { name: "Elon Mask", email: "elonmask@gmail.com", address: "USA, SillyconValley" }
    ]
  }
]

const ChatRoom = () => {
  const [url, setUrl] = useState("")
  const [prompt, setPrompt] = useState("")
  const [chatHistory, setChatHistory] = useState(QAS)
  const [isLoading, setIsLoading] = useState(false)

  const handleSend = async() => {
    setIsLoading(true)
    await axios.get(`http://localhost:8000/api/response?message=${url}/`)
      .then((response) => {
        setIsLoading(false)
        setChatHistory([...chatHistory, {question: url, answers: response.data}])
      })
  }

  useEffect(() => {
    console.log(chatHistory, "----------Here's chat history")
  }, [chatHistory])

  return (
    <div className='h-full pb-[86px] text-white'>
      <div className='bg-[#171717] rounded-3xl px-[185px] pt-6 h-full flex flex-col justify-between'>
        <div className='flex flex-col overflow-y-scroll px-2'>
          {chatHistory.map((qa, index) => (
            <div key={`qa_${index}`}>
              <div className='flex justify-between items-end mb-[13px]'>
                <div className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-cyan-500 rounded-full text-center'>N</div>
                  <div className='flex flex-col'>
                    <p className='text-white/60'>Nana</p>
                    <p>{qa.question}</p>
                  </div>
                </div>
                <RxPencil2 className='text-white/60 text-sm' />
              </div>
              <div className='bg-[#262626] rounded-2xl px-3 py-5 flex items-start gap-3 mb-4'>
                <img src={logoColorSVG} alt="" className='w-6 h-6' />
                <div className='flex flex-col'>
                  {qa?.answers.map((answer, aIndex) => (
                    <p key={`answer_${aIndex}`}>{JSON.stringify(answer)}</p>
                  ))}
                </div>
              </div>
              <div className='flex justify-end gap-[11px]'>
                <div className='w-[35px] h-[35px] bg-[#107CB9] rounded-full flex justify-center items-center'>
                  <PiUploadSimpleBold className='w-[21px] h-[21px]' />
                </div>
                <div className='w-[35px] h-[35px] bg-[#50446A] rounded-full flex justify-center items-center'>
                  <PiUploadSimpleBold className='w-[21px] h-[21px]' />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='flex flex-col gap-4 mb-4 pt-4'>
          <input className='text-white/60 pl-6 py-4 rounded-full bg-[#262626]' placeholder='Company website url' onChange={(e)=>setUrl(e.target.value)}/>
          <div className='flex gap-2.5 w-full'>
            <input className='text-white/60 pl-6 py-4 rounded-full bg-[#262626] w-full' placeholder='Enter your prompt' />
            <div className='w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[#10B981]'>
              {isLoading ?
                <Icons.spinner className="h-5 w-5 animate-spin" />
              :  
                <IoIosSend className='w-5 h-5' onClick={()=>handleSend()}/>
              }
              
            </div>
          </div>
          <p className='text-sm text-center text-white/50'>Please enter the items what you want like name, address etc</p>
        </div>
      </div>
    </div>
  )
}

export default ChatRoom