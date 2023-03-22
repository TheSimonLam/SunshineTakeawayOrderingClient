<template>
  <div class="confirmation-page-container">
    <div class="overlay-container" v-if="showResetOverlay">
      <div class="overlay-background" @click="toggleResetOverlay"></div>
      <div class="overlay-wrapper">
        <div>Are you sure you want to reset?</div>
        <div class="overlay-buttons-container">
          <button class="overlay-button overlay-button-yes" @click="reset">
            Yes
          </button>
          <button
            class="overlay-button overlay-button-no"
            @click="toggleResetOverlay"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <div class="overlay-container" v-if="showDeleteItemOverlay">
      <div class="overlay-background" @click="toggleDeleteItemOverlay"></div>
      <div class="overlay-wrapper">
        <div>Are you sure you want to remove {{ itemToBeDeleted.name }}?</div>
        <div class="overlay-buttons-container">
          <button
            class="overlay-button overlay-button-yes"
            @click="
              removeItem(itemToBeDeleted);
              toggleDeleteItemOverlay();
            "
          >
            Yes
          </button>
          <button
            class="overlay-button overlay-button-no"
            @click="toggleDeleteItemOverlay"
          >
            No
          </button>
        </div>
      </div>
    </div>
    <div class="overlay-container" v-if="showEditOverlay">
      <div class="overlay-background" @click="toggleEditOverlay"></div>
      <div class="overlay-wrapper">
        <div>Editing</div>
        <span>Note</span>
        <input
          placeholder="Enter note"
          class="edit-item-input"
          v-model="itemEditNoteValue"
        />
        <span>Price</span>
        <input
          placeholder="Enter price"
          class="edit-item-input"
          v-model="itemEditPriceValue"
        />
        <div class="overlay-buttons-container">
          <button class="overlay-button overlay-button-yes" @click="saveEdit()">
            Save
          </button>
          <button
            class="overlay-button overlay-button-no"
            @click="toggleEditOverlay()"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    <div class="ordered-items-container">
      <div v-if="printerError" class="printer-error-container">
        Printer error: {{ printerError }}
      </div>
      <div class="item-container" v-for="(item, index) in pastOrder || order">
        <span
          v-if="!pastOrder"
          class="delete-icon"
          @click="toggleDeleteItemOverlay(item)"
          >✖</span
        >
        <div v-if="item.id" class="ordered-item ordered-item-name">
          {{ item.id }}. {{ item.name }}
        </div>
        <div v-else="type === 'B'" class="ordered-item ordered-item-name">
          {{ item.name }}
        </div>
        <div class="ordered-item ordered-item-name" v-if="item.side">
          with {{ item.side.name }}
        </div>
        -
        <div class="ordered-item ordered-item-price">
          £{{ item.price.toFixed(2) }}
          {{ item.side ? `+ £${item.side.price.toFixed(2)}` : "" }}
        </div>
        <button
          v-if="!pastOrder"
          class="ordered-item-edit-button"
          @click="toggleEditOverlay(index)"
        >
          Edit
        </button>
      </div>
      <div class="price-container">Total: £{{ totalPrice.toFixed(2) }}</div>
      <div class="name-container">
        Name:
        <input
          :disabled="pastOrder"
          class="customer-name-input"
          placeholder="customer name..."
          v-model="customerName"
        />
      </div>
      <div class="time-container">
        Time:
        <input
          :disabled="pastOrder"
          class="time-input"
          placeholder="arrival time..."
          v-model="arrivalTime"
        />
      </div>
      <div v-if="!pastOrder" class="time-buttons-container">
        <button class="time-button" @click="timeSelected('Now')">Now</button>
        <button class="time-button" @click="timeSelected('5')">5 mins</button>
        <button class="time-button" @click="timeSelected('10')">10 mins</button>
        <button class="time-button" @click="timeSelected('15')">15 mins</button>
        <button class="time-button" @click="timeSelected('20')">20 mins</button>
        <button class="time-button" @click="timeSelected('25')">25 mins</button>
        <button class="time-button" @click="timeSelected('30')">30 mins</button>
        <button class="time-button" @click="timeSelected('35')">35 mins</button>
        <button class="time-button" @click="timeSelected('40')">40 mins</button>
        <button class="time-button" @click="timeSelected('45')">45 mins</button>
      </div>
    </div>
    <div v-if="showSummaryNav" class="summary-page-nav">
      <div
        v-if="!pastOrder"
        class="order-page-nav-button reset-container"
        @click="toggleResetOverlay"
      >
        Reset
      </div>
      <div class="summary-page-nav-button back-container" @click="goBack">
        Back
      </div>
      <div
        class="summary-page-nav-button print-container"
        @click="placeOrder"
        :class="isPrinting ? 'is-printing' : ''"
      >
        {{ pastOrder ? "Print" : "Submit & Print" }}
      </div>
    </div>
  </div>
</template>

<script>
import { createOrder, printEscPos } from "../api/services";
import { HOST_IP } from "../consts";

