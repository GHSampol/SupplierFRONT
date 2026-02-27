<template>
<div class="card-start" :class="{ 'no-scroll': !showScroll}" >
  <div v-if="showCard" 
       class="custom-card" 
       :class="{ 'animate-slide-up-fade-out': animateCard, 'fade-out': animateFadeOut }"
       @click="flipCard"
  >
    <div class="left-card">
      <img src="@/assets/ImagesStartButton/IMG.jpg" alt="Logo" class="logo">
    </div>
    <div class="right-card">        
      <div class="right-card-up">
        <img src="@/assets/logoLetras.png" alt="Logo Letras" class="logo-letras">
        <h2>{{ t('l_newbankaccount') }}</h2>
      </div>
      <div class="right-card-down">
        <v-btn color="primary" class="start-button" @click="startForm()" >{{ t('start') }}</v-btn>
      </div>                    
    </div>
  </div>
  <div v-else class="stepper-container" :class="{ 'animate-slide-down': animateStep, 'fade-in': animateFadeIn }">
    <transition name="slide">
      <StepBankAccounts v-show="showForm" />      
    </transition>
  </div>
  
</div>
</template>


<script>
import { useT } from '~/composables/useT'
export default {
  name: 'StartBankAccount',
  components: {},
  props: [],
  data () {
      return {
      showCard: true,
      showScroll: false,
      animateCard: false,
      animateStep: false,
      animateFadeOut: false,
      animateFadeIn: false,
      showForm: false
    }
  },
  methods: {
    flipCard() {
      const card = document.querySelector('.custom-card');
      card.classList.toggle('backflip');
    },
    startForm() {
      this.showScroll = false;
      this.animateCard = true;
      setTimeout(() => {
        this.showCard = false;
        setTimeout(() => {
          this.animateStep = true;
          this.animateFadeOut = true;
          setTimeout(() => {
            this.showForm = true;
            this.animateFadeIn = true;
          }, 100);
        }, 100);
      }, 400); 
    },
    updateImage() {
      this.$forceUpdate(); // Forces Vue to re-render the component
    }
  },
  mounted() {
    window.addEventListener('resize', this.updateImage);   
  },
  computed: {
    t() {
      return useT().t
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.updateImage);
  }
  
}
</script>