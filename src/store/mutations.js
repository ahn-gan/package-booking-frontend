import {CHANGE_STATE} from "../util/constants";

const mutations =  {
  [CHANGE_STATE] (state, data) {
    state.status = data;
  }
};

export default mutations;
