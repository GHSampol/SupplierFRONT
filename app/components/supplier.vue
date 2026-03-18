
<template>
    <v-form @submit.prevent v-model="formValid" validate-on="input">
      <h2 class="card-title">{{ t('supplierDataTitle') }}</h2>
      <h4>{{ t('personType') }} <small class="required">{{ t('required') }}</small></h4>
      <v-radio-group v-model="data.person_type">      
        <v-radio :label="t('personTypePhysical')" value="1"></v-radio>
        <v-radio :label="t('personTypeLegal')" value="2"></v-radio>
      </v-radio-group>
      
      <template v-if="data.person_type==2">  
        <h4>{{ t('companyName') }} <small class="required">{{ t('required') }}</small></h4>     
        <v-text-field
            :placeholder="t('writeYourAnswer')" 
            variant="outlined"
            v-model="data.social_reason"     
            :rules="data.person_type == 2
                ? [rules.required, rules.minLength(3), rules.maxLength(40)]
                : []"
        >        
        </v-text-field>
      </template>

      <template v-if="data.person_type==1">
        <v-card variant="text">
          <v-card-subtitle class="pl-1 pt-2 ">
             {{t('personType')}} - {{ t('personTypePhysical') }}
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col>    
                <h4>{{ t('name') }} <small class="required">{{ t('required') }}</small></h4>        
                <v-text-field 
                    variant="outlined" 
                    v-model="data.name"
                    :placeholder="t('writeYourAnswer')"
                    :rules="data.person_type == 1
                        ? [rules.required]
                        : []"
                ></v-text-field>
              </v-col>
              <v-col>    
                <h4>{{ t('secondName') }}</h4>          
                <v-text-field
                    variant="outlined" 
                    v-model="data.middle_name"
                    :placeholder="t('writeYourAnswer')" 
                    
                  ></v-text-field>
              </v-col>
            </v-row>     
            <v-row class="mt-0 pt-0">         
              <v-col>    
                <h4>{{ t('lastName') }} <small class="required">{{ t('required') }}</small> </h4>          
                <v-text-field
                    variant="outlined" 
                    v-model="data.lastname"
                    :placeholder="t('writeYourAnswer')" 
                    :rules="data.person_type == 1
                        ? [rules.required]
                        : []"
                  ></v-text-field>
              </v-col>
              <v-col>    
                <h4>{{ t('secondLastName') }}</h4>        
                <v-text-field 
                    variant="outlined" 
                    v-model="data.second_lastname"
                    :placeholder="t('writeYourAnswer')"              
                ></v-text-field>
              </v-col>
            </v-row>   
          </v-card-text>
        </v-card> 
        <v-divider></v-divider> 
      </template>
      
      <h4 class="mt-5">{{ t('country') }} <small class="required">{{ t('required') }}</small></h4>
      <v-autocomplete
        chips       
        v-model="data.country"
        :placeholder="t('selectOption')"
        :items="master.m('country')"  
        :item-title="item => t(item.label)" 
        item-value="value" 
        variant="outlined"
        :rules="[rules.required]"
        @update:modelValue="filterOptions"
        required
      ></v-autocomplete>
      <v-row >
        <v-col v-if="typeCif?.length">
            <h4>{{ t('taxIdentificationType') }} <small class="required">{{ t('required') }}</small></h4>
            <v-autocomplete
                chips      
                v-model="data.type_cif"
                :placeholder="!data.country 
                  ? t('selectCountryFirst') 
                  : t('selectOption')"
                :items="typeCif"  
                :item-title="item => t(item.label)" 
                item-value="value" 
                variant="outlined"
                :rules="typeCif?.length ? [rules.required] : []"
                :required="typeCif?.length > 0"
            ></v-autocomplete>
        </v-col>
        <v-col>
            <h4>{{ t('companyID') }} <small class="required">{{ t('required') }}</small></h4>  
            <v-text-field 
                variant="outlined" 
                v-model="data.cif" 
                :placeholder="t('writeYourAnswer')" 
                :rules="[rules.required, rules.maxLength(16), rules.noSpacesOnly]"
                required>
            </v-text-field>
        </v-col>
      </v-row>
      
      <template v-if="showVendorType">
        <h4>{{t('vendor_type')}} <small class="required">{{ t('required') }}</small></h4>
          <v-autocomplete
            chips                   
            v-model="data.vendor_type"               
            :items="list_vendor_type"  
            :item-title="item => t(item.label)" 
            item-value="value" 
            variant="outlined"
            :rules=" showVendorType? [rules.required]: []"
        ></v-autocomplete>     
      </template>
      <h4>Grupo de tesorería<small class="required">{{ t('required') }}</small></h4>
          <v-autocomplete
            chips                   
            v-model="data.treasury_group"               
            :items="master.m('treasury_group')"  
            :item-title="item => t(item.label)" 
            item-value="value" 
            variant="outlined"
            :rules="[rules.required]"
      ></v-autocomplete> 
      
      <v-row>
        <v-col>
            <h4>{{ t('web') }}</h4>  
            <v-text-field 
              variant="outlined" 
              v-model="data.web_page"
              :placeholder="t('writeYourAnswer')" 
            ></v-text-field>
        </v-col>
        <v-col>
            <h4>{{ t('email_company', {type: data.person_type == 1? t('personTypePhysical') : t('personTypeLegal')}) }} <small class="required">{{ t('required') }}</small></h4>  
            <v-text-field 
              variant="outlined" 
              v-model="data.email_company"
              :placeholder="t('writeYourAnswer')" 
              :rules="[rules.required]"

            ></v-text-field>
        </v-col>
        <v-col>
            <h4>{{ t('phone_company', {type: data.person_type == 1? t('personTypePhysical') : t('personTypeLegal')}) }} <small class="required">{{ t('required') }}</small></h4>  
            <v-text-field 
              variant="outlined" 
              v-model="data.phone_company"
              :placeholder="t('writeYourAnswer')" 
              :rules="[rules.required]"

            ></v-text-field>
        </v-col>
      </v-row>

     

      <h4>{{ t('preferredLanguageForCommunication') }} <small class="required">{{ t('required') }}</small></h4>
      <v-radio-group v-model="data.prefered_lang">
        <v-radio color="#005CB9" :label="t('spanish')" :value="1"></v-radio>
        <v-radio color="#005CB9" :label="t('english')" :value="2"></v-radio>
      </v-radio-group>

      </v-form>
