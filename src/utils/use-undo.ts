import { useCallback, useReducer, useState } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[],
  present: T,
  feature: T[],
}

type Action<T> = {
  newPresent?: T,
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET,
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, feature } = state
  const { newPresent } = action

  switch (action.type) {
    case UNDO: {
      const previous = past[past.length - 1]         // 从最近的操作往回跳
      const newPast = past.slice(0, past.length - 1) // 把最后一位拿出去 

      return {
        past: newPast,
        present: previous,
        feature: [present, ...feature],
      }
    };
    case REDO: {
      if (feature.length === 0) return state
      const next = feature[0]
      const newFeature = feature.slice(1)

      return {
        past: [...past, present],
        present: next,
        feature: newFeature,
      }
    };
    case SET: {
      if (newPresent === present) return state

      return {
        past: [...past, present],
        present: newPresent,
        feature: [],
      }
    };
    case RESET: {
      return {
        past: [],
        present: newPresent,
        feature: [],
      }
    };
  }

  return state
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    feature: [],
  } as State<T>)

  const canUndo = state.past.length !== 0      // 是否可回退 
  const canRedo = state.feature.length !== 0   // 是否可前进

  const undo = useCallback(() => { dispatch({ type: UNDO }) }, [])

  const redo = useCallback(() => { dispatch({ type: REDO }) }, [])

  const set = useCallback((newPresent: T) => { dispatch({ type: SET, newPresent }) }, [])

  const reset = useCallback((newPresent: T) => { dispatch({ type: RESET, newPresent }) }, [])

  return [
    state,
    { set, reset, undo, redo, canUndo, canRedo }
  ] as const

}