import axios from '../axios'
import Photo from '../misc/Photo'
import Story from '../story/Story'

interface UploadStoryDTO {
  body: string
  media: Photo
}

const uploadStory = async (data: UploadStoryDTO): Promise<Story> => {
  const formData = new FormData()
  formData.append('upload', data.media.file)
  formData.append('body', data.body)

  const response = await axios.post<Story>('stories', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

const getStories = async (type: string): Promise<Story[]> => {
  const response = await axios.get(`stories/${type}`)
  return response.data
}

export default { uploadStory, getStories }
