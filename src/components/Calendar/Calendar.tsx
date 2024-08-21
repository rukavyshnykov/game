import { useSelector } from "react-redux"
import { RootState } from "../../services/store"

export const Calendar = () => {
    const totalDays = useSelector((state: RootState) => state.game.totalDays)

    return (
        <div 
            style={{position: 'absolute', top: '20px', left: '20px'}}
        >
            Day {totalDays === 30 ? 30 : totalDays % 30} of 30
        </div>
    )
}