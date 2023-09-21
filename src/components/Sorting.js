import {
  state,
  sortingEl,
  sortingBtnRecentEl,
  sortingBtnRelevantEl,
} from "../common.js";
import renderJobList from "./JobList.js";
import renderPaginationButtons from "./Pagination.js";

const clickHandler = (event) => {
  const clickButtonEl = event.target.closest(".sorting__button");
  if (!clickButtonEl) return;

  state.currentPage = 1;

  const recent = clickButtonEl.className.includes("--recent") ? true : false;

  if (recent) {
    sortingBtnRecentEl.classList.add("sorting__button--active");
    sortingBtnRelevantEl.classList.remove("sorting__button--active");
    state.searchJobItems.sort((a, b) => {
      return a.daysAgo - b.daysAgo;
    });
  } else {
    sortingBtnRecentEl.classList.remove("sorting__button--active");
    sortingBtnRelevantEl.classList.add("sorting__button--active");
    state.searchJobItems.sort((a, b) => {
      return b.relevanceScore - a.relevanceScore;
    });
  }
  renderPaginationButtons();
  renderJobList();
};

sortingEl.addEventListener("click", clickHandler);
