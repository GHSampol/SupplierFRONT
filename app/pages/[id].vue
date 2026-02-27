<template>
  <div class="text-center mt-4" v-if="loading">
  <v-progress-circular 
  color="primary"
  indeterminate
  :size="50"
  :width="3"
  ></v-progress-circular>
  </div>
  <div v-if="!loading" >
     <div v-if="!validate" class="content_center" >
        <v-alert type="error" :title="t('formAccessError')" :text="response" icon="mdi-lock-alert-outline"></v-alert>
      </div>
      <div v-if="validate">
        <StartBankAccounts v-if="type=='cuenta'" style="background-color: white;"></StartBankAccounts>
        <Start v-else style="background-color: white;"></Start>
      </div>
     
  </div>
  

</template>
<script>
import { useT } from '~/composables/useT'
import {useInvitation} from '~/composables/services/invitation'

export default {
  name: 'Form',
  components: {},
  props: [],
  data () {
    return {    
      loading: true,
      validate: false,
      response: '',
      type: ''
    }
  },
  props: {
   
  },
  methods: {  

  },
  computed: {
  t() {
      return useT().t
    },
  },
  mounted () {
    let code = window.location.href.split('/').pop(); 
    this.loading = true; 
    const invitationApi = useInvitation()
    invitationApi.get_info_invitation(code)
    .then((r) => {
      console.log(r)
      if (r.status) {        
        this.validate = true;
        if (r.response.type == 'cuenta'){
          this.type = 'cuenta'
        }
      } else {
        this.validate = false;
        this.response = "Código no válido o no activo.";
      }
    })
    .catch((error) => {
      this.validate = false;
      this.response = error;
    })
    .finally(() => {
      this.loading = false;
    });    
  }
}


</script>