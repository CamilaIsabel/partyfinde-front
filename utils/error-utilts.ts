export const getErrorMessage = (
  response: any,
  defaultValue: string = 'Error inesperado.'
) => {
  if (!response || !response.data || !response.data.message) return defaultValue

  if (Array.isArray(response.data.message)) return response.data.message[0]

  return response.data.message
}
