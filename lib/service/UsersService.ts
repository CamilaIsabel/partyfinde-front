import Photo from '../misc/Photo'
import axios from '~/lib/axios'
import { users } from '~/store'

export class UpdateProfileDTO {
  name?: string
  region?: string
  province?: string
  schedule?: string
  houseLocation?: boolean
  anotherPlaceLocation?: boolean
  clubLocation?: boolean
  phoneCallAvailable?: boolean
  whatsappAvailable?: boolean
  instagramAvailable?: boolean
  instagram?: string
  description?: string
  age?: number
  username?: string
  type?: string
  isActive?: boolean
}

export interface UploadPhotosDTO {
  upload: File[]
}

export interface UpdatePhotosDTO {
  photos: Photo[]
}

export const uploadPhotos = async (data: UploadPhotosDTO): Promise<Photo[]> => {
  const formData = new FormData()
  data.upload.forEach((file) => formData.append('upload', file))

  const response = await axios.post<Photo[]>('profile/photos', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export const updatePhotos = (data: UpdatePhotosDTO): Promise<any> => {
  return axios.patch('profile/photos', data)
}

export const getUserPhotos = async (id?: string): Promise<Photo[]> => {
  const userId = id ?? users.currentUser?.uuid
  if (!userId) return []
  const response = await axios.get<Photo[]>('profile/photos/' + userId)
  return response.data
}

const getProfile = () => {
  return axios.get('profile')
}

const updateProfile = (data: UpdateProfileDTO) => {
  return axios.post('profile', data)
}

const getUserList = (type: string) => {
  return axios.get('users/list/' + type)
}

const getBoostInformation = async () => {
  const response = await axios.get('/users/list/position')
  return response.data
}

const useBoost = () => {
  return axios.post('users/boost')
}

const useFreeBoost = () => {
  return axios.post('users/free-boost')
}

export default {
  updateProfile,
  uploadPhotos,
  getUserPhotos,
  updatePhotos,
  getUserList,
  getProfile,
  getBoostInformation,
  useBoost,
  useFreeBoost,
}
