import {CHANGE_STATE, REFRESH_DATA} from "../util/constants";

const actions = {
  [CHANGE_STATE] (context, data) {
    context.commit(CHANGE_STATE, data)
  },
  [REFRESH_DATA] (context, data) {
    context.commit(REFRESH_DATA, data)
  }
}

export default actions;
