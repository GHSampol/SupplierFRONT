<template>
    <v-row class="content_center" v-if="!finish">   
        <v-col>                        
           <v-stepper v-model="step" class="pa-4">
              <template v-slot:default="{ prev, next }">
                <v-stepper-header class="stepperConfig" >
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
                    <h2 class="card-title mb-9">{{ t('l_newbankaccount') }}</h2>
                    <v-row>
                        <v-col>
                            <h4>{{ t('companyName') }} <small class="required">{{ t('required') }}</small></h4>     
                            <v-text-field
                                :placeholder="t('writeYourAnswer')" 
                                variant="outlined"
                                v-model="info.social_reason"     
                                :rules="[rules.required, rules.minLength(3), rules.maxLength(40)]"
                            >        
                            </v-text-field>
                        </v-col>
                        <v-col>
                            <h4>{{ t('companyID') }}<small class="required">{{ t('required') }}</small></h4>  
                            <v-text-field 
                                variant="outlined" 
                                v-model="info.cif" 
                                :placeholder="t('writeYourAnswer')" 
                                :rules="[rules.required, rules.maxLength(16), rules.noSpacesOnly]"
                                required
                                class="mb-5">
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <BankAccounts @valid="onStepValid" v-model="info.bank_accounts" ></BankAccounts>
                        </v-col>
                    </v-row>                  
                    <v-row>
                        <v-col>
                            <h4 class="mt-8">{{ t('commentTitle') }}</h4>
                            <v-textarea
                            :label="t('comment')"
                            v-model="info.comments"
                            :counter="2000"
                            maxlength="2000"
                            rows="5"
                            auto-grow
                            variant="outlined"
                            dense
                            ></v-textarea>
                        </v-col>
                    </v-row>
                    
                  </v-stepper-window-item>                 
                </v-stepper-window>
                <v-divider style="margin-top: 100px;"></v-divider>

                <div class="d-flex justify-space-between mt-6 pt-9 mb-6"> 
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
              </template>
            </v-stepper>
        </v-col>        
    </v-row>
    <v-row v-else>
      <v-col>
        <Thankcard :supname="info.social_reason"></Thankcard>  
      </v-col>
    </v-row>
   

</template>
<script>
import { useT } from '~/composables/useT'
import {useSupplier} from '~/composables/services/supplier'
import SupplierData from '~/models/SupplierData.js'
import BankAccount from  '~/models/BankAccount.js'


export default {
  name: 'StepsBankAccount',
  components: {},
  props: [],
  data () {
    return {     
        step: 1,
        steps: [1,2],
        data_steps: {       
            1: {name: 'policy', valid: false},
            2: {name: 'bank_accounts', valid: false}
        },
        info: {
            "policy": null,
            "social_reason": "",
            "comments": "",
            "cif": "", 
            "invitation_code": "",        
            "bank_accounts": null
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
    onNext (next) {
      if (this.disabled) return
      next()
    },
    save(){
      this.loadfinish = true;
      let sup = new SupplierData().getJsonReducido(this.info.policy, this.info.social_reason, this.info.cif,this.info.invitation_code,this.comment)
      
      let bank = (this.info?.bank_accounts ?? [])
        .map(b => new BankAccount().getJson(b))     
      const body = {
        data_supplier: sup,      
        data_banks:  bank
      }
      console.log(body)
      const supplierApi = useSupplier()
      supplierApi.save_data_banks(body)
      .then((r) => {
          console.log(r)
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
        console.log(this.data_steps[this.step].valid)
        if(this.step == 2){
            return !(this.data_steps[this.step].valid && this.info.social_reason != "" && this.info.cif != "")
        } 
        return !this.data_steps[this.step].valid
    },
    rules() {
        return {
            required: v => !!v ||  this.t('required'),
            noSpacesOnly: v => !/\s/.test(v)  || this.t('noSpacesOnly'),
            minLength: n => v =>
            (v && v.length >= n) || this.t('rules_minLength', {min: n}),
            maxLength: max => v =>
            (!v || v.length <= max) || this.t('rules_maxLength', {max})          
        }
    }
  },
  mounted () {
    this.info.invitation_code = window.location.href.split('/').pop();     
  }
}


</script>