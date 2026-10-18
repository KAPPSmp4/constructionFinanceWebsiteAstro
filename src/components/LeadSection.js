function sendMessage() {
    const serviceID = "service_ut07nxs";
    const templateID = "template_vftxp6b";

    let params = {
        firstName: document.getElementById("firstName").value,                                  //text
        lastName: document.getElementById("lastName").value,                                    //text
        phone: document.getElementById("phone").value,                                          //tel
        email: document.getElementById("email").value,                                          //email
        householdIncome: document.getElementById("householdIncome").value,                      //number
        employment: document.getElementById("employment").value,                                //selection
        financeType: document.querySelector("input[name='financeType']:checked")?.value,        //radio
        objectType: document.querySelector("input[name='objectType']:checked")?.value,          //radio
        objectAge: document.querySelector("input[name='objectAge']:checked")?.value,            //radio
        useCase: document.querySelector("input[name='useCase']:checked")?.value,                //radio
        plz: document.getElementById("plz").value,                                              //number
        property: document.getElementById("property").value,                                    //number
        livingArea: document.getElementById("livingArea").value,                                //number
        status: document.querySelector("input[name='status']:checked")?.value,                  //radio
        borrower: document.querySelector("input[name='borrower']:checked")?.value,              //radio
        
    }

    emailjs.send(serviceID, templateID, params)
    .then(response => console.log("SUCCESS" + response.status))
    .catch(error => console.log("Error:", error)
    )
}

let formIndex = 0;

const form = document.querySelector("#leadForm");

form?.addEventListener('submit', event => {
    event.preventDefault();
    sendMessage();

    console.log('Email sent successfully');
    form.reset();
    formContinue();
});


function formContinue() {
    const items = document.querySelectorAll(".form-step");

    items[formIndex].classList.remove("active")
    formIndex++;
    if (items[formIndex]) {
        items[formIndex].classList.add("active")
    }

    updateContinueButton();
}

function formReturn() {
    const items = document.querySelectorAll(".form-step");

    items[formIndex].classList.remove("active")
    formIndex--;
    if (items[formIndex]) {
        items[formIndex].classList.add("active")
    }

    updateContinueButton();
}

//---------------------- AI BRO CORNER (SHAME SHAME SHAME)---------------------------//

function validateStep(stepElement) {
    const inputs = stepElement.querySelectorAll("input, select, textarea");

    return [...inputs].every(input => input.checkValidity());
}

const nextButton = document.querySelector("#nextButton");
const returnButton = document.querySelector("#returnButton");

nextButton.addEventListener("click", formContinue)
returnButton.addEventListener("click", formReturn)

function updateContinueButton() {
    const activeStep = document.querySelector(".form-step.active");

    nextButton.disabled = !validateStep(activeStep);

    if (activeStep.id == "step-1") {
        returnButton.disabled = true;
        returnButton.style.display = "none";
    } else {
        returnButton.disabled = false;
        returnButton.style.display = "inline";
    }

    if (activeStep.id == "step-submit") {
        nextButton.disabled = true;
        nextButton.style.display = "none";
    } else {
        nextButton.style.display = "inline";
    }

    if (activeStep.id == "step-confirm") {
        nextButton.disabled = true;
        nextButton.style.display = "none";

        returnButton.disabled = true;
        returnButton.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {

    const allInputs = document.querySelectorAll("input, select, textarea");

    allInputs.forEach(input => {

        input.addEventListener("input", updateContinueButton);
        input.addEventListener("change", updateContinueButton);

    });

    updateContinueButton();
})

