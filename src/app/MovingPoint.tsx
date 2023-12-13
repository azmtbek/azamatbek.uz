'use client'
import React, { useState,useEffect, useRef } from 'react';
import Image from 'next/image'
import Sword from '@/icon/sword';

export default function MovingDot({ children }: { children: React.ReactNode; }) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  });
  // const [y,setY] = useState(0)
  // const ref = useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   // setY(position.y);
  //   let y = position.y;

  //   const onScroll = (e: any) => {
  //     // const rect = (ref.current as HTMLDivElement).getBoundingClientRect()
  //     // console.log(rect)
  //     // e.pageX
  //    console.log(position)
  //     setPosition(prev=>({
  //     x: prev.x,
  //     y: prev.y
  //   }));
  //   }
  //    window.addEventListener("scroll", onScroll);

  //   return () => window.removeEventListener("scroll", onScroll);
  // },[])

  return (<div
    onPointerMove={(e) => {
    console.log(position)
    setPosition({
      x: e.clientX,
      y: e.clientY
    });
  }}
    //  onMouseMove={(e:any) => {
    //   console.log(position)
    // setPosition({
    //   x: e.clientX,
    //   y: e.clientY
    // });
    // }}
    // ref={ref}
    style={{
      position: 'relative',
      // cursor:'none'
      }}>
    {/* <Sword */}
     <div
      style={{
        // position: 'absolute',
        transform: `translate(${position.x}px, ${position.y}px)`,
        left: 1,
        top: 1,
      }}
      className='absolute dark:fill-red-900 fill-red-300 w-500 h-500 z-50'
    />
    {children}
  </div>
  )
}
