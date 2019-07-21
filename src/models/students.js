export default {
  namespace: 'student',
  state: {
    page: 1,
    pageSize: 5,
    total: 1,
    list: [],
  },
  effects: {
    *getList(action, { put }) {
      let page = action.page;
      let pageSize = action.pageSize;
      // let url = `http://localhost:3000/students?page=${page}&pageSize=${pageSize}`
      let url = `http://localhost:3000/students`;
      let response = yield fetch(url);
      let res = yield response.json();
      yield put({
        type: 'setList',
        list: res,
        pageSize,
        page,
      });
    },
    *updateStu(action, { put }) {
      let response = yield fetch(`http://localhost:3000/students/${action.info.id}`, {
        method: 'put',
        body: JSON.stringify(action.info),
        headers: {
          "Content-Type": 'application/json'
        }
      })
      let res = yield response.json()
      yield put({
        type: 'getList'
      })
    }
  },
  reducers: {
    setList(state, action) {
      return {
        list: action.list,
        total: action.total,
        pageSize: action.pageSize,
        page: action.page,
      };
    },
  },
};
