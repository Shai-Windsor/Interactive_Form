/*
The interactive form lets you enter some information, select a T-shirt,
and select activities. Any errors are automatically
shown as you interact with or submit the form.
*/

const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#mail');
const titleSelect = document.querySelector('#title');
const titleInput = document.querySelector('#other-title');
const designSelect = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const activities = document.querySelector('.activities');
const activityLabels = activities.querySelectorAll('label');
const paymentSelect = document.querySelector('#payment');
const creditCardDiv = document.querySelector('#credit-card');
const cardNumberInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const cvvInput = document.querySelector('#cvv');
const otherPaymentOptions = paymentSelect.parentNode.querySelectorAll('p');

// Immediatly focuses on the name input, hides the
// job role input, and hides the color select
nameInput.focus();
titleInput.style.display = 'none';
colorSelect.parentNode.style.display = 'none';

// Makes the job role input visible if
// "other" is the selected job role
titleSelect.addEventListener("change", () => {
  if (titleSelect.value === 'other') {
    titleInput.style.display = '';
  } else {
    titleInput.style.display = 'none';
  }
});

designSelect.addEventListener("change", () => {

  // Makes the color select visible and hides the "Select Theme" option
  colorSelect.parentNode.style.display = '';
  designSelect.options[0].style.display = 'none';

  // Changes what colors are visible in the color
  // select depending on the selected theme
  function colorDisplayChange(string, i) {
    if (colorSelect.options[i].textContent.includes(string)) {
      colorSelect.options[i].style.display = '';

      // Changes the selected color so that the color from the other
      // theme isn't still selected when switching themes
      colorSelect.selectedIndex = i;
    } else {
      colorSelect.options[i].style.display = 'none';
    }
  }

  // The for loop is in reverse order so that color at the
  // top of the list gets selected when switching themes
  for (let i = colorSelect.options.length - 1; i >= 0; i--) {
    if (designSelect.value === 'js puns') {
      colorDisplayChange('JS Puns', i);
    } else if (designSelect.value === 'heart js') {
      colorDisplayChange('JS shirt', i);
    }
  }
});

let totalCost = 0;

// Creates an element that will store the cost
h4 = document.createElement('h4');
activities.appendChild(h4);

for (let i = 0; i < activityLabels.length; i++) {
  activityLabels[i].addEventListener("change", (e) => {
    const labelInput = e.target;

    // Returns the time and day from the label's text
    function findTime(label) {
      const activityText = label.textContent;
      const activityTime = activityText.substring(activityText.indexOf("—") + 2, activityText.indexOf(","));
      return activityTime;
    }

    // Returns the cost without the dollar sign from the label's text
    function findCost(label) {
      const activityText = label.textContent;
      const activityCost = activityText.substring(activityText.indexOf("$") + 1);
      return activityCost;
    }


    for (let j = 0; j < activityLabels.length; j++) {
      // Only continues if the two times are the same, and the
      // selected label isn't the same as the one in the loop
      if (activityLabels[i] != activityLabels[j] && findTime(activityLabels[i]) === findTime(activityLabels[j])) {

        // Disables the input and makes the label look disabled
        if (activityLabels[j].querySelector('input').disabled) {
          activityLabels[j].querySelector('input').disabled = false;
          activityLabels[j].style.color = '';
        } else {
          activityLabels[j].querySelector('input').disabled = true;
          activityLabels[j].style.color = 'grey';
        }
      }
    }

    const activityCost = parseInt(findCost(activityLabels[i]));

    // Adds the activity cost to the total cost depending
    // on if the label is being checked or unchecked
    if (labelInput.checked) {
      totalCost += activityCost;
    } else {
      totalCost -= activityCost;
    }

    h4.textContent = `Total: $${totalCost.toString()}`;

    // Makes the cost invisible if it is $0
    if (totalCost === 0) {
      h4.style.display = 'none';

      // Adds the error text so it constantly updates
      activities.querySelector('legend').textContent = 'Please select an activity';
    } else {
      h4.style.display = '';

      // Removes the error text, and changes the color back to its original color
      activities.querySelector('legend').textContent = 'Register for Activities';
      activities.querySelector('legend').style.color = '';
    }
  });
}

let paypalDiv;
let bitcoinDiv;

// Gets the paypalDiv and bitcoinDiv without editing the html
for (let i = 0; i < otherPaymentOptions.length; i++) {
  if (otherPaymentOptions[i].textContent.includes('PayPal')) {
    paypalDiv = otherPaymentOptions[i].parentNode;
  } else if (otherPaymentOptions[i].textContent.includes('Bitcoin')) {
    bitcoinDiv = otherPaymentOptions[i].parentNode;
  }
}

paypalDiv.style.display = 'none';
bitcoinDiv.style.display = 'none';

