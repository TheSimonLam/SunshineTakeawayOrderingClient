<template>
  <div id="app">
    <div id="nav">
      <div class="nav-button reset-container" @click="toggleResetOverlay">
        Reset
      </div>
      <div class="nav-button undo-container" @click="undoLastItemAdded">
        Undo
      </div>
      <div class="nav-button next-container" @click="goToConfirmationPage">
        Next (£{{ totalPrice.toFixed(2) }})
      </div>
    </div>
    <div id="item-added-message" class="item-added-message-container">
      Item added!
    </div>
    <div class="reset-overlay-container" v-if="showResetOverlay">
      <div class="overlay-background" @click="toggleResetOverlay"></div>
      <div class="reset-overlay-wrapper">
        <div>Are you sure you want to reset?</div>
        <div class="overlay-buttons-container">
          <button class="overlay-button" @click="reset">Yes</button>
          <button class="overlay-button" @click="toggleResetOverlay">No</button>
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  computed: {
    totalPrice() {
      return this.$store.getters.getTotalPrice;
    },
  },
  data() {
    return {
      showResetOverlay: false,
    };
  },
  methods: {
    goToConfirmationPage() {
      this.$router.push({ path: "confirm" });
    },
    undoLastItemAdded() {
      this.$store.commit("removeLastItem");
    },
    toggleResetOverlay() {
      this.showResetOverlay = !this.showResetOverlay;
    },
    reset() {
      this.toggleResetOverlay();
      this.$store.commit("resetOrder");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
@import "./css/global.scss";

@font-face {
  font-family: "Revue";
  src: local("Revue"), url(./assets/revue.ttf) format("truetype");
}

#app {
  font-family: "Roboto", sans-serif;
  //  font-family: "Revue", Helvetica, Arial;
  background: $blue;
}

#nav {
  background-color: white;
  position: fixed;
  z-index: 99;
  bottom: 0;
  display: flex;
  font-size: 1.5em;
  text-align: center;
  width: 100%;
  height: 100px;
  align-items: center;
  justify-content: space-around;
  border-top: 1px solid $black
}

.nav-button {
  padding: 10px;
  height: 40px;
  width: 30%;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.reset-container {
  background-color: $red;
}

.next-container {
  background-color: $yellow;
}

.undo-container {
  background-color: $white;
  border: 2px solid $red;
}

.item-added-message-container {
  position: absolute;
  display: inline-block;
  z-index: 50;
  font-size: 1.5em;
  transition: opacity 0.5s linear;
  opacity: 0;
  top: -500px;
  left: -500px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 5px;
  background: white;
}

.fade-in {
  opacity: 1;
}

.reset-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

.overlay-background {
  background: black;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  position: absolute;
}

.reset-overlay-wrapper {
  border: 2px solid black;
  display: inline-block;
  background: #fff;
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

.overlay-buttons-container {
  margin-top: 10px;
}

.overlay-button {
  font-size: 1.5em;
  border: 2px solid black;
  margin: 20px;
  background: #90ccf4;
  border-radius: 5px;
}

.reset-overlay-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  text-align: center;
}

.overlay-background {
  background: black;
  height: 100%;
  width: 100%;
  opacity: 0.5;
  position: absolute;
}

.overlay-buttons-container {
  margin-top: 10px;
}

.overlay-button {
  font-size: 1.5em;
  border: 2px solid black;
  margin: 20px;
  background: #90ccf4;
  border-radius: 5px;
}
</style>
