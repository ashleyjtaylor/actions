import { add } from '@actions/packages-math'

export default () => {
  return {
    total: add([1, 2, 3, 4, 5])
  }
}
