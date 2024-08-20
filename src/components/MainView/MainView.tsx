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
    const housing = useSelector((state: RootState) => state.game.housing)
    const dispatch = useDispatch()

    const findHousing = () => {
        for(const prop in housing) {
            if(housing[prop as keyof typeof housing].exists) {
                return prop
            }
        }
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
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
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <button
                    onClick={() => {
                        dispatch(gameActions.fixBoat())
                        dispatch(gameActions.passDay({days: 1}))
                        dispatch(gameActions.reduceStats({food: 1}))
                    }}
                    disabled={!isEnoughStats(stats) || housing.house.exists && ((30 - (totalDays % 30)) < housing.house.maintenance.duration)}
                >Fix a boat</button>
                <hr style={{width: '100%'}}/>
                <div>
                    <Controls buttons={actions.food} craftables={craftables} />
                </div>
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
                        Net - Days used: {craftables.fishing.usage}
                    </div>
                }
                {!craftables.hunting.exists && <button onClick={() => {
                    dispatch(gameActions.createCraftable('hunting'))
                    dispatch(gameActions.passDay({days: 22}))
                    dispatch(gameActions.reduceStats({food: 22}))
                }}>Craft hunting tools</button>}
                {!craftables.farm.exists && <button onClick={() => {
                    dispatch(gameActions.createCraftable('farm'))
                    dispatch(gameActions.passDay({days: 20}))
                    dispatch(gameActions.reduceStats({food: 20}))
                }}>Establish a farm</button>}
                <hr style={{width: '100%'}}/>
                {
                    !housing.hut.exists ? 
                    (
                        <button onClick={() => {
                            dispatch(gameActions.buildHousing('hut'))
                            dispatch(gameActions.passDay({days: 1}))
                            dispatch(gameActions.reduceStats({food: 1}))
                        }}>Arrange a hut</button>
                    )
                    :
                    (
                        housing.hut.usage >= housing.hut.repair.longevity ?
                        (
                            <button
                                onClick={() => {
                                    dispatch(gameActions.resetHousing('hut'))
                                    dispatch(gameActions.passDay({days: 1}))
                                    dispatch(gameActions.reduceStats({food: 1}))
                                }}
                            >
                                Repair
                            </button>
                        )
                        :
                        (
                            <>Hut - Days used: {housing.hut.usage}</>
                        )
                    )
                }
                {
                    !housing.house.exists ? 
                    (
                        <button onClick={() => {
                            dispatch(gameActions.buildHousing('house'))
                            dispatch(gameActions.passDay({days: 19}))
                            dispatch(gameActions.reduceStats({food: 19}))
                        }}>Build a house</button>
                    )
                    :
                    (
                        housing.house.usage >= housing.house.repair.longevity ?
                        (
                            <button
                                onClick={() => {
                                    dispatch(gameActions.resetHousing('house'))
                                    dispatch(gameActions.passDay({days: 4}))
                                    dispatch(gameActions.reduceStats({food: 4}))
                                }}
                            >
                                Repair
                            </button>
                        )
                        :
                        (
                            <>House - Days used: {housing.house.usage}</>
                        )
                    )
                }
                {
                    housing.house.exists && !housing.house.maintenance.done && <button onClick={() => {
                        dispatch(gameActions.maintainHouse())
                        dispatch(gameActions.passDay({days: 5}))
                    }}>Maintain</button>
                }
                <hr style={{width: '100%'}}/>
                <button onClick={() => {
                    dispatch(gameActions.buildHousing('hut'))
                }}>Craft a set of clothes</button>
            </div>
            <div style={{position: 'absolute', top: '20px', left: '20px'}}>Day {totalDays === 30 ? 30 : totalDays % 30} of 30</div>
        </div>
    )
}