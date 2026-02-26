import { useApi } from '~/composables/api'

export const useSupplier = () => {
  const save_data = (data) => {
    

    return useApi('/supplier/save_data', {
      method: 'POST',
      body: data
    })
  }

  return { save_data }
}
