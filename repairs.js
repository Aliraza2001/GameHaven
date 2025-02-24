const repairButton = document.getElementById("repair-button");
const repairForm = document.getElementById("repair-form");
const submitButton = document.getElementById("submit-button");
const formResponse = document.getElementById("form-response");

let isFormVisible = false; 

repairButton.addEventListener("click", function(event) {
  event.preventDefault(); 
  isFormVisible = !isFormVisible; 
  repairForm.style.display = isFormVisible ? "block" : "none";
});

submitButton.addEventListener("click", function(event) {
  event.preventDefault(); 
  const selectedDevice = document.getElementById("device-select").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  
  console.log("Selected device:", selectedDevice);
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Phone:", phone);

  
  formResponse.textContent = "We are on it! A representative will contact you shortly.";
  formResponse.style.display = "block";

  
  document.getElementById("device-select").value = "";
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("phone").value = "";

  
  setTimeout(function() {
    repairForm.style.display = "none";
    formResponse.style.display = "none";
    isFormVisible = false;
  }, 3000);
});