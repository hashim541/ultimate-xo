import React, {Dispatch, SetStateAction} from 'react'
import { BoxData, Shapes } from '@/utils/data'
import Image from 'next/image'
import { circle,square, cross, triangle } from '@/utils/data'
import { handelClick, whichShape } from '@/utils/actions'
import Shape from './Shape'

interface Props {
    boxData: BoxData,
    boardData: {
        mode: "normal" | "infinite" | "ai";
        isGameOver: boolean;
        size: number;
        players: Shapes[];
        board: BoxData[][];
        moves: BoxData[];
        winner: string;
    },
    setBoardData: Dispatch<SetStateAction<{
        mode: "normal" | "infinite" | "ai";
        isGameOver: boolean;
        size: number;
        players: Shapes[];
        board: BoxData[][];
        moves: BoxData[];
        winner: string;
    }>>,
    currentPlayer: number,
    setNextPlayer: Dispatch<SetStateAction<number>>
}

const Box = ({
    boxData,
    boardData,
    setBoardData,
    currentPlayer,
    setNextPlayer
}: Props) => {

    const shape = whichShape(boxData.value) || ''

    return (
        
        <div 
            className={`bg-white flex justify-center items-center min-w-16 min-h-16 sm:min-w-24 sm:min-h-24 `}
            onClick={ () => handelClick({
                boxData,
                boardData,
                setBoardData,
                currentPlayer,
                setNextPlayer
            })}    
        >
            {
                boxData.value.length>0 && (
                    <Shape shape={shape} boxData={boxData}/>
                )
            }
            
        </div>
    )
}

export default Box