export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return (
    re.test(String(email).toLowerCase()) ||
    'Please enter a valid email'
  )
}

export const validatePasswordLength = (password: string) => {
  return (
    password?.length >= 8 || 'The password must have at least 8 characters'
  )
}

export const validateAge = (age: number) => {
  return age >= 18 || 'You must be over 18 years old'
}
