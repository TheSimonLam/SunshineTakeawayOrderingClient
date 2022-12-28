<template>
  <div class="overlay-container">
    <div class="overlay-background" @click="$emit('toggleResetOverlay')"></div>
    <div class="overlay-wrapper">
      <div>Are you sure you want to reset?</div>
      <div class="overlay-buttons-container">
        <button class="overlay-button overlay-button-yes" @click="reset">
          Yes
        </button>
        <button
          class="overlay-button overlay-button-no"
          @click="$emit('toggleResetOverlay')"
        >
          No
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "reset-overlay",
  methods: {
    reset() {
      this.$store.commit("resetOrder");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.overlay-wrapper {
  border: 1px solid $black;
  display: inline-block;
  background: #fff;
  width: 370px;
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
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
