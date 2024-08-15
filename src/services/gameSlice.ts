import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    stats: {
        food: 0,
        housing: 0,
        cloth: 0
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
            usage: 0
        }
    }
}

const slice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        passDay: (state, action: PayloadAction<{days: number}>) => {
            state.totalDays += action.payload.days
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
        createCraftable: (state, action: PayloadAction<'fishing' | 'hunting' | 'farm'>) => {
            state.craftables[action.payload].exists = true
        },
        useCraftable: (state, action: PayloadAction<string>) => {
            state.craftables[action.payload]!.usage += 1
        },
        resetCraftable: (state, action: PayloadAction<string>) => {
            state.craftables[action.payload].usage = 0
        }
    }
})

export const gameReducer = slice.reducer
export const gameActions = slice.actions