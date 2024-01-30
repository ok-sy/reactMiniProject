import { useState }  from 'react'
import createStage from '../../gameHelper'
import usePlayer from './usePlayer';

type Props = typeof usePlayer


export default function useStage(Props: Props) {

    const [stage, setStage] = useState(createStage());
    
    return {stage,setStage}
}
