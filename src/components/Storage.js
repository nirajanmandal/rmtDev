import { state } from "../common.js";

const storedItems = localStorage.getItem("bookmarkJobItems");
if (storedItems) {
  state.bookmarkJobItems = JSON.parse(storedItems);
}
