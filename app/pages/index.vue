<template>
  <v-card
    class="mx-auto my-auto"
    max-width="50%"
    elevation="7"
    
  >
    <v-card-text>
        <v-form class="mx-3 my-4 px-5 py-5">
            <h2 class="h2-text text-center mb-5" >{{ t('supplierFormTitle') }}</h2>

            <h4>{{ t('l_codeinvitation') }} <small class="required">{{ t('required') }}</small></h4>     

            <v-text-field 
                class="mt-3"
                variant="solo"
                v-model="code"
                :rules="[rules.required]"
                :placeholder="t('writeYourAnswer')" 
            ></v-text-field>
            <div class="mx-auto">
                <v-btn 
                    block 
                    @click="redirect" 
                    color="primary" 
                    class="center"
                    :disabled="!code || !code.trim()"
                >{{t('check')}}</v-btn>

            </div>
        </v-form>

    </v-card-text>
   
  </v-card>
</template>


<script>

import { useT } from '~/composables/useT'
import { useLanguageStore } from '~/stores/language'

export default {
  name: 'Home',
  components: {},
  props: [],
  data () {
    return {    
       code: ""

    }
  },
  
  watch:{
    
  },
  methods: {    
    redirect() {
      if (this.code && this.code.trim() !== '') {
         this.$router.push(`/${this.code}`)
       }
    }
  },
  computed: {
    t() {
      return useT().t
    },
    rules() {
        return {
            required: v => !!v ||  this.t('required'),
            minLength: n => v =>
            (v && v.length >= n) || this.t('rules_minLength', {min: n}),
            maxLength: max => v =>
            (!v || v.length <= max) || this.t('rules_maxLength', {max}),
            email_sampol: v => (/^[^\s@]+@(sampol\.com|sampoldistribucion\.es)$/i.test(v)) || this.t('rules_emailSampol'),
        }
    }
  },
  mounted() {
    const languageStore = useLanguageStore()
    languageStore.setLanguage({ id: 1 })
  }
}


</script>