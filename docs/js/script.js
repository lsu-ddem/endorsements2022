// Spreadsheet for testing
// https://docs.google.com/spreadsheets/d/e/2PACX-1vRrTQGr24mMuDMYDNUgd8-X5L9CJMz9CH2tWoGeD3JFwDJjRWj7NsdImyyUSLtFlPN9v1Pi3gNrfcba/pub?output=csv

// "https://drive.google.com/open?id=1Qy8qFRL6TlZrb6TC3ZJOKdRXctQKHiom"
// https://drive.google.com/uc?id=undefined
// https://drive.google.com/uc?id=1Qy8qFRL6TlZrb6TC3ZJOKdRXctQKHiom
// or thumbnail: https://drive.google.com/thumbnail?id=14hz3ySPn-zBd4Tu3NtY1F05LSGdFfWvp
// "https://docs.google.com/spreadsheets/d/e/2PACX-1vRrTQGr24mMuDMYDNUgd8-X5L9CJMz9CH2tWoGeD3JFwDJjRWj7NsdImyyUSLtFlPN9v1Pi3gNrfcba/pub?output=csv",

let endorsements;

Papa.parse(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRrTQGr24mMuDMYDNUgd8-X5L9CJMz9CH2tWoGeD3JFwDJjRWj7NsdImyyUSLtFlPN9v1Pi3gNrfcba/pub?gid=272174897&single=true&output=csv",
  {
    download: true,
    header: true,
    complete: function (results) {
      console.log(results);
      endorsements = results;
      createStudents();
    }
  }
);

let studentEndorsementDiv = document.getElementById("student-endorsements");

function createStudents(students = endorsements) {
  let row = 0,
    col = 0;
  console.log("Data", students.data);
  let rowDiv = document.createElement("div");
  rowDiv.classList.add("row");
  studentEndorsementDiv.appendChild(rowDiv);

  for (studNumber in students.data) {
    console.log ("live? ", students.data[studNumber].live)
    if (students.data[studNumber].live === "TRUE") {
      let colDiv = document.createElement("div");
      colDiv.classList.add("col");

      let student = students.data[studNumber];
      console.log(student);
      let photoID = student.Picture.split("?id=")[1];
      let photoURL = `https://drive.google.com/uc?id=${photoID}`;
      console.log(photoURL);
      // Testimonial Main Screen
      let studentDiv = document.createElement("div");
      studentDiv.classList.add("testimonial");
      let studentPic = document.createElement("img");
      studentPic.setAttribute("data-modal-target", "#modal" + studNumber);
      studentPic.src = photoURL;
      let studentButton = document.createElement("button");
      studentButton.setAttribute("data-modal-target", "#modal" + studNumber);
      studentButton.classList.add("namex");
      studentButton.innerText = student.Name;
      let studentBio = document.createElement("p");
      studentBio.innerText = student["Brief Bio"];
      studentDiv.appendChild(studentPic);
      studentDiv.appendChild(studentButton);
      studentDiv.appendChild(studentBio);

      rowDiv.appendChild(colDiv);
      colDiv.appendChild(studentDiv);

      // Modal Overlay
      let studentModalDiv = document.createElement("div");
      studentModalDiv.classList.add("modal");
      studentModalDiv.id = "modal" + studNumber;
      let studentModalHeaderDiv = document.createElement("div");
      studentModalHeaderDiv.classList.add("modal-header");
      let studentModalTitleDiv = document.createElement("div");
      studentModalTitleDiv.classList.add("modal-title");
      studentModalTitleDiv.innerText = student.Name;
      let studentModalPic = document.createElement("img");
      studentModalPic.setAttribute("data-close-button", true);
      studentModalPic.src = photoURL;
      let studentModalButton = document.createElement("button");
      studentModalButton.setAttribute("data-close-button", true);
      studentModalButton.classList.add("close-button");
      studentModalButton.innerText = "×";
      let studentModalBio = document.createElement("div");
      studentModalBio.classList.add("modal-body");
      studentModalBio.innerText = student["Brief Bio"];

      studentModalDiv.appendChild(studentModalHeaderDiv);
      studentModalHeaderDiv.appendChild(studentModalTitleDiv);
      studentModalHeaderDiv.appendChild(studentModalButton);
      studentModalHeaderDiv.appendChild(studentModalPic);
      studentModalDiv.appendChild(studentModalBio);

      colDiv.appendChild(studentModalDiv);

      col = col++;
      if (col >= 3) {
        row = row++;
        rowDiv = document.createElement("div");
        rowDiv.classList.add("row");
        studentEndorsementDiv.appendChild(rowDiv);
        col = 0;
      }
    }
  }
  createModalButtons();
}

let openModalButtons, closeModalButtons, overlay

function createModalButtons() {
  openModalButtons = document.querySelectorAll("[data-modal-target]");
  closeModalButtons = document.querySelectorAll("[data-close-button]");
  overlay = document.getElementById("overlay");

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = document.querySelector(button.dataset.modalTarget);
      openModal(modal);
    });
  });

  overlay.addEventListener("click", () => {
    const modals = document.querySelectorAll(".modal.active");
    modals.forEach((modal) => {
      closeModal(modal);
    });
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".modal");
      closeModal(modal);
    });
  });
}

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add("active");
  overlay.classList.add("active");
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove("active");
  overlay.classList.remove("active");
}