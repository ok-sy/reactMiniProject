import { useEffect, useState }  from 'react'
import createStage from '../../gameHelper'
import usePlayer from './usePlayer';

type playerProps = {    
    pos: {
        x: number;
        y: number;
    };
    tetromino: number[][] | (string | number)[][] | string[][];
    collided: boolean;
}

export default function useStage(player:playerProps,resetPlayer:()=>void) {
    
    const {playerState,updatePlayerPos }=usePlayer()
    const [stage, setStage] = useState(createStage());
    
    
    useEffect(() => {
        console.log('값 바뀌네???')
        const updateStage = (prevStage: any[][]) => {
            // first flush the stage
            const newStage = prevStage.map((row: string[][]) =>
                row.map((cell: string[]) => (cell[1] === 'clear' ? [0, 'clear'] : cell))
                
            )
            // then draw the tetromino
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        newStage[y + player.pos.y][x + player.pos.x] = [
                            value,
                            `${player.collided ? ' merged' :'clear'}`
                        ]
                    }
                })
            })
            return newStage
        };
        setStage(prev => updateStage(prev))

    },[player.collided, player.pos.x, player.pos.y, player.tetromino])
    console.log(player)
    return {stage,setStage}
}
