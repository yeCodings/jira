import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "store"

interface State {
  projectModalOpen: boolean
}

const initialState: State = {
  projectModalOpen: false
}

export const projectListSlice = createSlice({
  name: 'projectListSlice',
  initialState,
  reducers: {
    openProjectModal(state) {
      // redudx-toolkit 通过 immer(内部新创建了一个影子对象), 可以让我们直接赋值，而不用像使用redux那样返回一个新对象 
      state.projectModalOpen = true
    },
    closeProjectModal(state) {
      state.projectModalOpen = false
    },
  }
})


export const projectListAction = projectListSlice.actions
export const selectProjectModalOpen = (state: RootState) => state.projectList.projectModalOpen