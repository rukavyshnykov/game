import { useSelector } from "react-redux"
import { RootState } from "../../services/store"

export const GameOver = () => {
    const totalDays = useSelector((state: RootState) => state.game.totalDays)

    return (
        <>Congratulations! You have finished the game<br/>It took you {totalDays} days</>
    )
}