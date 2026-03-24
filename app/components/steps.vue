<template>
  
    <v-row class="content_center" v-if="!finish">   
        <v-col>     
          {{ finish }}                   
           <v-stepper v-model="step" class="pa-4">
              <template v-slot:default="{ prev, next }">
                <v-stepper-header class="stepperConfig">
                  <template v-for="n in steps" :key="`${n}-step`">
                    <v-stepper-item
                      :complete="step > n"
                      :step="`Step {{ n }}`"
                      :value="n"
                      color="primary"                      
                    ></v-stepper-item>

                    <v-divider
                      v-if="n < steps.length"
                      :key="n"
                    ></v-divider>
                  </template>
                </v-stepper-header>
                <v-stepper-window>
                  <v-stepper-window-item :value="1" key="1">
                    <h2 class="card-title">{{ t('privacyPolicy') }}</h2>
                    <div class="ml-5 pl-5">
                        <h4 style="margin-bottom: 10px;">
                            {{ t('readPrivacyPolicy') }} <span class="required">{{ t('required') }}</span>
                        </h4>
                        <p class="helper">
                            {{ t('readPrivacyPolicyLinkText') }} <a href="https://www.sampol.com/wp-content/uploads/2024/08/Politica-de-Privacidad-y-protecccion-de-datos-2.pdf" target="_blank">{{ t('here') }}</a>.
                        </p>
                        <v-radio-group v-model="info.policy">
                            <v-radio color="#005CB9" :label="t('yes')" :value=true></v-radio>
                            <v-radio color="#005CB9" :label="t('no')" :value=false></v-radio>
                        </v-radio-group>
                    </div>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="2" >
                    <Supplier @valid="onStepValidNumberStep" v-model="info.supplier"></Supplier>
                    
                    <TaxDirection @valid="onStepValidNumberStep" v-model="info.directions" :country="info.supplier?.country"></TaxDirection>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="3" > 
                      <h2 class="card-title mb-9">{{ t('contactInformation') }}</h2>
                      <!-- <Directions @valid="onStepValidNumberStep" v-model="data_steps[3].data.directions"></Directions>  
                      <v-divider class="mt-9 mb-9 pt-9" color="white"></v-divider>                     -->
                      <Contacts @valid="onStepValid" v-model="info.contacts"></Contacts>   
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="4">
                    <BankAccounts @valid="onStepValid" v-model="info.bank_accounts"></BankAccounts>
                  </v-stepper-window-item>
                  <v-stepper-window-item :value="5" >
                    <Documents @valid="onStepValid" v-model="info.documents" :email_cert="getEmailAdm" :code="info.invitation_code"></Documents>
                  </v-stepper-window-item>
                </v-stepper-window>
                <v-divider style="margin-top: 100px;"></v-divider>
                <div class="d-flex justify-space-between mt-6 pt-9 mb-6">
                  <v-btn
                    v-if="step > 1"
                    variant="tonal"
                    @click="onPrev(prev)"
                    class="ml-4"
                  >
                    {{t('previousStep2')}}
                  </v-btn>
                  <v-spacer></v-spacer>                 
                  <v-btn
                    color="primary"
                    :disabled="disabled"
                    @click="onNext(next)"
                    class="mr-4"
                    v-if="step != steps.length"

                  >
                    {{t('nextStep')}}

                  </v-btn>  
                  
                  <v-btn
                    color="success"
                    :disabled="disabled"
                    v-if="step == steps.length"
                    @click="save"
                    :loading="loadfinish"
                    class="mr-4"
                  >
                    {{t('finishAndSubmit')}}

                  </v-btn>  
                </div>
                <div class="d-flex justify-space-between mt-4 mb-6 mr-4"   v-if="disabled">
                  <v-spacer></v-spacer>
                  <v-alert 
                    :text="t('completeFieldsNextStep')" 
                    type="error" 
                    variant="tonal"   
                    density="compact"   
                    class="mb-2 text-caption pa-2"
                  ></v-alert>
                </div>
                <!-- <v-snackbar
                  location="top"
                  color="warning"
                  v-model="disabled"
                >
                  <v-icon>mdi-alert-circle-outline</v-icon>
                  {{t('completeFieldsNextStep')}}                  
                </v-snackbar> -->
              </template>
            </v-stepper>
        </v-col>        
    </v-row>
    <v-row v-else>
      <v-col>
        {{ finish }}
        <Thankcard :supname="info.supplier?.social_reason? info.supplier?.social_reason: ''"></Thankcard>  
      </v-col>
    </v-row>
  
