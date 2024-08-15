import { UnknownAction } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"
import { gameActions } from "../../services/gameSlice"

type Button = {
    name: string
    duration: number
    callback?: UnknownAction
}

type ButtonsSetProps = {
    buttons: Button[]
}

export const Controls = ( {buttons}: ButtonsSetProps ) => {
    const dispatch = useDispatch()

    return (
        <div>
            {buttons.map(b => (
                <button 
                    key={b.name} 
                    onClick={() => {
                            dispatch(b.callback)
                            dispatch(gameActions.passDay({days: b.duration})) 
                        }
                    }
                    style={{border: '1px solid black', padding: '5px 10px', fontSize: '16px', textAlign: 'center', outline: 'unset'}}
                >
                    {b.name}
                </button>
            ))}
        </div>
    )
}