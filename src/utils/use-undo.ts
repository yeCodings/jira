import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
  // const [past, setPast] = useState<T[]>([])        // 过去的状态
  // const [present, setPresent] = useState(initialPresent)  // 现在的状态
  // const [feature, setFeature] = useState<T[]>([])  // 将来的状态

  const [state, setState] = useState<{
    past: T[],
    present: T,
    feature: T[],
  }>({
    past: [],
    present: initialPresent,
    feature: [],
  })

  const canUndo = state.past.length !== 0      // 是否可回退 
  const canRedo = state.feature.length !== 0   // 是否可前进

  const undo = useCallback(() => {
    setState(currentState => {
      const { past, present, feature } = currentState

      const previous = past[past.length - 1]         // 从最近的操作往回跳
      const newPast = past.slice(0, past.length - 1) // 把最后一位拿出去 

      return {
        past: newPast,
        present: previous,
        feature: [present, ...feature],
      }
    })
  }, [])

  const redo = useCallback(() => {
    setState(currentState => {
      const { past, present, feature } = currentState
      if (feature.length === 0) return currentState
      const next = feature[0]
      const newFeature = feature.slice(1)

      return {
        past: [...past, present],
        present: next,
        feature: newFeature,
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const { past, present, feature } = currentState
      if (newPresent === present) return currentState

      return {
        past: [...past, present],
        present: newPresent,
        feature: [],
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        feature: [],
      }
    })
  }, [])

  return [
    state,
    { set, reset, undo, redo, canUndo, canRedo }
  ] as const

}