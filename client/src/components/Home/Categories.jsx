import React, { useEffect } from 'react';
import { useData } from '../../context/DataContext';

const Categories = () => {
  const {addData} = useData();
  const dummyCategories = ["All", "💡 Idea Generation", "🖋️ Naming", "🔣 Logo", "✍️ Domain Names", "💻 Hosting", "📊 Market Research", "❓ Survey", "📌 Wireframing", "🖊️ Design", "📟 Deployment", "📣 Social Tools", "📦 MVP", "📣 Marketing", "✉️ Email Marketing", "📣 Referral", "🧑‍🤝‍🧑 Early Users", "🎬 Presentation", "🗳️ Product Demo", "🎌 Icons", "📷 Stock Images/Videos", "🖼️ Illustrations", "🖌️ Image Editing", "📱 Mobile App", "🖥️ Site Builder", "🤖 API & Automation", "🛍️ Shop", "💳 Payment", "📩 Outsourcing", "📤 Outreach", "✨ CRM", "⚖️ Legal", "👔 Finance", "💴 Rasing Capital", "💼 Investor Relations", "🤲 Raising Money", "🏬 HR", "🤖 Chatbot", "👪 Communities", "📰 Other Directories"];
  const showCategories = ()=>{
    return dummyCategories.map((el,i)=>{
      return <button className="btn btn-category my-2 btn-outline-primary font-weight-bold" key={i}> {el} </button>
    })
  };
  return (
    <div>
      <div className="container">
        {showCategories()}
      </div>
    </div>
  );
};

export default Categories;