// Makes only the selected payment option visible
paymentSelect.addEventListener("change", () => {
  paymentSelect.options[0].style.display = 'none';
  if (paymentSelect.value === 'credit card') {
    creditCardDiv.style.display = '';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = 'none';
  } else if (paymentSelect.value === 'paypal') {
    creditCardDiv.style.display = 'none';
    paypalDiv.style.display = '';
    bitcoinDiv.style.display = 'none';
  } else if (paymentSelect.value === 'bitcoin') {
    creditCardDiv.style.display = 'none';
    paypalDiv.style.display = 'none';
    bitcoinDiv.style.display = '';
  }
});

// Resets an input and its label back to its original color and text
function resetInput(element, text) {
  element.previousElementSibling.textContent = text;
  element.previousElementSibling.style.color = '';
  element.style.borderColor = '';
}

// Each onkeyup event changes the text of the label depending on
// what the specific error is, or resets it if there is none
nameInput.onkeyup = () => {
  if (nameInput.value === '') {
    nameInput.previousElementSibling.textContent = 'Please enter your name';
  } else {
    resetInput(nameInput, 'Name:');
  }
}

emailInput.onkeyup = () => {
  const emailExtension = emailInput.value.substr(emailInput.value.indexOf('@'));
  if (emailInput.value === '') {
    emailInput.previousElementSibling.textContent = 'Please enter your email';
  } else if (!emailInput.value.includes('@') || !emailExtension.includes('.')) {
    emailInput.previousElementSibling.textContent = 'Invalid email';
  } else {
    resetInput(emailInput, 'Email:');
  }
}

cardNumberInput.onkeyup = () => {
  if (cardNumberInput.value === '') {
    cardNumberInput.previousElementSibling.textContent = 'Please enter a credit card number';
  } else if (isNaN(cardNumberInput.value)) {
    cardNumberInput.previousElementSibling.textContent = 'Credit card number must be a number';
  } else if (cardNumberInput.value.length < 13 || cardNumberInput.value.length > 16) {
    cardNumberInput.previousElementSibling.textContent = 'Credit card number must be between 13 and 16 digits';
  } else {
    resetInput(cardNumberInput, 'CardNumber:');
  }
}

zipCodeInput.onkeyup = () => {
  if (zipCodeInput.value === '') {
    zipCodeInput.previousElementSibling.textContent = 'Please enter a zip code';
  } else if (isNaN(zipCodeInput.value)) {
    zipCodeInput.previousElementSibling.textContent = 'Zip code must be a number';
  } else if (zipCodeInput.value.length != 5) {
    zipCodeInput.previousElementSibling.textContent = 'Zip code must be 5 digits';
  } else {
    resetInput(zipCodeInput, 'Zip Code:');
  }
}

cvvInput.onkeyup = () => {
  if (cvvInput.value === '') {
    cvvInput.previousElementSibling.textContent = 'Please enter a CVV';
  } else if (isNaN(cvvInput.value)) {
    cvvInput.previousElementSibling.textContent = 'CVV must be a number';
  } else if (cvvInput.value.length != 3) {
    cvvInput.previousElementSibling.textContent = 'CVV must be 3 digits';
  } else {
    resetInput(cvvInput, 'CVV:');
  }
}

// Changes the color of an input's border and label to red
function errorInput(element, text, e) {
  e.preventDefault();

  // Changes the label's text to the desired string since
  // the user may submit the form before typing anything
  if (element.value === '') {
    element.previousElementSibling.textContent = text;
  }
  element.style.borderColor = 'red';
  element.previousElementSibling.style.color = 'red';
}

// Stops the form from submitting if there is an issue,
// also adds a message if there are blank fields
form.addEventListener("submit", (e) => {
  const emailExtension = emailInput.value.substr(emailInput.value.indexOf('@'));

  if (nameInput.value === '') {
    errorInput(nameInput, 'Please enter your name', e);
  }
  if (!emailInput.value.includes('@') || !emailExtension.includes('.')) {
    errorInput(emailInput, 'Please enter your email', e);
  }
  if (totalCost === 0) {
    // The errorInput() function doesn't work for this one, so it has its own code
    e.preventDefault();
    activities.querySelector('legend').textContent = 'Please select an activity';
    activities.querySelector('legend').style.color = 'red';
  }
  if (paymentSelect.value === 'credit card' || paymentSelect.value === 'select_method') {
    if (isNaN(cardNumberInput.value) || cardNumberInput.value.length < 13 || cardNumberInput.value.length > 16) {
      errorInput(cardNumberInput, 'Please enter a credit card number', e);
    }
    if (isNaN(zipCodeInput.value) || zipCodeInput.value.length != 5) {
      errorInput(zipCodeInput, 'Please enter a zip code', e);
    }
    if (isNaN(cvvInput.value) || cvvInput.value.length != 3) {
      errorInput(cvvInput, 'Please enter a CVV', e);
    }
  }
});
