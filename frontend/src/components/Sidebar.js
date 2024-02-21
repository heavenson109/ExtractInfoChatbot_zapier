import React from 'react'
import { RiMessage2Line } from "react-icons/ri";

const MOCK_DATA = [
  {
    title: "Today",
    items: ["westgatehonda.ca", "toyota-town.com", "cmpauto.com"]
  }, {
    title: "Sunday, 11 Feburary",
    items: ["oregansbmw.com", "watfordford.com"]
  }, {
    title: "Thursday, 30 January",
    items: ["openai.com", "amazon.com", "westgatehonda.ca"]
  }, {
    title: "Monday, 10 January",
    items: ["toyota-town.com", "oreganbmw.com", "cmpauto.com"]
  }
]

const Sidebar = () => {
  const titleClass = "text-sm text-white/60 mb-4"
  return (
    <div className='h-full pb-[86px]'>
      <div className='bg-[#171717] rounded-3xl p-5 text-white flex flex-col gap-5 h-full'>
        {MOCK_DATA.map((item, index) => (
          <div key={`sidebar_${index}`}>
            <p className={titleClass}>{item.title}</p>
            <div className='pl-2 flex flex-col gap-3.5'>
              {item.items.map((name, nIndex) => (
                <div key={`item_${nIndex}`} className='flex gap-2 items-center'>
                  <RiMessage2Line />
                  <p>{name}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Sidebar