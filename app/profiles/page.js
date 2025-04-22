// 'use client'
// import { useState } from "react";
// import axios from "axios";
// import createData from "../actions/createData"

// export default function Home() {
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // try {
//     //   const response = await axios.post("/api/userinfo", {
//     //     title,
//     //     content,
//     //   });
//     //   console.log("Post created:", response.data);
//     //   // Clear form
//     //   setTitle("");
//     //   setContent("");
//     // } catch (error) {
//     //   console.error("Error creating post:", error);
//     // }


//   };

//   return (
//     <div>

//       <form action={createData}  onSubmit={handleSubmit} className="max-w-2/2 bg-gray-400 m-auto p-5">
//         <input
//           type="text"
//           placeholder="your title"
//           value={title}
//           onChange={e => setTitle(e.target.value)}
//           className="p-2 mt-2 border-1"
//         />
//         <br />
//         <textarea
//           placeholder="your content"
//           value={content}
//           onChange={e => setContent(e.target.value)}
//           className="p-2 mt-2 border-1"
//         />
//         <br />
//         <button type="submit" className="p-2 mt-2 border-1">Submit</button>
//       </form>
//     </div>
//   );
// }


"use client"
import { useFormState } from 'react-dom'
import { registerUser } from '../actions/registerUser'

const initialstate={
  success:false,
  error:""
};

export default function Form(){
  const[state,formAction] = useFormState(registerUser, initialstate);
  return (
    <form action={formAction} className='flex flex-col items-center p-2'>
      <input type="text" name="title"  placeholder='Title' className='p-2 border-1 mt-2 w-70'/>
      <input type="text" name="content"  placeholder='content'  className='p-2 border-1 mt-2 w-70'/>
      <button type="submit" className='p-2 border-1 mt-2 w-70'>Submit</button>
     
    </form>
  )
}