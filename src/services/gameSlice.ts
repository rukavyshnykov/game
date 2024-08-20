import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        food: 0,
        housing: false,
        cloth: true
    },
    boat: 0,
    totalDays: 0,
    craftables: {
        farm: {
            exists: false,
            craft: 20
        },
        hunting: {
            exists: false,
            craft: 22
        },
        fishing: {
            exists: false,
            craft: 10,
            broken: false,
            usage: 0,
            resource: 12
        }
    },
    housing: {
        hut: {
            build: 1,
            repair: {
                duration: 1,
                longevity: 7
            },
            exists: false,
            usage: 0,
            broken: false
        },
        house: {
            build: 19,
            repair: {
                duration: 4,
                longevity: 180
            },
            maintenance: {
                duration: 5,
                longevity: 30,
                done: false
            },
            exists: false,
            usage: 0,
            broken: false
        }
    }
}

const slice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        passDay: (state, action: PayloadAction<{days: number}>) => {
            state.totalDays += action.payload.days
            Object.keys(state.housing).forEach(h => 
                {
                    if(state.housing[h].exists) {
                        state.housing[h].usage += action.payload.days

                        if(state.housing[h].usage >= state.housing[h].repair.longevity) {
                            state.housing[h].broken = true
                            state.stats.housing = false
                        }
                    }
                }
            )
        },
        addStats: (state, action: PayloadAction<{food: number}>) => {   
            state.stats.food += action.payload.food
        },
        reduceStats: (state, action: PayloadAction<{food: number}>) => {
            if(state.stats.food < action.payload.food) {
                state.stats.food = 0
            }
            else {
                state.stats.food -= action.payload.food
            }
        },
        fixBoat: state => {
            state.boat += 1
        },
        createCraftable: (state, action: PayloadAction<Craftable>) => {
            state.craftables[action.payload].exists = true
        },
        useCraftable: (state, action: PayloadAction<Craftable>) => {
            state.craftables[action.payload].usage += 1
            if(state.craftables[action.payload].usage === 12) {
                state.craftables[action.payload].broken = true
            }
            
        },
        resetCraftable: (state, action: PayloadAction<Craftable>) => {
            state.craftables[action.payload].usage = 0
            if(state.craftables[action.payload].broken) {
                state.craftables[action.payload].broken = false
            }
        },
        buildHousing: (state, action: PayloadAction<Housing>) => {
            state.stats.housing = true
            Object.keys(state.housing).forEach(h => {
                state.housing[h as Housing].exists = false
                state.housing[h as Housing].usage = 0
            })
            state.housing[action.payload].exists = true
        },
        resetHousing: (state, action: PayloadAction<Housing>) => {
            state.housing[action.payload].usage = 0
            if(state.housing[action.payload].broken) {
                state.housing[action.payload].broken = false
                state.stats.housing = true
            }
        },
        maintainHouse: (state) => {
            state.housing.house.maintenance.done = true
        },
    }
})

export const gameReducer = slice.reducer
export const gameActions = slice.actions

type Housing = 'hut' | 'house'
type Craftable = 'fishing' | 'hunting' | 'farm'