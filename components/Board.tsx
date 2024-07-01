'use client'

import React, { useState } from 'react'
import { renderBoard, whichShape } from '@/utils/actions'
import { BoxData, Settings, Shapes, playersCount } from '@/utils/data'
import Box from './Box'
import Image from 'next/image'


const Board = (
  {mode, players}: Settings
) => {


  const [ boardData, setBoardData ] = useState<{
    mode: "normal" | "infinite" | "ai";
    isGameOver: boolean;
    size: number;
    players: Shapes[];
    board: BoxData[][];
    moves: BoxData[];
    winner: string;
  }>({
    mode: mode,
    isGameOver: false,
    size: playersCount[players].length+1,
    players: playersCount[players],
    board: renderBoard(playersCount[players].length+1),
    moves:[],
    winner: ''
  })

  const [currentPlayer, setNextPlayer] = useState(0)



  return (
    <section className='p-5 flex flex-col items-center'>

      { boardData.winner.length == 0 ?(
        <div className='mb-20 flex items-end text-3xl gap-2'>
          <Image
            src={boardData.players[currentPlayer].image}
            alt='shape'
            width={40}
            height={40}
          />'s Turn
        </div>) : (
        <div className='mb-20 flex items-end text-3xl gap-2'>
          <Image
            src={whichShape(boardData.winner).image}
            alt='shape'
            width={40}
            height={40}
          />'s winner
        </div>
      )}

      <div className='bg-black flex flex-col gap-1 sm:gap-[6px]'>
        {
          boardData.board.map( (eachRow, index) => (
            <div key={index} className='flex gap-1 sm:gap-[6px]'>{
              eachRow.map(eachBox => (
                <Box 
                  key={eachBox.position.i+eachBox.position.j} 
                  boxData={eachBox} 
                  boardData={boardData}
                  setBoardData={setBoardData}
                  currentPlayer={currentPlayer}
                  setNextPlayer={setNextPlayer}
                />
              ))
            }</div>
          ))
        }
      </div>
        <p className='mt-16'>Reload to play again</p>
    </section>
  )
}

export default Board