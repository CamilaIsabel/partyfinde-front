import { initialiseStores } from '~/utils/store-accessor'

const initializer = (store: any) => initialiseStores(store)

const plugins = [initializer]

export { plugins }

export * from '~/utils/store-accessor'
