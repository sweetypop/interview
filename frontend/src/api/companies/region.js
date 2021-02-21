import Service from '../service'

const resource = '/region';


export default {
  list() {
    return Service.get(`${resource}`);
  },
}
