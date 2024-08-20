type Stats = {
    food: number,
    housing: boolean,
    cloth: boolean
}

export const isEnoughStats = (stats: Stats): boolean => Object.values(stats).every(Boolean) ? true : false