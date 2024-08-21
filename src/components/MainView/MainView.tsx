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
    const clothes = useSelector((state: RootState) => state.game.clothes)
    const dispatch = useDispatch()

    const findHousing = () => {
        for(const prop in housing) {
            if(housing[prop as keyof typeof housing].exists) {
                return prop
            }
        }
    }

    const reserveDaysForMaintaining = () => {
        const check = [...Object.values(clothes).filter(el => el.exists && el.maintenance && el.maintenance.done === false), ...Object.values(housing)
            .filter(el => el.exists && el.maintenance && el.maintenance.done === false)]
            .reduce((a, b) => a + b.maintenance.duration, 0)
        console.log(check)
        return check
    }

    if(boat >= 100) return <>Congratulations! You have finished the game<br/>It took you {totalDays} days</>

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
                    disabled={!isEnoughStats(stats) || ((30 - (totalDays % 30)) <= reserveDaysForMaintaining())}
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
            </div>
            <div style={{position: 'absolute', top: '20px', left: '20px'}}>Day {totalDays === 30 ? 30 : totalDays % 30} of 30</div>
        </div>
    )
}