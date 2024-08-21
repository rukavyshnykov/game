import { isEnoughStats } from "../../utils/isEnoughStats"
import { gameActions } from "../../services/gameSlice"
import { useBoatFix } from "./useBoatFix"

export const BoatFix = () => {
    
    const [stats, totalDays, dispatch, reserveDaysForMaintaining] = useBoatFix()

    return (
        <button
            onClick={() => {
                dispatch(gameActions.fixBoat())
                dispatch(gameActions.passDay({days: 1}))
                dispatch(gameActions.reduceStats({food: 1}))
            }}
            disabled={!isEnoughStats(stats) || ((30 - (totalDays % 30)) <= reserveDaysForMaintaining())}
        >
            Fix a boat
        </button>
    )
}