// create function
function getRepresentatives() {
  // you can access the html document like this
  const addressInput = document.getElementById('address');
  const address = addressInput.value;
  // api request below -- these are a chain of promises 
  fetch(`http://127.0.0.1:8000/representatives?address=${encodeURIComponent(address)}`) // use backticks for template literals for dynamic api
  //a method of a promise that gets json response and calls displayResults()function when response is valid
    .then(response => response.json())
    .then(data => {
      displayResults(data);
    })
}

function displayResults(data) {
  // i'm assigning the variable and aligning html doc to js - results contiainer & results
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // Clear previous results
  // i'm now creating html documents dynamically while looping over reps
  // for each rep i'm cerating a new div element that holds deets of each rep
  data.forEach(representative => {
    const representativeElement = document.createElement('div');
    // sets the html content inside the newly created div element
    representativeElement.innerHTML = `
            <h3>${representative.office_name}</h3>
            <p>Name: ${representative.name}</p>
            <p>Party: ${representative.party}</p>
            <p>Address: ${representative.address.street}, ${representative.address.city}, ${representative.address.state} ${representative.address.zip}</p>
            <p>Phones: ${representative.phones}</p>
            <p>URLs: ${representative.urls}</p>
            <hr>
        `;
        // this takes the representative information and appends it to the end of the inside of the results container
        // best for displaying a list
    resultsContainer.appendChild(representativeElement);
  });
}