<template>
  <div class="keypad-container">
    <div class="keypad-row">
      <button
        v-for="numpadKey in keys.slice(0, 3)"
        class="keypad-button"
        v-bind:key="numpadKey"
        @click="buttonPressed(numpadKey)"
      >
        {{ numpadKey }}
      </button>
    </div>
    <div class="keypad-row">
      <button
        v-for="numpadKey in keys.slice(3, 6)"
        class="keypad-button"
        v-bind:key="numpadKey"
        @click="buttonPressed(numpadKey)"
      >
        {{ numpadKey }}
      </button>
    </div>
    <div class="keypad-row">
      <button
        v-for="numpadKey in keys.slice(6, 9)"
        class="keypad-button"
        v-bind:key="numpadKey"
        @click="buttonPressed(numpadKey)"
      >
        {{ numpadKey }}
      </button>
    </div>
    <div class="keypad-row">
      <button
        v-for="numpadKey in keys.slice(9, 12)"
        class="keypad-button"
        v-bind:key="numpadKey"
        @click="buttonPressed(numpadKey)"
      >
        {{ numpadKey }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "keypad",
  props: ["searchTerm", "setSearchTerm", "showSearchTermResults"],
  data() {
    return {
      keys: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "DEL"],
    };
  },
  methods: {
    buttonPressed(numpadKey) {
      if (numpadKey !== "DEL") {
        this.setSearchTerm((this.searchTerm += numpadKey));
        this.showSearchTermResults();
      } else {
        this.deletePressed();
      }
    },
    deletePressed() {
      this.setSearchTerm(this.searchTerm.slice(0, -1));
      this.showSearchTermResults();
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.keypad-container {
  display: flex;
  flex-direction: column;
}

.keypad-row {
  display: flex;
  justify-content: space-between;
}

.keypad-button {
  width: 100%;
  height: 70px;
  font-size: 1em;
  font-weight: bold;
  border: 1px solid $red;
  background: $white;
}
</style>
