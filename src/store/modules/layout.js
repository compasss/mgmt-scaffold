/**
 * 界面配置
*/
import axios from '@/request/index.js'
import layoutConfig from '@/config/layerSideBar.js'

import func from '@/utils/func.js'

const { listToTree } = func;

const state = {
  sideBarArr: []
}

const mutations = {
  SET_SIDEBAR_ARR({ state }, payload) {
    let result = []
    layoutConfig.forEach(item => {
      if (!item.roles || _.intersection(item.roles, payload).length) {
        result.push(item)
      }
    });

    state.sideBarArr = listToTree(result)
    console.log(state.sideBarArr)
  }
}

const actions = {
  getSideBar({commit}) {
    axios({
      api: 'mockUserInfo',
      method: 'GET'
    }).then(res => {
      let roles = res.roles || []
      commit('SET_SIDEBAR_ARR', roles)
    }).catch(e => {
      console.error(e)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

