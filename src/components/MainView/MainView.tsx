import { Controls } from "../Controls/Controls"
import { actions } from "../../actions/actions"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../services/store"
import { gameActions } from "../../services/gameSlice"
import { isEnoughStats } from "../../utils/isEnoughStats"
import { Calendar } from "../Calendar/Calendar"
import { StatsBar } from "../StatsBar/StatsBar"
import { Craftables } from "../Craftables/Craftables"
import { Line } from "../Line/Line"
import { GameOver } from "../GameOver/GameOver"
import { BoatFix } from "../BoatFix/BoatFix"
import { Housing } from "../Housing/Housing"

export const MainView = () => {
    const boat = useSelector((state: RootState) => state.game.boat)
    const craftables = useSelector((state: RootState) => state.game.craftables)
    const housing = useSelector((state: RootState) => state.game.housing)
    const clothes = useSelector((state: RootState) => state.game.clothes)
    const dispatch = useDispatch()

    

    if(boat >= 100) return <GameOver />

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <StatsBar />
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <BoatFix />
                <Line />
                <div>
                    <Controls buttons={actions.food} craftables={craftables} />
                </div>
                <Craftables name="fishing" craftable={craftables.fishing}/>
                <Craftables name="hunting" craftable={craftables.hunting}/>
                <Craftables name="farm" craftable={craftables.farm}/>
                <Line />
                <Housing housing={housing.hut} name="hut"/>
                <Housing housing={housing.house} name="house"/>
                <Line />
                {
                    !clothes.set.exists ? 
                    (
                        <button onClick={() => {
                            dispatch(gameActions.craftSet())
                            dispatch(gameActions.passDay({days: clothes.set.build}))
                            dispatch(gameActions.reduceStats({food: clothes.set.build}))
                        }}>Craft a set of clothes</button>
                    )
                    :
                    (
                        clothes.set.usage >= clothes.set.repair.longevity ?
                        (
                            <button
                                onClick={() => {
                                    dispatch(gameActions.resetSet())
                                    dispatch(gameActions.passDay({days: clothes.set.repair.duration}))
                                    dispatch(gameActions.reduceStats({food: clothes.set.repair.duration}))
                                }}
                            >
                                Repair
                            </button>
                        )
                        :
                        (
                            <>Set - Days used: {clothes.set.usage}</>
                        )
                    )
                }
                {
                    clothes.set.exists && !clothes.set.maintenance.done && <button onClick={() => {
                        dispatch(gameActions.maintainSet())
                        dispatch(gameActions.passDay({days: clothes.set.maintenance.duration}))
                    }}>Maintain</button>
                }
                <Calendar />
            </div>
        </div>
    )
}