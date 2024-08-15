import { Controls } from "../Controls/Controls"
import { actions } from "../../actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../services/store"
import { gameActions } from "../../services/gameSlice"

export const MainView = () => {
    const stats = useSelector((state: RootState) => state.game.stats)
    const boat = useSelector((state: RootState) => state.game.boat)
    const totalDays = useSelector((state: RootState) => state.game.totalDays)
    const dispatch = useDispatch()

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>Stats</div>
            <div>food: {stats.food}</div>
            {/* <div>housing: {stats.housing}</div>
            <div>cloth: {stats.cloth}</div> */}
            <div>
                <p>Boat has been repaired: {boat} days</p>
                <p>Total time passed: {totalDays} days</p>
            </div>
            <div>
                <button onClick={() => {
                    dispatch(gameActions.fixBoat())
                    dispatch(gameActions.passDay({days: 1}))
                }}>Fix a boat</button>
                {/* <div><Controls buttons={actions.boat}/></div> */}
                <div><Controls buttons={actions.food}/></div>
                <div><Controls buttons={actions.housing}/></div>
                <div><Controls buttons={actions.cloth}/></div>
            </div>
        </div>
    )
}