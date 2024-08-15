import { gameActions } from "../services/gameSlice";

export const actions = {
    boat: [
        {
            name: 'Build a boat',
            duration: 1,
        }
    ],
    food: [
        {
            name: 'Fruit picking',
            duration: 3,
            profit: 9,
            callback: gameActions.changeStats({food: 9})
        },
        {
            name: 'Fishing',
            duration: 1,
            profit: 5
        },
        {
            name: 'Hunting',
            duration: 1,
            profit: 15
        },
        {
            name: 'Establishing a Farm',
            duration: 1,
            profit: 10
        }
    ], 
    housing: [
        {
            name: 'Hut',
            duration: 1,
        },
        {
            name: 'House',
            duration: 19
        }
    ],
    cloth: [
        {
            name: 'Available clothes',
            duration: 3,
        },
        {
            name: 'A set of clothes',
            duration: 5
        }
    ]
}