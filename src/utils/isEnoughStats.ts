import { RootState } from "../services/store";

export const isEnoughStats = (state: RootState) : boolean => Object.values(state.game.stats).includes(0) ? false : true

