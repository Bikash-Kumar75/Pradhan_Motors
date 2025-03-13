const scriptURL = 'https://script.google.com/macros/s/AKfycbzU9wYLgiHSzhKy4tS3DRuBCPclVGjjMx6JTp0ufzNMrMn6xxYLE2jgmevufX8AGvsC/exec';
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")


form.addEventListener('submit', e => {
    e.preventDefault();

    // Show the message immediately
    msg.innerHTML = "Entry Submitting...";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = ""; // Clear the message before showing the alert
            alert("Entry Submitted Successfully!"); // Show success alert
            form.reset();
        })
        .catch(error => {
            msg.innerHTML = ""; // Clear the message on error too
            alert("Error submitting form!"); // Show error alert
            console.error('Error!', error.message);
        });
});


