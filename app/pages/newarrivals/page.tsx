'use client'
import React, { useEffect, useState } from 'react'
import newArrivals from '@/app/actions/getcategorydata/newArrival';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import "../cakes/style.css"

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addToCart, addToLike } from '../../store/cartSlice';
import Category from '@/app/_components/Category';


const NewArrivals: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mydata, setData] = useState<any>([]);

  
  const fetchData = async () => {
    const data = await newArrivals();
    setData(data);
  }

  useEffect(() => {
    fetchData();
  }, [])


  const addDataToCart = (id: any,proname: any,protitle: any,proprice: any,prodesc: any,proCategory: any,proinfo: any,proimgurl: any) =>{
    dispatch(
      addToCart({
        id:id,
        proname:proname,
        protitle:protitle,
        proprice:proprice,
        prodesc:prodesc,
        proCategory:proCategory,
        proinfo:proinfo,
        proimgurl:proimgurl,
        quantity: 1,
      })
    )
  }
  const addDataToLike = (id: any,proname: any,protitle: any,proprice: any,prodesc: any,proCategory: any,proinfo: any,proimgurl: any) =>{
    dispatch(
      addToLike({
        id:id,
        proname:proname,
        protitle:protitle,
        proprice:proprice,
        prodesc:prodesc,
        proCategory:proCategory,
        proinfo:proinfo,
        proimgurl:proimgurl,
        quantity: 1,
      })
    )
  }



  const res = mydata.map((key: any,index:number) => {
    return (
      <>
        <Card style={{width:'300px'}}>
          <Image src={key.proimgurl} alt='proimage' height={200} width={300}/>
          <Card.Body>
            <Card.Title>{key.proname}</Card.Title>
            <p>{key.protitle}</p>
            <p className='text-red-500 font-bold'>Price {key.proprice} {" ₹"}</p>
            <Card.Text>
            </Card.Text>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <Button size='sm' variant="primary"
             onClick={() => {
              addDataToCart(
                key.id,
                key.proname,
                key.protitle,
                key.proprice,
                key.prodesc,
                key.proCategory,
                key.proinfo,
                key.proimgurl
              )
          }}
            >Add To Cart</Button>
            <FaRegHeart id='like' className='text-2xl' 
            onClick={() => {
              addDataToLike(
                key.id,
                key.proname,
                key.protitle,
                key.proprice,
                key.prodesc,
                key.proCategory,
                key.proinfo,
                key.proimgurl
              )
          }}/>
            <FaHeart id='dislike' className='text-2xl ' style={{display:'none'}}/>
            </div>
          </Card.Body>
        </Card>
      </>
    )
  })


  return (
    <div>
      <Category/>
      <p className='text-center text-2xl font-bold p-2'>NewArrivals</p>
      <div id='products' className='flex items-center flex-wrap justify-center gap-3'>
      {res}
      </div>
      <br />
      <br />
    </div>
  )
}

export default NewArrivals;