'use client'
import React, { useEffect, useState } from 'react'
import getCakes from '@/app/actions/getcategorydata/getCakes'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'next/image';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { addToCart, addToLike } from '../../store/cartSlice';
import Category from '@/app/_components/Category';


const ProductCard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mydata, setData] = useState<any>([]);

  
  const fetchData = async () => {
    const data = await getCakes();
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




  return (
    <div>
      <Category/>
      <p className='text-center text-2xl font-bold p-2'>Cakes</p>
      <div id='products' className='flex items-center flex-wrap justify-center gap-3'>
      {mydata?.map((item:any,index:number)=>(
        <Card style={{width:'300px'}} key={index}>
          <Image src={item.proimgurl} alt='proimage' height={200} width={300}/>
          <Card.Body>
            <Card.Title>{item.proname}</Card.Title>
            <p>{item.protitle}</p>
            <p className='text-red-500 font-bold'>Price {item.proprice} {" ₹"}</p>
            <Card.Text>
            </Card.Text>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <Button size='sm' variant="primary"
             onClick={() => {
              addDataToCart(
                item.id,
                item.proname,
                item.protitle,
                item.proprice,
                item.prodesc,
                item.proCategory,
                item.proinfo,
                item.proimgurl
              )
          }}
            >Add To Cart</Button>
            <FaRegHeart id='like' className='text-2xl' 
            onClick={() => {
              addDataToLike(
                item.id,
                item.proname,
                item.protitle,
                item.proprice,
                item.prodesc,
                item.proCategory,
                item.proinfo,
                item.proimgurl
              )
          }}/>
            <FaHeart id='dislike' className='text-2xl ' style={{display:'none'}}/>
            </div>
          </Card.Body>
        </Card>
      ))}
      </div>
      <br />
      <br />
    </div>
  )
}

export default ProductCard;