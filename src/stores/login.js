import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('login', {
  state: () => ({
    userInfo: {
      username: '',
      token: null,
      
      }
  }),
  // 计算属性computed
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  // 方法method，支持异步
  actions: {
    setUserInfo(state,info) {
      state.userInfo = info;
    },
    clearUserInfo(state) {
      state.userInfo = {
        username: '',
        token: null,
      };
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
