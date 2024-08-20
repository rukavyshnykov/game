import { useDispatch } from "react-redux"
import { gameActions } from "../../services/gameSlice"

type Button = {
    name: string
    duration: number
    profit: number
}

type Craftables = {
    farm: {
        exists: boolean,
        craft: number
    },
    hunting: {
        exists: boolean,
        craft: number
    },
    fishing: {
        exists: boolean,
        craft: number,
        broken: boolean,
        usage: number
        resource: number
    }
}

type ButtonsSetProps = {
    buttons: Button[],
    craftables: Craftables
}

export const Controls = ( {buttons, craftables}: ButtonsSetProps ) => {
    const dispatch = useDispatch()
    return (
        <div>
            {buttons.map(b => (
                <button 
                    key={b.name} 
                    onClick={() => {
                            if(craftables[b.name as keyof typeof craftables] && craftables[b.name].usage != 12) {
                                dispatch(gameActions.useCraftable(b.name))
                                dispatch(gameActions.passDay({days: b.duration})) 
                                dispatch(gameActions.addStats({food: b.profit}))
                                dispatch(gameActions.reduceStats({food: b.duration}))
                            }
                            else {
                                dispatch(gameActions.passDay({days: b.duration})) 
                                dispatch(gameActions.addStats({food: b.profit}))
                                dispatch(gameActions.reduceStats({food: b.duration}))
                            }
                        }
                    }
                    disabled={craftables[b.name as keyof typeof craftables] ? craftables[b.name as keyof typeof craftables].exists ? craftables[b.name].broken ? true : false : true : false}
                    style={{border: '1px solid black', padding: '5px 10px', fontSize: '16px', textAlign: 'center', outline: 'unset'}}
                >
                    {b.name}
                </button>
            ))}
        </div>
    )
}