</template>
<script setup>
import { useMasterStore } from '~/stores/master'
const master = useMasterStore()
await master.fetchCode('country')
await master.fetchCode('treasury_group')

</script>
<script>

import { useT } from '~/composables/useT'
import SupplierData from '~/models/SupplierData.js'
import {useMaster} from '~/composables/services/master'

export default {
  name: 'Supplier',
  components: {},
  props: [],
  data () {
    return {    
        data: this.modelValue ? { ...this.modelValue } : new SupplierData(),
        formValid: false,
        typeCif: [],
        list_vendor_type: [],
        showVendorType: false

    }
  },
  props: {
    modelValue: {
      type: Object,
      default: null
    }
  },
  watch:{
    formValid (val) {
      this.$emit('valid', val, 1)
    },
    data: {
      handler (val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },
    'data.person_type'(val) {
        const v = Number(val) 
        if (v === 1) {
          this.data.social_reason = ''
        } else if (v === 2) {
          this.data.name = ''
          this.data.middle_name = ''
          this.data.lastname = ''
          this.data.second_lastname = ''
        }     
        this.$nextTick(() => {
          this.$refs.form?.resetValidation()
        })
      
    }
  },
  methods: {    
   async filterOptions(){
        const master = useMaster()
        const rpt = await master.get_all_values_filter('type_cif',this.data.country)
        this.typeCif = rpt?.response ?? []
        const rptaL = await master.get_all_values_filter('vendor_type', this.data.country)       
        this.list_vendor_type = rptaL?.response ?? []
        console.log(this.list_vendor_type)
        this.showVendorType = rptaL?.status;
        if (!rptaL?.status){
          this.data.vendor_type = null
        }      
   },
  },
  computed: {
    t() {
      return useT().t
    },
    rules() {
        return {
            required: v => !!v ||  this.t('required'),
            noSpacesOnly: v => !/\s/.test(v)  || this.t('noSpacesOnly'),
            minLength: n => v =>
            (v && v.length >= n) || this.t('rules_minLength', {min: n}),
            maxLength: max => v =>
            (!v || v.length <= max) || this.t('rules_maxLength', {max}),
            email_sampol: v => (/^[^\s@]+@(sampol\.com|sampoldistribucion\.es)$/i.test(v)) || this.t('rules_emailSampol'),
        }
    }
  }
}


</script>