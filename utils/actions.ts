import {Dispatch, SetStateAction} from 'react'
import { BoxData, Shapes } from '@/utils/data'
import { circle,square, cross, triangle } from '@/utils/data'

export const renderBoard = (playersCount: number) => {

    const board: BoxData[][] = []

    for (let i: number = 0; i < playersCount; i++) {
        board[i] = []
        for (let j: number = 0; j < playersCount; j++) {
            let box: BoxData ={
                position:{i, j},
                value: '',
                opacity:false
            }
            board[i][j] = box
        }
    }
    
    return board
}

export const whichShape = (shape: string) => {
    if(shape == 'circle') return circle
    else if(shape == 'square') return square
    else if(shape == 'triangle') return triangle
    else return cross
}

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

export const handelClick = ({
    boxData,
    boardData,
    setBoardData,
    currentPlayer,
    setNextPlayer
}: Props) => {

    if((boxData.value != '' && !boxData.opacity) || boardData.isGameOver) return


    const currentShape = boardData.players[currentPlayer].name

    const updatedBoard = boardData.board
    
    
    
    if(boardData.mode == 'infinite' && boardData.moves.length+1 >= boardData.players.length*3){
        updatedBoard[boardData.moves[0].position.i][boardData.moves[0].position.j].opacity=true
    }
    
    
    // add moves
    let newMove: BoxData = {
        position: boxData.position,
        value: currentShape,
        opacity:false
    } 
    let newMoves: BoxData[] = boardData.moves
    
    newMoves.push(newMove)
    if(boardData.mode == 'infinite' && boardData.moves.length > boardData.players.length*3){
        updatedBoard[boardData.moves[0].position.i][boardData.moves[0].position.j].value= ''
        updatedBoard[boardData.moves[0].position.i][boardData.moves[0].position.j].opacity= false
        updatedBoard[boardData.moves[1].position.i][boardData.moves[1].position.j].opacity = true
        newMoves.shift();
    }
    
    updatedBoard[boxData.position.i][boxData.position.j].value=currentShape
   

    setBoardData({...boardData, board: updatedBoard, moves:newMoves})
    const audio = new Audio('/assets/sound/beep.mp3')
    audio.volume = 0.5
    audio.play()

    if (boardData.moves.length == boardData.size*boardData.size){
        setBoardData({...boardData,isGameOver: true})
    }

    // check for win
    const nextPlayer = currentPlayer == boardData.players.length-1 ? 0 : currentPlayer+1

    setNextPlayer(nextPlayer)
    
    const updatedBoardData = checkForWinner({
        boxData:boxData, 
        boardData: boardData,
        setBoardData: setBoardData,     
        currentPlayer :currentPlayer
    })
    
    setBoardData(updatedBoardData)
}




interface Props2 {
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
}
const checkForWinner= ( {boxData, boardData, setBoardData, currentPlayer}: Props2) => {
    const { board, size } = boardData;
    const copyBoardData = { ...boardData };

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
        // Check horizontal line
            if (j - 1 >= 0 && j + 1 < size) {
                if (board[i][j - 1].value && board[i][j].value && board[i][j + 1].value) {
                    if ( board[i][j - 1].value === board[i][j].value && board[i][j].value === board[i][j + 1].value ) {
                        copyBoardData.winner = board[i][j].value;
                        break;
                    }
                }
            }

            // Check vertical line
            if (i - 1 >= 0 && i + 1 < size) {
                if (board[i - 1][j].value && board[i][j].value && board[i + 1][j].value) {
                    if ( board[i - 1][j].value === board[i][j].value && board[i][j].value === board[i + 1][j].value ) {
                        copyBoardData.winner = board[i][j].value;
                        break;
                    }
                }
            }

            // Check diagonals
            if (i - 1 >= 0 && j - 1 >= 0 && i + 1 < size && j + 1 < size) {
                // Check \ diagonal
                if (board[i - 1][j - 1].value && board[i][j].value && board[i + 1][j + 1].value) {
                    if ( board[i - 1][j - 1].value === board[i][j].value && board[i][j].value === board[i + 1][j + 1].value ) {
                        copyBoardData.winner = board[i][j].value;
                        break;
                    }
                }

                // Check / diagonal
                if (board[i - 1][j + 1].value && board[i][j].value && board[i + 1][j - 1].value) {
                    if ( board[i - 1][j + 1].value === board[i][j].value && board[i][j].value === board[i + 1][j - 1].value ) {
                        copyBoardData.winner = board[i][j].value;
                        break;
                    }
                }

            }

        }
    }

    if (copyBoardData.winner) {
        copyBoardData.isGameOver = true;
        console.log(copyBoardData.winner);
    }

  return copyBoardData;
}