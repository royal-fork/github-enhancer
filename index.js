import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

// Set date range: April 1 to June 30, 2025
const startDate = moment("2025-04-01");
const endDate = moment("2025-06-30");

const markCommit = (date) => {
  const data = {
    date: date.format(),
  };

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(date.format("YYYY-MM-DD HH:mm:ss"), {
        "--date": date.format(),
      })
      .push();
  });
};

const makeCommits = (n) => {
  if (n === 0) return simpleGit().push();

  const daysRange = endDate.diff(startDate, "days");
  const offsetDays = random.int(0, daysRange);
  const commitDate = moment(startDate).add(offsetDays, "days");

  const data = {
    date: commitDate.format(),
  };

  console.log(`✅ Commit scheduled on: ${commitDate.format("YYYY-MM-DD")}`);

  jsonfile.writeFile(path, data, () => {
    simpleGit()
      .add([path])
      .commit(commitDate.format("YYYY-MM-DD HH:mm:ss"), {
        "--date": commitDate.format(),
      }, makeCommits.bind(this, --n));
  });
};

makeCommits(120); // Create 120 commits between Apr 1 and Jun 30, 2025
