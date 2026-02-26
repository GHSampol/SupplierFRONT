import { useApi } from '~/composables/api'

export const useInvitation = () => {  

  const get_info_invitation = (id) => {
    return useApi(`/supplier/invitations/validate?code=${id}`)
  }
  return {
    get_info_invitation
  }
}
