import { updateBaseURL } from '../lib/axios'

export default function ({ $config }) {
  updateBaseURL($config.PARTYFINDER_API)
}
