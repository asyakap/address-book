// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

Contact.prototype.findAddress = function (id) {
  if (this.addresses[id] !== undefined) {
      return this.addresses[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

Address.prototype.addAddress = function(address) {
  this.address = address;
};



// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, allAddresses) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.allAddresses = allAddresses;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// Business Logic for Address
function Address(streetAddress, typeOfAddress) {
  this.address = streetAddress;
  this.typeOfAddress = typeOfAddress;
}

Address.prototype.fullAddress = function() {
  return this.address + " - " + this.typeOfAddress;
}



// User Interface Logic ---------
let addressBook = new AddressBook();
let address = new Address();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  console.log(allAddresses);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".addresses").innerText = contact.allAddresses;

  let finalAddresses = [0];
  allAddresses.forEach(function(element) { 
    if (typeof element === "number") {
      finalAddresses.push(element);
    } else {
      finalAddresses.push(Object.values(element));
    }
  });
  console.log(finalAddresses);
  console.log("target.id is " + event.target.id);
  let index2 = finalAddresses.indexOf(parseInt(event.target.id));
  let index1 = finalAddresses.indexOf(event.target.id - 1);
  console.log("index1 " + index1);
  console.log("index2 " + index2);
  console.log(finalAddresses + "this is final addresses");
  document.querySelector(".addresses").innerText = finalAddresses.slice(index1 + 1, index2);
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, allAddresses);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  index += 1;
  allAddresses.push(index);
  console.log("index of submission" + index);
}

function handleAddressSubmission(event) {
  event.preventDefault();
  const inputtedAddress = document.querySelector("input#new-address").value;
  const inputtedTypeOfAddress = document.getElementById("address-type").value;
  let newAddress = new Address(inputtedAddress, inputtedTypeOfAddress);
  allAddresses.push(newAddress);
  document.querySelector("input#new-address").value = null;
  document.getElementById("address-type").value = null;
}

let allAddresses = [];
let index = 0;

window.addEventListener("load", function (){
  
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.getElementById("btn").addEventListener("click", handleAddressSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);

});