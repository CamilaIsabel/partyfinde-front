import axios from '../axios'

const addWhatsAppClick = (uuid: string) => {
  axios.get(`profile/interact/${uuid}/whatsapp`)
}

const addPhoneClick = (uuid: string) => {
  axios.get(`profile/interact/${uuid}/call`)
}

const addView = (uuid: string) => {
  axios.get(`profile/interact/${uuid}/view`)
}

export default { addWhatsAppClick, addPhoneClick, addView }
