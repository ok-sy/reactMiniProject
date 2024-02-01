import { useCallback, useState } from 'react'
import { TETROMINOS ,randomTetromino } from '../../tetrominos'
import { STAGE_WIDTH } from '../../gameHelper'



// export default function usePlayer() {

export default function usePlayer() {
    const [player, setPlayer] = useState({
        pos: { x: 0, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false
    })
    
    const playerState = useState()
    const updatePlayerPos = ({ x, y, collided }: { x: number, y: number, collided: boolean }) => {
        setPlayer(prev => ({
            ...prev,
            pos: { x: (prev.pos.x += x), y: (prev.pos.y) },
            collided,
        }))
    }
    const {shape,color} = randomTetromino()
    const resetPlayer = useCallback(() => {
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
            tetromino: shape,
            collided: false
        })
    }, [])
    return {player, playerState,resetPlayer, updatePlayerPos}
        } 
    
    


