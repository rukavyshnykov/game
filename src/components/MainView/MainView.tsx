import { Controls } from "../Controls/Controls"
import { actions } from "../../actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../services/store"
import { gameActions } from "../../services/gameSlice"
import { isEnoughStats } from "../../utils/isEnoughStats"

export const MainView = () => {
    const stats = useSelector((state: RootState) => state.game.stats)
    const boat = useSelector((state: RootState) => state.game.boat)
    const totalDays = useSelector((state: RootState) => state.game.totalDays)
    const craftables = useSelector((state: RootState) => state.game.craftables)
    const dispatch = useDispatch()

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div>Stats</div>
            <div>food: {stats.food}</div>
            <div>
                <p>Boat has been repaired: {boat} days</p>
                <p>Total time passed: {totalDays} days</p>
            </div>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <button onClick={() => {
                    if(isEnoughStats(stats.food)) {
                        dispatch(gameActions.fixBoat())
                        dispatch(gameActions.passDay({days: 1}))
                    }
                }}>Fix a boat</button>
                <div><Controls buttons={actions.food} craftables={craftables} /></div>
                <div>
                    {!craftables.fishing.exists && <button onClick={() => {
                        dispatch(gameActions.createCraftable('fishing'))
                        dispatch(gameActions.passDay({days: 10}))
                        dispatch(gameActions.reduceStats({food: 10}))
                    }}>Craft a net</button>}
                    {craftables.fishing.exists && 
                        <div>
                            {craftables.fishing.usage === 12 && <button onClick={() => {
                                    dispatch(gameActions.resetCraftable('fishing'))
                                    dispatch(gameActions.reduceStats({food: 7}))
                                    dispatch(gameActions.passDay({days: 7}))
                                }}
                                >Repair</button>}
                            Days used: {craftables.fishing.usage}
                        </div>}
                </div>
                <button onClick={() => {
                    dispatch(gameActions.createCraftable('hunting'))
                    dispatch(gameActions.passDay({days: 22}))
                    dispatch(gameActions.reduceStats({food: 22}))
                }}>Craft hunting tools</button>
                <button onClick={() => {
                    dispatch(gameActions.createCraftable('farm'))
                    dispatch(gameActions.passDay({days: 20}))
                    dispatch(gameActions.reduceStats({food: 20}))
                }}>Establish a farm</button>
            </div>
        </div>
    )
}