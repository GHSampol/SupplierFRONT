import { useApi } from '~/composables/api'

export const useSupplier = () => {
    const save_data = (data) => {  
        return useApi('/supplier/save_data', {
        method: 'POST',
        body: data
        })
    }
    const save_data_banks = (data) => {   
        return useApi('/supplier/save_data_banks', {
        method: 'POST',
        body: data
        })
    }
  
  return { save_data, save_data_banks }
}
