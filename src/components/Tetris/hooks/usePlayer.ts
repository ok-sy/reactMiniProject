import { useState } from 'react'
import { randomTetromino } from '../../tetrominos'



export default function usePlayer() {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided : false
    }) 
    
    const playerState = useState()
    
    
    return {
        player
        } 
    
    
}

