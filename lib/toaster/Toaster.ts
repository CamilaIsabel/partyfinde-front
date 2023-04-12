import { getSingletonComponent } from '../mixin/SingletonMixin'

export interface PromiseSettings {
  error?: string | ((result: any) => string)
  success?: string | ((result: any) => string)
  loading?: string
  width?: number
}

export interface ToastSettings {
  width?: number
  duration?: number
}

export interface ToastType {
  error?: string
  success?: string
  promise?: Promise<any>
  id?: string
  width?: number
  duration?: number
}

export interface ToasterType {
  success(message: string): void
  error(message: string): void
  promise(promise: Promise<any>, options: PromiseSettings): void
}

const getToaster = (): ToasterType => {
  return (<any>getSingletonComponent('toaster')) as ToasterType
}

const success = (message: string) => {
  getToaster().success(message)
}

const error = (message: string) => {
  getToaster().error(message)
}

const promise = (
  promise: Promise<any>,
  options: PromiseSettings = {
    success: 'Success',
    error: 'Error',
    loading: 'Loading',
    width: 200
  }
) => {
  getToaster().promise(promise, options)
}

export default {
  success,
  error,
  promise
}
