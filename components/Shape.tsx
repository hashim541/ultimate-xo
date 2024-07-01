import { BoxData, Shapes } from '@/utils/data'
import Image from 'next/image'
import React from 'react'

const Shape = ({shape, boxData}: {shape: Shapes, boxData: BoxData}) => {
  return (
    
        <Image
            src={shape.image}
            alt={shape.name}
            width={56}
            height={56}
            className={`w-[75%] ${boxData.opacity && 'opacity-45'}`}
        />
  )
}

export default Shape