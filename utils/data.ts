import circleSvg from '../public/assets/circle.svg'
import crossSvg from '../public/assets/cross.svg'
import squareSvg from '../public/assets/square.svg'
import triangleSvg from '../public/assets/triangle.svg'

export type Shapes = {
    name: string,
    image: any
}

export interface Settings {
    mode: 'normal' | 'infinite' | 'ai',
    players: '2' | '3' | '4'
}



export const circle: Shapes = {
    name: 'circle',
    image:circleSvg
}
export const square: Shapes = {
    name: 'square',
    image: squareSvg
}
export const cross: Shapes = {
    name: 'cross',
    image:crossSvg
}
export const triangle: Shapes = {
    name: 'triangle',
    image: triangleSvg
}

export const playersCount = {
    '2': [cross, circle],
    '3': [cross, circle, triangle],
    '4': [cross, circle, triangle, square]
}

export type BoxData = {
    position: {
        i: number,
        j: number
    }
    value: string,
    opacity: boolean
}