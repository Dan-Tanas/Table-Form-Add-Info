// Information Class

class Info {
  constructor(fname, lname, email, phone, book) {
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone = phone;
    this.book = book;
  }
}

// UI

class UI {
  static displayInfo() {
    const infos = Store.getInfo();

    infos.forEach(item => UI.addInfoToList(item));
  }

  static addInfoToList(item) {
    const list = document.querySelector("#info-list");

    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${item.fname}</td>
            <td>${item.lname}</td> 
            <td>${item.email}</td>
            <td>${item.phone}</td>
            <td>${item.book}</td>
            <td><a href="#" class="delete">X</a></td>
        `;

    list.appendChild(row);
  }

  static deleteInfo(e) {
    if (e.classList.contains("delete")) {
      e.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector("#fname").value = "";
    document.querySelector("#lname").value = "";
    document.querySelector("#email").value = "";
    document.querySelector("#phone").value = "";
    document.querySelector("#book").value = "";
  }
}

// Storage
class Store {
  static getInfo() {
    let infos;
    if (localStorage.getItem("infos") === null) {
      infos = [];
    } else {
      infos = JSON.parse(localStorage.getItem("infos"));
    }
    return infos;
  }

  static addInfo(item) {
    const infos = Store.getInfo();
    infos.push(item);

    localStorage.setItem("infos", JSON.stringify(infos));
  }

  static removeInfo(book) {
    const infos = Store.getInfo();

    infos.forEach((item, index) => {
      if (item.book === book) {
        infos.splice(index, 1);
      }
    });

    localStorage.setItem("infos", JSON.stringify(infos));
  }
}

// Display Unfo

document.addEventListener("DOMContentLoaded", UI.displayInfo);

// Add info

document.querySelector("#group-info").addEventListener("submit", e => {
  // Prevent default action

  e.preventDefault();

  // Get Values
  const fname = document.querySelector("#fname").value;
  const lname = document.querySelector("#lname").value;
  const email = document.querySelector("#email").value;
  const phone = document.querySelector("#phone").value;
  const book = document.querySelector("#book").value;

  const info = new Info(fname, lname, email, phone, book);

  // Add info to the ui
  UI.addInfoToList(info);

  // Add info to Store
  Store.addInfo(info);

  UI.clearFields();
});

// Delete Info

document.querySelector("#info-list").addEventListener("click", e => {
  UI.deleteInfo(e.target);

  Store.removeInfo(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
