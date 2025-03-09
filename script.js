const scriptURL = 'https://script.google.com/macros/s/AKfycbzU9wYLgiHSzhKy4tS3DRuBCPclVGjjMx6JTp0ufzNMrMn6xxYLE2jgmevufX8AGvsC/exec';
const form = document.forms['submit-to-google-sheet']
const msg = document.getElementById("msg")

form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "Entry Submited Successfully!"
            setTimeout(function () {
                msg.innerHTML = ""
            }, 2000)
            form.reset()
        })
        .catch(error => console.error('Error!', error.message))
})