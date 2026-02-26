// stores/master.js
import { defineStore } from 'pinia'
import { useMaster } from '~/composables/services/master'

export const useMasterStore = defineStore('masters', () => {
  const master = ref({})
  const loading = ref(false)
  const loaded = ref(false)

  const { get_all_values_code } = useMaster()

  // const getAllMasters = async () => {
  //   const data = await get_all_masters()
  //   const response = data?.response  

  //   master.value = response.reduce((acc, item) => {
  //     acc[item.code] = item.rel_master_values ?? []
  //     return acc
  //   }, {})
  // }

  const fetchCode = async (code) => {
    console.log(code)
    if (!code) return
    if (master.value[code]) return 

    loading.value = true
    try {
      const data = await get_all_values_code(code)
      console.log(data)
      master.value[code] = data?.response?.[0]?.rel_master_values ?? []
    } finally {
      loading.value = false
    }
  }



  const m = (code) => master.value?.[code] || []

  const mFilter = (code, filter) =>
  Array.isArray(master.value?.[code])
    ? master.value[code].filter(f => f.principal_group == filter)
    : []

  return {
    master,
    loading,
    loaded,
    m,
    mFilter,
    fetchCode
  }
})
