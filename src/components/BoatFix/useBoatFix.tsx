import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../services/store"

export const useBoatFix = () => {
    const stats = useSelector((state: RootState) => state.game.stats)
    const totalDays = useSelector((state: RootState) => state.game.totalDays)
    const housing = useSelector((state: RootState) => state.game.housing)
    const clothes = useSelector((state: RootState) => state.game.clothes)
    const dispatch = useDispatch()

    const reserveDaysForMaintaining = () => {
        const totalMaintenanceDuration = [
            ...Object.values(clothes)
            .filter(el => el.exists && el.maintenance && el.maintenance.done === false), 
                ...Object.values(housing)
                .filter(el => el.exists && el.maintenance && el.maintenance.done === false)
            ]
                .reduce((a, b) => a + b.maintenance.duration, 0)
        return totalMaintenanceDuration
    }

    return [stats, totalDays, dispatch, reserveDaysForMaintaining] as const
}