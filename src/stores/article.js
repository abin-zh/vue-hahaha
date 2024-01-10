
import { defineStore } from 'pinia'

export const useArticleStore = defineStore('article',{
  state: () => ({
    curCatId: 4,
  }),
  getters: {
    getCurCatId: (state) => state.curCatId,
  },
  actions: {
    setCurCatId(id) {
      this.curCatId = id
    },
  }
})
