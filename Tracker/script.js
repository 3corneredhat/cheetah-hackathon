"use strict";
const userSelect = document.getElementById("user");
const stages = document.querySelectorAll(".stage");

// var d = getData();

// console.log(d);
// setUserDropdown(d);

document.addEventListener("DOMContentLoaded", () => {
  updateUserTracker();

  userSelect.addEventListener("change", () => {
    updateUserTracker();
  });

  stages.forEach((stage, index) => {
    stage.addEventListener("click", () => {
      updateTracker(index);
    });
  });
});

// function setUserDropdown(d) {
//   var str = "";

//   for (var i = 0; i < d.length; i++) {
//     str += '<option value="user';
//     str += i + 1 + '">' + d[i].name + "</option>";
//   }
//   document.getElementById("user").innerHTML = str;
// }

function updateUserTracker() {
  const userStatus = getUserStatus();
  stages.forEach((stage, i) => {
    if (i == userStatus) {
      stage.classList.add("stage-active");
    } else {
      stage.classList.remove("stage-active");
    }
  });
}

function updateTracker(index) {
  const stages = document.querySelectorAll(".stage");
  const clickedStage = stages[index];

  if (clickedStage.classList.contains("stage-active")) {
    setUserStatus(index - 1);
  } else {
    setUserStatus(index);
  }

  updateUserTracker();
}

function getUserStatus() {
  const userKey = userSelect.value;
  const userData = JSON.parse(localStorage.getItem(userKey));
  return userData ? userData.status : -1;
}

function setUserStatus(status) {
  const userKey = userSelect.value;
  const userData = { status };
  localStorage.setItem(userKey, JSON.stringify(userData));
}

function getData() {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      // 'data' is now a JavaScript array containing the JSON data
      console.log(data);
    })
    .catch((error) => console.error(error));
}
