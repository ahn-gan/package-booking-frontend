import {CHANGE_STATE, REFRESH_DATA} from "../util/constants";

const mutations =  {
  [CHANGE_STATE] (state, data) {
    state.status = data;
  },
  [REFRESH_DATA] (state, data) {
    state.toRefresh = data;
  }
};

export default mutations;