</template>
<script>
import { useT } from '~/composables/useT'
import {useSupplier} from '~/composables/services/supplier'
import SupplierData from '~/models/SupplierData.js'
import Contacts from '~/models/Contacts.js'
import Directions from  '~/models/Directions.js'
import BankAccount from  '~/models/BankAccount.js'
import Documents from  '~/models/Documents.js'



export default {
  name: 'Steps',
  components: {},
  props: [],
  data () {
    return {     
        step: 1,
        steps: [1,2, 3, 4, 5],
        data_steps: {
        1: {name: 'policy', valid: false},
        2: {name: 'supplier', valid: false, sub_valid: {1: false, 2: false}},
        3: {name: 'contacts', valid: false},
        4: {name: 'bank_accounts', valid: false},
        5: {name: 'documents', valid: true}
        },
        info: {
          "policy": null,
          "invitation_code": "",
          "supplier": null,
          "contacts": null,
          "directions": null,
          "bank_accounts": null,
          "documents": null
        },

        finish: false,
        loadfinish: false
      

    }
  },
  props: {
   
  },
  watch: {
    'info.policy'(val) {
      this.data_steps[1].valid = val
    }
  },  
  methods: {  
    onStepValid (isValid) {
      this.data_steps[this.step].valid = isValid
    },
    onStepValidNumberStep(isValid, subKey) {
      this.data_steps[this.step].sub_valid[subKey] = isValid
      this.data_steps[this.step].valid = Object.values(this.data_steps[this.step].sub_valid).every(v => v === true)
    },
    onNext (next) {
      if (this.disabled) return
      next()
    },
    onPrev (prev) {
      prev()
    },
    
    save(){
      this.loadfinish = true;
      let sup = new SupplierData().getJson(this.info.supplier, this.info.documents.any_cert,this.info.invitation_code,this.info.documents.comment,this.info.policy )
      let cont = (this.info.contacts ?? [])
        .map(c => new Contacts().getJson(c))
      console.log(cont)
      let list_dir = []
      let dir = new Directions().getJson(this.info?.directions, true)
      list_dir.push(dir)
      console.log(list_dir)
      let bank = (this.info?.bank_accounts ?? [])
        .map(b => new BankAccount().getJson(b))
      console.log(bank)
      let doc = (this.info?.documents?.documents ?? [])
        .map(x => new Documents().getJson(x))
      console.log(doc)
      const body = {
        data_supplier: sup,
        data_contacts:   cont,
        data_directions:  list_dir,
        data_banks:  bank,
        data_documents:  doc
      }
      console.log(body)
      const supplierApi = useSupplier()
      supplierApi.save_data(body)
      .then((r) => {
          console.log("____", r)
          console.log(r.status)
          this.finish = r.status;
          if (r.status) {        
            this.finish = true;
          } else {
            this.finish = false;
          }
      })
      .catch((error) => {
        console.log("Error al guardar: ", error)
      })
      .finally(() => {
        this.loading = false;
        this.loadfinish= false;
      });    
    }
  },
  computed: {
    t() {
      return useT().t
    },
    disabled () {     
      return !this.data_steps[this.step].valid
    },
    getEmailAdm(){
      if(this.info.contacts)
        return this.info.contacts.find(x => x.type === "Administrativo")?.email
      return ""
    },  
  },
  mounted () {
    this.info.invitation_code = window.location.href.split('/').pop(); 

    
  }
}


</script>