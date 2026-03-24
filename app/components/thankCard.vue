<template>
    <v-card class="thank-card">
        <v-img :src="logoSrc" class="logo_tc" alt="Logo" contain></v-img>

        <v-card-title class="title_card">{{ t('thankYouTitle') }}</v-card-title>
        <v-card-text class="text">
            <v-icon large color="green" class="mb-3 icon_xl">mdi-check-circle</v-icon>
            <p>{{ t('thankYouMessage', { name: supname }) }}</p>
            <p>{{ t('thankYouDescription') }}</p>
        </v-card-text>
    </v-card>
</template>
<script>
import logoLetras from '@/assets/logoLetras.png';
import { useT } from '~/composables/useT'

export default {
  props: {
    supname: {
      type: String
    }
  },
  data() {
    return {
      logoSrc: logoLetras
    };
  },
  methods: {
    
  },
  computed: {
    t() {
      return useT().t
    }
  }
};
</script>

<style>
.thank-card {
    max-width: 600px;
    margin: 40px auto;
    padding: 20px;
    text-align: center;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
  .title_card {
    font-size: 24px;
    font-weight: bold;
    color: #005CB9;
    margin-bottom: 10px;
  }
  
  .logo_tc {
    max-width: 200px;
    margin: 0 auto 20px;
    border:0px;
  }
  
  .text {
    font-size: 15px;
    color: #666;
  }
  
  .actions {
    justify-content: center;
  }
  
  .icon_xl {
    font-size: 48px;
  }
  </style>