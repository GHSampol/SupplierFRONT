import { useApi } from '~/composables/api'

export const useListBanks = () => {


  const get_all= () => {
    return useApi('/banks/all')
  }
 
  return {
    get_all
  }
}