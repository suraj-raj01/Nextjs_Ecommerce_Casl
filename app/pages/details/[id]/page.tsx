'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import getProductDetails from '@/app/actions/getProductDetails';
import Image from 'next/image';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/store';
import { addToCart} from '../../../store/cartSlice';

export default function ProductDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const[details,setDetails] = useState<any>({})
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  const router = useRouter();

  const loadData=async()=>{
    if (id !== undefined) {
      const data = await getProductDetails(id);
      console.log(data);
      setDetails(data||{});
    } else {
      console.error('Invalid ID: ID is undefined or not a number');
    }
  }

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

  useEffect(()=>{
      loadData();
  },[id])

  return (
    <div>
      <div className='w-full h-auto flex items-start content-between p-5'>
        <div className='flex items-center content-center'>
          {details?.users?.proimgurl?(

            <Image src={details?.users?.proimgurl} alt='proimage' height={600} width={600}/>
          ):(
            "Image not found"
          )}
        </div>
        <div className='flex flex-col items-start content-between w-screen pl-10 h-96'>
        <p className='font-bold text-4xl'>{details?.users?.proname}</p>
        <p className='font-bold'>Description</p>
        <p className='h-auto'>{details?.users?.prodesc}</p>
        <p className='font-bold'>Details</p>
        <p className='h-auto'>{details?.users?.proinfo}</p>
        <p className='pt-2 font-bold text-red-700 text-2xl'>Price : {details?.users?.proprice}</p>
        <br />
        
          <div className='flex gap-3 items-start content-center'>
          <Button size='sm' variant='success'
           onClick={() => {
            addDataToCart(
              details.id,
              details.proname,
              details.protitle,
              details.proprice,
              details.prodesc,
              details.proCategory,
              details.proinfo,
              details.proimgurl
            )
        }}
          >Add To Cart</Button>
          <Button size='sm' variant='success' onClick={()=>{router.push("/pages/checkout")}}>Buy Now</Button>
          </div>

        </div>
      </div>
      
    </div>
  );
}
