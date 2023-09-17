import {
  searchInputEl,
  searchFormEl,
  jobListSearchEl,
  numberEl,
  BASE_API_URL,
} from "../common.js";
import renderSpinner from "./Spinner.js";
import renderError from "./Error.js";
import renderJobList from "./JobList.js";

const submitHandler = (event) => {
  event.preventDefault();

  const searchText = searchInputEl.value;

  const forbiddenPattern = /[0-9]/;
  const patternMatch = forbiddenPattern.test(searchText);
  if (patternMatch) {
    renderError("Your search may not contain numbers");
    return;
  }
  searchInputEl.blur();
  jobListSearchEl.textContent = "";
  renderSpinner("search");

  const listJobs = async () => {
    try {
      const response = await fetch(`${BASE_API_URL}/jobs?search=${searchText}`);
      if (!response.ok) {
        console.log("Something went wrong!");
        return;
      }
      const data = await response.json();
      const { jobItems } = data;
      renderSpinner("search");
      numberEl.textContent = jobItems.length;
      renderJobList(jobItems);
    } catch (error) {
      console.log(error);
    }
  };
  listJobs();
};

searchFormEl.addEventListener("submit", submitHandler);
