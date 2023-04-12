interface StoryUser {
  name: string
  rank: string
  profilePhoto: string
  uuid: string
}

export default interface Story {
  body: string
  url: string
  uploadedAt: Date
  id: string
  user: StoryUser
}
