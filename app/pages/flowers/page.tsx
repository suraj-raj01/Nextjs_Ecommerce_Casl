'use client'
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import "../cakes/style.css"
import getFlower from '@/app/actions/getcategorydata/getFlowers';
import Category from '@/app/_components/Category';

const getFlowersData = () => {
  const [mydata, setData] = useState<any>([]);
  const fetchData = async () => {
    const data = await getFlower();
    setData(data);
    console.log(data);
  }

  useEffect(() => {
    fetchData();
  }, [])

  const res = mydata.map((key: any) => {
    return (
      <>
        <Card >
          <Image src={key.proimgurl} alt='proimage' height={200} width={300}/>
          <Card.Body className='text-start'>
            <Card.Title>{key.proname}</Card.Title>
            <p className='text-xs'>{key.protitle}</p>
            <p className='text-red-500 font-bold text-2xs'>Price {key.proprice} {" ₹"}</p>
            <Card.Text>
            </Card.Text>
            <Button variant="primary">Add To Cart</Button>
          </Card.Body>
        </Card>
      </>
    )
  })


  return (
    <div>
      <Category/>
      <p className='text-center text-2xl font-bold p-2'>Flowers</p>
      <div id="products" className='flex items-center flex-wrap justify-center gap-3'>
      {res}
      </div>
      <br /><br />
    </div>
  )
}

export default getFlowersData