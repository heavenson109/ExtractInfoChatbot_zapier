import React, { useEffect, useState } from 'react'
import { RxPencil2 } from "react-icons/rx";
import { PiUploadSimpleBold } from "react-icons/pi";
import { IoIosSend } from "react-icons/io";
import logoColorSVG from '../assets/logos/TheMark-Logo-Icon-Colour.svg';
import axios from 'axios';
import { Loader2 } from 'lucide-react'
import { RiMessage2Line } from "react-icons/ri";

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
  }
]

const MOCK_DATA = [
  {
    title: "Companies",
    items: ["londonhonda.com", "sterlinghonda.com", "cmpauto.com"],
    contents: ["https://www.londonhonda.com/about-us/staff/", "https://www.sterlinghonda.com/about-us/staff/", "https://www.cmpauto.com/staff/"]
  }, {
    title: "Information column",
    items: ["first name, last name..."],
    contents: ["first name, last name, email, role, phone_number"]
  }, {
    title: "Targets",
    items: ["Dealer principal, General Manager..."],
    contents: ["Dealer principal, General Manager, General Sales Manager, New car sales Manager, New vehicle Sales Manager, Sales Manager, New car sales Manager, New vehicle sales Manager, Sales Manager, Fixed Operations Manager, Service Manager, President, Voice president"]
  }
]

const ChatRoom = () => {
  const [url, setUrl] = useState("")
  const [infoCol, setInfoCol] = useState("")
  const [target, setTarget] = useState("")
  const [chatHistory, setChatHistory] = useState(QAS)
  const [isLoading, setIsLoading] = useState(false)

  const setPrompts = (content, title) => {
    switch (title) {
      case 'Companies':
        setUrl(content)
        break;
      case "Information column":
        setInfoCol(content)
        break;
      default:
        setTarget(content)
    }

  }

  const handleExtraction = async () => {
    setIsLoading(true)

    const data = {
      url,
      infoCol
    }

    const domain ="https://extract-info-chatbot-zapier.vercel.app"
    const testDomain="http://localhost:8000"

    await axios.post(`${domain}/api/extract`, data)
      .then((response) => {
        setIsLoading(false)
        setChatHistory([...chatHistory, { question: infoCol, answers: response.data }])
      })
  }

  const handleFindRelevant = async () => {
    setIsLoading(true)

    const data = {
      // target: JSON.stringify(chatHistory[chatHistory.length-1].answers)+target
      target
    }

    await axios.post(`http://localhost:8000/api/relevant`, data)
      .then((response) => {
        setIsLoading(false)
        const clearResponse = response.data.replace(/[\n\\]/g, '')
        const responseArray = JSON.parse(clearResponse)
        setChatHistory([...chatHistory, { question: infoCol, answers: responseArray }])
      })
  }

  useEffect(() => {
    console.log(chatHistory, "----------Here's chat history")
  }, [chatHistory])

  return (
    <div className="flex flex-row gap-4 h-full">
      <div className="min-w-[300px]">
        <div className='h-full pb-[86px]'>
          <div className='bg-[#171717] rounded-3xl p-5 text-white flex flex-col gap-5 h-full'>
            {MOCK_DATA.map((item, index) => (
              <div key={`sidebar_${index}`}>
                <p className="text-sm text-white/60 mb-4">{item.title}</p>
                <div className='pl-2 flex flex-col gap-3.5'>
                  {item.items.map((name, nIndex) => (
                    <div key={`item_${nIndex}`} className='flex gap-2 items-center'>
                      <RiMessage2Line />
                      <p onClick={() => { setPrompts(item.contents[nIndex], item.title) }}>{name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='h-full pb-[86px] text-white w-full'>
        <div className='bg-[#171717] rounded-3xl px-[20px] lg:px-[40px] pt-6 h-full flex flex-col justify-between'>
          <div className='flex flex-col overflow-y-auto px-2 scrollbar-thin scrollbar-dark'>
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
            <input className='text-white/60 pl-6 py-4 rounded-full bg-[#262626]' placeholder='Company website url' onChange={(e) => setUrl(e.target.value)} value={url} />
            <div className='flex gap-2.5 w-full'>
              <input className='text-white/60 pl-6 py-4 rounded-full bg-[#262626] w-full' placeholder='Enter infomation column' onChange={(e) => setInfoCol(e.target.value)} value={infoCol} />
              <div className='w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[#10B981]'>
                {isLoading ?
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                  :
                  <IoIosSend className='w-5 h-5' onClick={() => handleExtraction()} />
                }
              </div>
            </div>
            <div className='flex gap-2.5 w-full'>
              <input className='text-white/60 pl-6 py-4 rounded-full bg-[#262626] w-full' placeholder='Enter your target' onChange={(e) => setTarget(e.target.value)} value={target} />
              <div className='w-[52px] h-[52px] rounded-full flex items-center justify-center bg-[#8B0000]'>
                {isLoading ?
                  <Icons.spinner className="h-5 w-5 animate-spin" />
                  :
                  <IoIosSend className='w-5 h-5' onClick={() => handleFindRelevant()} />
                }
              </div>
            </div>

            <p className='text-sm text-center text-white/50'>Please enter the items what you want like name, address etc</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export default ChatRoom