export default {
  name: "summary",
  computed: {
    order() {
      return this.$store.getters.getOrder;
    },
    totalPrice() {
      return (
        this.$route.params?.pastOrder?.totalPrice ||
        this.$store.getters.getTotalPrice
      );
    },
  },
  data() {
    const pastOrderInfo = this.$route.params?.pastOrder;
    return {
      showResetOverlay: false,
      showDeleteItemOverlay: false,
      showEditOverlay: false,
      isPrinting: false,
      printerError: "",
      customerName: pastOrderInfo?.customerName || "",
      arrivalTime: pastOrderInfo?.arrivalTime || "",
      itemToBeDeleted: undefined,
      itemIndexToBeEdited: undefined,
      itemEditNoteValue: "",
      itemEditPriceValue: "",
      showSummaryNav: true,
      pastOrder: pastOrderInfo?.order,
    };
  },
  methods: {
    async placeOrder() {
      if (!this.pastOrder) {
        await createOrder({
          order: this.order,
          totalPrice: this.totalPrice,
          customerName: this.customerName,
          arrivalTime: this.arrivalTime,
          createdTimestamp: Date.now(),
        });
      }

      if (!this.isPrinting) {
        this.printerError = "";
        this.isPrinting = true;
        printEscPos({
          HOST_IP,
          order: this.order,
          totalPrice: this.totalPrice,
          customerName: this.customerName,
          arrivalTime: this.arrivalTime,
        })
          .then((res) => {
            if (!res || !res.status || res.status !== "success") {
              this.printerError = "Printer error! Make sure server is running";
              this.isPrinting = false;
            } else {
              this.isPrinting = false;
            }
          })
          .catch((err) => {
            this.printerError = err.message;
            this.isPrinting = false;
          });
      }
    },
    timeSelected(timeSelected) {
      this.arrivalTime = timeSelected;
      if (timeSelected !== "Now") {
        const nowDate = new Date();
        const adjustedArrivalTime = new Date(
          nowDate.getTime() + parseInt(timeSelected) * 60000
        );
        const hours = (adjustedArrivalTime.getHours() + 24) % 12 || 12;
        const minutes = adjustedArrivalTime.getMinutes();
        const formattedMinutes =
          minutes.toString().length === 1 ? "0" + minutes : minutes;
        this.arrivalTime = hours + ":" + formattedMinutes;
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    toggleResetOverlay() {
      this.showResetOverlay = !this.showResetOverlay;
      this.toggleSummaryNav();
    },
    toggleEditOverlay(itemIndexToBeEdited) {
      this.itemIndexToBeEdited = itemIndexToBeEdited;
      this.itemEditNoteValue = "";
      this.itemEditPriceValue =
        this.order[this.itemIndexToBeEdited]?.price || 0;
      this.showEditOverlay = !this.showEditOverlay;
      this.toggleSummaryNav();
    },
    toggleDeleteItemOverlay(item) {
      this.itemToBeDeleted = item;
      this.showDeleteItemOverlay = !this.showDeleteItemOverlay;
      this.toggleSummaryNav();
    },
    toggleSummaryNav() {
      this.showSummaryNav = !this.showSummaryNav;
    },
    saveEdit() {
      if (!this.itemEditPriceValue) {
        return;
      }
      const editedOrder = this.order[this.itemIndexToBeEdited];
      this.removeItem(editedOrder);
      if (this.itemEditNoteValue) {
        editedOrder.name += " (NOTE: " + this.itemEditNoteValue + ")";
      }
      editedOrder.price = parseFloat(this.itemEditPriceValue);
      this.$store.commit("addItemToOrder", {
        item: editedOrder,
        indexToInsert: this.itemIndexToBeEdited,
      });
      this.toggleEditOverlay();
    },
    reset() {
      this.toggleResetOverlay();
      this.$store.commit("resetOrder");
      this.$router.push({ name: "start" });
    },
    removeItem(item) {
      this.$store.commit("removeItemFromOrder", item);
    },
  },
};
</script>

<style lang="scss">
@import "../css/global.scss";

.time-button {
  height: 50px;
  margin-right: 30px;
  margin-bottom: 20px;
  width: 80px;
  border-radius: 5px;
  border: 1px solid $black;
}

.time-buttons-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 20px;
}

.customer-name-input::placeholder,
.time-input::placeholder {
  color: $red;
}

.customer-name-input {
  padding: 5px;
  border: none;
  text-decoration: underline;
  font-size: 1em;
}

.time-input {
  padding: 5px;
  border: none;
  text-decoration: underline;
  font-size: 1em;
}

.delete-icon {
  color: $red;
  padding-right: 10px;
}

.confirmation-page-container {
  padding-top: 50px;
  background: $pureWhite;
}

.ordered-items-container {
  font-size: 1.3em;
  background: $pureWhite;
  border-radius: 5px;
  margin: 0 50px;
  padding: 10px;
}

.item-container {
  padding-bottom: 30px;
}

.ordered-item {
  display: inline-block;
}

.ordered-item-name {
  padding-right: 5px;
}

.ordered-item-price {
}

.price-container,
.name-container,
.time-container {
  font-size: 1em;
  padding-top: 20px;
  font-weight: bold;
}

.confirmation-buttons-container {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
}

.confirmation-button {
  background: white;
  border: 2px solid $black;
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

.summary-page-nav {
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
}

.summary-page-nav-button {
  padding: 10px;
  height: 40px;
  width: 30%;
  justify-content: center;
  display: flex;
  align-items: center;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.print-container {
  background-color: $green;
}

.back-container {
  background-color: $white;
  border: 2px solid $yellow;
}

.printer-error-container {
  text-align: center;
  background: $red;
  width: 50%;
  margin: 0 auto;
  color: $white;
  padding: 20px;
  margin-bottom: 50px;
}

.is-printing {
  background-color: $lightGrey;
}

.ordered-item-edit-button {
  vertical-align: middle;
  border: none;
  background: none;
}

.edit-item-input {
  font-size: 0.8em;
}
</style>
