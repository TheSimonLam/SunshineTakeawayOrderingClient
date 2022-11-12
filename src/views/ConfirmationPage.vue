<template>
  <div class="confirmation-page-container">
    <div class="ordered-items-container">
      <div class="item-container" @click="removeItem(item)" v-for="item in order" v-bind:key="item.id">
        <div class="ordered-item ordered-item-name">{{item.id}}. {{item.name}}</div>
        <div class="ordered-item ordered-item-name" v-if="item.side"> with {{item.side.name}}</div> -
        <div class="ordered-item ordered-item-price">£{{item.price.toFixed(2)}}</div>
      </div>
      <div class="price-container">Total: £{{totalPrice.toFixed(2)}}</div>
    </div>
    <div class="confirmation-buttons-container">
      <div class="confirmation-button" @click="backToOrderPage">🔙Back</div>
      <div class="confirmation-button" @click="toggleResetOverlay">♻️Reset</div>
      <div class="confirmation-button" @click="placeOrder">✔️Place order</div>
    </div>

    <div class="reset-overlay-container" v-if="showResetOverlay">
      <div class="overlay-background" @click="toggleResetOverlay"></div>
      <div class="reset-container">
        <div>Are you sure you want to reset?</div>
        <div class="overlay-buttons-container">
          <button class="overlay-button" @click="reset">Yes</button>
          <button class="overlay-button" @click="toggleResetOverlay">No</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'confirm',
  computed: {
    order() {
      return this.$store.getters.getOrder
    },
    totalPrice() {
      return this.$store.getters.getTotalPrice
    }
  },
  data(){
    return {
      showResetOverlay: false
    }
  },
  methods: {
    placeOrder(){
      this.reset()
    },
    backToOrderPage(){
      this.$router.push({ path: 'order' })
    },
    toggleResetOverlay(){
      this.showResetOverlay = !this.showResetOverlay;
    },
    reset(){
      this.toggleResetOverlay();
      this.$store.commit("resetOrder");
      this.$router.push({ path: '/' })
    },
    removeItem(item){
      this.$store.commit("removeItemFromOrder", item);
    }
  }
}
</script>

<style lang="scss">
  @import '../css/global.scss';

  .confirmation-page-container{
    height: 100vh;
    padding-top: 100px;
  }

  .ordered-items-container{
    font-size: 1.3em;
    background: white;
    border-radius: 5px;
    margin: 0 50px;
    padding: 10px;
    border: 2px solid black;
  }

  .item-container{
    padding-bottom: 10px;
  }

  .ordered-item {
    display: inline-block;
  }

  .ordered-item-name{
    padding-right: 5px;
  }

  .ordered-item-price{

  }

  .price-container{
    font-size: 1em;
    padding-top: 20px;
    font-weight: bold;
  }

  .confirmation-buttons-container{
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
  }

  .confirmation-button{
    background: white;
    border: 2px solid black;
    display: inline-block;
    height: 80px;
    font-size: 2em;
    text-align: center;
    line-height: 80px;
    border-bottom: 0;
    width: 31%;
    margin: 5px;
    margin-bottom: 0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }

  .reset-overlay-container{
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
  }

  .overlay-background{
    background: black;
    height: 100%;
    width: 100%;
    opacity: 0.5;
    position: absolute;
  }

  .reset-container{
    border: 2px solid black;
    display: inline-block;
    background: #FFF;
    width: 40%;
    height: 35vh;
    border-radius: 5px;
    padding: 40px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    font-size: 1.7em;
  }

  .overlay-buttons-container{
    margin-top: 10px;
  }

  .overlay-button{
    font-size: 1.5em;
    border: 2px solid black;
    margin: 20px;
    background: #90CCF4;
    border-radius: 5px;
  }
</style>