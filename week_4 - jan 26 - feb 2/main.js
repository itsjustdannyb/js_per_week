const dropArea = document.getElementById("drop-area");
const fileInput = document.getElementById("file-input");
const statusText = document.getElementById("status");

// prevent default drag behaviours
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
  dropArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
  {
    e.preventDefault();
    e.stopPropagation();
  }
}

// highlight drop area when a file is dragged over it
["drag"];
