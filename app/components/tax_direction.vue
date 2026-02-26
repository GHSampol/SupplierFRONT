<template>    
    <h2 class="card-subtitle mt-5 mb-3">{{ t('taxAddress') }}</h2>
    <v-card variant="outlined" class="px-5 py-5" style="border: 1px solid gainsboro;">
        <v-form ref="formDir" @submit.prevent v-model="formValid">                          
            <v-row>
                <v-col>
                    <h4>{{ t('street') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                    variant="outlined" 
                    v-model="data.street" 
                    :counter="60"
                    :placeholder="t('writeYourAnswer')" 
                    :rules="[rules.required, rules.maxLength(60)]"
                    >      
                    </v-text-field>
                </v-col>
                <v-col>
                    <h4>{{ t('number') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                    variant="outlined" 
                    v-model="data.number" 
                    :counter="20"
                    :rules="[rules.required, rules.maxLength(20)]"
                    :placeholder="t('writeYourAnswer')"                   
                    >      
                    </v-text-field>
                </v-col>
                <v-col>
                    <h4>{{ t('postalCode') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                    variant="outlined" 
                    :counter="10"
                    v-model="data.postal_code" 
                    :rules="[rules.required, rules.maxLength(10)]"
                    :placeholder="t('writeYourAnswer')"                   
                    >      
                    </v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                        <h4>{{ t('city') }} <small class="required">{{ t('required') }}</small></h4>  
                    <v-text-field 
                    variant="outlined" 
                    v-model="data.city" 
                    :counter="40"
                    :placeholder="t('writeYourAnswer')" 
                    :rules="[rules.required, rules.maxLength(40)]"                  
                    >      
                    </v-text-field>
                </v-col>
                <v-col>
                    <h4>{{ t('country') }} <small class="required">{{ t('required') }}</small></h4>  
<v-autocomplete
    chips                           v-model="data.country"
                    :placeholder="t('selectOption')"
                    :items="master.m('country')"  
                    :item-title="item => t(item.label)" 
                    item-value="value" 
                    variant="outlined"
                    @update:modelValue="filterOptions"
                    :rules="[rules.required]"
                    required
                    ></v-autocomplete>
                </v-col>
                <v-col>
                    <h4>{{ t('region') }} <small class="required">{{ t('required') }}</small></h4>  
<v-autocomplete
    chips                               v-model="data.region"
                        :placeholder="t('selectOption')"
                        :items="list_regions"  
                        :item-title="item => t(item.label)" 
                        item-value="value" 
                        variant="outlined"
                        :rules="list_regions?.length ? [rules.required] : []"
                        :required="list_regions?.length > 0"
                    ></v-autocomplete>
                </v-col>
            </v-row>   
            <v-row>
                <v-col>
                    <h4>{{ t('additionalAddressInfo') }}</h4> 
                    <v-textarea
                        v-model="data.comments"
                        :counter="50"
                        maxlength="50"
                        rows="2"
                        auto-grow
                        variant="outlined"
                        dense
                        :rules="[rules.maxLength(50)]"
                    ></v-textarea>
                </v-col>
            </v-row>                      
        </v-form>   
    </v-card>          
</template>

<script setup>
import { useMasterStore } from '~/stores/master'
const master = useMasterStore()
await master.fetchCode('country')

</script>
<script>
import { useT } from '~/composables/useT'
import Directions from '~/models/Directions.js'
import {useMaster} from '~/composables/services/master'


export default {
  name: 'Directions',
  components: {},
  data () {
    return {       
      data: new Directions(),     
      list_regions: [],
      formValid: false
    }
  },
  props: {
    modelValue: {
      type: Object,
      default: null
    },
    country: {
        type: String,
        default: ''
    }
  },
  watch:{
    formValid (val) {
      this.$emit('valid', val, 2)
    },
    data: {
      handler (val) {
        this.$emit('update:modelValue', val)
      },
      deep: true
    },
    country(val) {
    this.data.country = val
    this.filterOptions()
    }

  },
  methods: { 
    async filterOptions(){
        const master = useMaster()
        const rpt = await master.get_all_values_filter('regions',this.data.country)
        console.log(rpt, "....")
        this.list_regions = rpt?.response ?? []
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
  mounted () {

  }
}


</script>