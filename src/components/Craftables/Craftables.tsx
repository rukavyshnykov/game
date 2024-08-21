import { useDispatch } from "react-redux"
import { CraftableName, gameActions } from "../../services/gameSlice"

export const Craftables = ({craftable: {craft, exists, usage, repair}, name}: CraftableProps) => {
    const dispatch = useDispatch()

    return (
        <>
            {!exists && 
                <button 
                    onClick={() => {
                        dispatch(gameActions.createCraftable(name))
                        dispatch(gameActions.passDay({days: craft}))
                        dispatch(gameActions.reduceStats({food: craft}))
                    }}
                >
                    Create {name} tool
                </button>
            }
            {
                name === "fishing" && exists && 
                <div>
                    {usage === 12 && <button onClick={() => {
                            dispatch(gameActions.resetCraftable('fishing'))
                            dispatch(gameActions.reduceStats({food: repair!}))
                            dispatch(gameActions.passDay({days: repair!}))
                        }}
                        >Repair</button>
                    }
                    Net - Days used: {usage}
                </div>
            }
        </>
    )
}

type CraftableProps = {
    craftable: Craftable
    name: CraftableName
}

type Craftable = {
    exists: boolean
    craft: number
    broken?: boolean
    usage?: number
    resource?: number
    repair?: number
}