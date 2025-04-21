'use client';
import axios from 'axios';
import type { NextPage } from 'next';

const Page: NextPage = async () => {

  const loadData = async () => {
    let api = "/api/userinfo";
    try {
      const res = await axios.get(api);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Userinfo Page</h1>
      <button onClick={loadData} className='text-bold bg-black text-white p-2'>Load Data</button>
    </div>
  );
};

export default Page;