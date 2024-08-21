import { useDispatch } from "react-redux"
import { gameActions } from "../../services/gameSlice"

export const Housing = ({housing: {build, exists, repair, usage, maintenance}, name}: HousingProps) => {
    const dispatch = useDispatch()

    return (
        <>
            {
                !exists ? 
                (
                    <button onClick={() => {
                        dispatch(gameActions.buildHousing(name))
                        dispatch(gameActions.passDay({days: build}))
                        dispatch(gameActions.reduceStats({food: build}))
                    }}>Build a {name}</button>
                )
                :
                (
                    usage >= repair.longevity ?
                    (
                        <button
                            onClick={() => {
                                dispatch(gameActions.resetHousing(name))
                                dispatch(gameActions.passDay({days: repair.duration}))
                                dispatch(gameActions.reduceStats({food: repair.duration}))
                            }}
                        >
                            Repair
                        </button>
                    )
                    :
                    (
                        <>{name} - Days used: {usage}</>
                    )
                )
            }
            {
                name === 'house' && exists && !maintenance!.done && 
                <button onClick={() => {
                        dispatch(gameActions.maintainHouse())
                        dispatch(gameActions.passDay({days: 5}))
                    }}
                >
                    Maintain
                </button>
            }
        </>
    )
}

type HousingProps = {
    housing: Housing
    name: HousingName
}

type HousingName = 'hut' | 'house'

type Housing = {
    build: number
    repair: {
        duration: number
        longevity: number
    },
    maintenance?: {
        duration: number
        longevity: number
        done: boolean
        usage: number
    },
    exists: boolean
    usage: number
    broken: boolean
}