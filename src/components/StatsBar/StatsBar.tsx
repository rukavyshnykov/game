import { useSelector } from "react-redux"
import { RootState } from "../../services/store"

export const StatsBar = () => {
    const stats = useSelector((state: RootState) => state.game.stats)
    const boat = useSelector((state: RootState) => state.game.boat)
    const totalDays = useSelector((state: RootState) => state.game.totalDays)
    const housing = useSelector((state: RootState) => state.game.housing)

    const findHousing = () => {
        for(const prop in housing) {
            if(housing[prop as keyof typeof housing].exists) {
                return prop
            }
        }
    }
    
    return (
        <>
            <div>Stats</div>
            <div>food: {stats.food}</div>
            <div>
                housing: {stats.housing ? 
                    <>Present | <span>Current: {findHousing()}</span></> 
                    :
                    'Absent'
                }
            </div>
            <div>cloth: {stats.cloth ? 'Present' : 'Absent'}</div>
            <div>
                <p>Boat has been repaired: {boat} days</p>
                <p>Total time passed: {totalDays} days</p>
            </div>
        </>
    )
}