import {CHANGE_STATE} from "../util/constants";

const actions = {
  [CHANGE_STATE] (context, data) {
    context.commit(CHANGE_STATE, data)
  }
}

export default actions;
