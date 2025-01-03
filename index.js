import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Modify `markCommit` to ensure the date is in the range from Jan 1, 2022, to Dec 31, 2023
const markCommit = (x, y) => {
  const startDate = moment("2022-01-01"); // Start from January 1, 2022
  const endDate = moment("2023-12-31"); // End on December 31, 2023

  const date = startDate
    .add(x, "w")  // Add weeks
    .add(y, "d")  // Add days
    .isBefore(endDate) ? startDate.add(x, "w").add(y, "d") : endDate; // Ensure it's within the range

  const data = {
    date: date.format(), // Format to string
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date.format(), { "--date": date.format() }).push();
  });
};

// Modify `makeCommits` to ensure commits are within the date range
const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const x = random.int(0, 104);  // Max number of weeks between Jan 2022 and Dec 2023
  const y = random.int(0, 6);    // Number of days to add (0 to 6)

  const startDate = moment("2022-01-01"); // Start from January 1, 2022
  const endDate = moment("2023-12-31"); // End on December 31, 2023

  // Ensure the date is within the range
  let date = startDate
    .add(x, "w")  // Add weeks
    .add(y, "d"); // Add days

  if (date.isAfter(endDate)) {
    date = endDate; // If it exceeds Dec 31, 2023, set it to Dec 31, 2023
  }

  const data = {
    date: date.format(), // Format the date for commit
  };
  
  console.log(date.format()); // Log the generated date

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date.format(), { "--date": date.format() }, makeCommits.bind(this, --n));
  });
};

makeCommits(1000);  // Generate 1000 commits within 2022 and 2023
