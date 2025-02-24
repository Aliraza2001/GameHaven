        function validateForm() {
            var name = document.getElementById("name").value;
            var phone = document.getElementById("phone").value;
            var email = document.getElementById("email").value;
            var subject = document.getElementById("subject").value;
            var message = document.getElementById("message").value;
            var confirmation = document.getElementById("confirmation");

            if (name === "" || phone === "" || email === "" || subject === "" || message === "") {
                alert("Please fill in all fields.");
                return false;
            }

            if (!validatePhone(phone)) {
                alert("Invalid phone number. Please enter a valid phone number.");
                return false;
            }

            if (!validateEmail(email)) {
                alert("Invalid email address. Please enter a valid email address.");
                return false;
            }

            
            confirmation.style.display = "block";
            document.getElementById("name").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("email").value = "";
            document.getElementById("subject").value = "";
            document.getElementById("message").value = "";

            return false; 
        }

        function validatePhone(phone) {
            var phoneRegex = /^\+?\d{1,3}(\s|-)?\d{1,14}$/;
            return phoneRegex.test(phone);
        }

        function validateEmail(email) {
            var emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
            return emailRegex.test(email);
        }
    