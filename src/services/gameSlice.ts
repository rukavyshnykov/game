import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { isEnoughStats } from "../utils/isEnoughStats";

const initialState = {
    stats: {
        food: 0,
        housing: 0,
        cloth: 0
    },
    boat: 0,
    totalDays: 0
}

const slice = createSlice({
    initialState,
    name: 'game',
    reducers: {
        passDay: (state, action: PayloadAction<{days: number}>) => {
            state.totalDays += action.payload.days
        },
        addStats: (state, action: PayloadAction<{food?: number,housing?: number, cloth?: number}>) => {
            const check = Object.entries(action.payload)
            state.stats[check[0][0]] += check[0][1]
        },
        reduceStats: (state, action: PayloadAction<{food?: number, housing?: number, cloth?: number}>) => {
            
        },
        fixBoat: state => {
            if(isEnoughStats({game: state})) {
                state.boat += 1
            }
        },
    }
})

export const gameReducer = slice.reducer
export const gameActions = slice.actions