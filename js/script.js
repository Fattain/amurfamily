"use strict";

function validation(form) {
  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains("error")) {
      parent.querySelector(".error-label").remove();
      parent.classList.remove("error");
    }
  }

  function createError(input, text) {
    const parent = input.parentNode;
    const errorLabel = document.createElement("label");

    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");

    parent.append(errorLabel);
  }

  let result = true;

  form = document.querySelectorAll("input").forEach((input) => {
    removeError(input);

    if (input.dataset.ruLang) {
      if (!/^\p{sc=Cyrillic}*$/u.test(input.value)) {
        removeError(input);
        createError(input, `Введите на русском!`);
        result = false;
      }
    }
    if (input.dataset.ruLang) {
      if (!/^\S*$/.test(input.value)) {
        removeError(input);
        createError(input, `Без пробелов!`);
        result = false;
      }
    }

    if (input.dataset.minLengthPhone) {
      if (input.value.length < input.dataset.minLengthPhone) {
        removeError(input);
        createError(input, `Некорректно введён номер!`);
        result = false;
      }
    }

    if (input.type == "tel") {
      if (!/^\d+$/.test(input.value)) {
        removeError(input);
        createError(input, `Некорректно введён номер!`);
        result = false;
      }
    }
    if (input.dataset.minLength) {
      if (input.value.length < input.dataset.minLength) {
        removeError(input);
        createError(
          input,
          `Минимальное кол-во символов: ${input.dataset.minLength}`
        );
        result = false;
      }
    }

    if (input.dataset.required == "true") {
      if (input.value == "") {
        removeError(input);
        createError(input, "Поле не заполнено!");
        result = false;
      }
    }
  });

  return result;
}

function makeElementActive(item) {
  if (item.contains("active")) {
    item.remove("active");
  } else {
    item.add("active");
  }
}

document.getElementById("form-response").addEventListener("submit", (event) => {
  event.preventDefault();
  if (validation(this) == true) {
    alert("Ваше сообщение успешно отправлено!");
    location.reload();
  }
});

document.querySelectorAll(".downarrow").forEach((element) => {
  element.addEventListener("click", () => {
    let item = element.closest(".row").nextElementSibling.classList;
    let buttonElement = element.classList;

    makeElementActive(item);
    makeElementActive(buttonElement);
  });
});

document.querySelectorAll(".events .changeButton").forEach((element) => {
  let buttonList = document.querySelectorAll(".events .changeButton");
  let cardsList = document.querySelectorAll(".events .cards");
  element.addEventListener("click", () => {
    let buttonId = element.id;
    let activeCard = document.querySelector(".events .cards.active");

    if (buttonId != activeCard.id) {
      buttonList.forEach((button) => {
        button.classList.remove("active");
      });
      makeElementActive(element.classList);
      activeCard.classList.remove("active");
      cardsList.forEach((card) => {
        if (buttonId == card.id) {
          card.classList.add("active");
        }
      });
    }
  });
});

document.querySelectorAll(".forFamily .changeButton").forEach((element) => {
  let buttonList = document.querySelectorAll(".forFamily .changeButton");
  let cardsList = document.querySelectorAll(".forFamily .cards");
  element.addEventListener("click", () => {
    let buttonId = element.id;
    let activeCard = document.querySelector(".forFamily .cards.active");

    if (buttonId != activeCard.id) {
      buttonList.forEach((button) => {
        button.classList.remove("active");
      });
      makeElementActive(element.classList);
      activeCard.classList.remove("active");
      cardsList.forEach((card) => {
        if (buttonId == card.id) {
          card.classList.add("active");
        }
      });
    }
  });
});

const forFamilyRightBtn = document.querySelector(".forFamily .sliderrightbtn");
const forFamilyLeftBtn = document.querySelector(".forFamily .sliderleftbtn");

forFamilyRightBtn.addEventListener("click", () => {
  let carouselInner = document.querySelector(
    ".forFamily .cards.active .carousel-inner"
  );
  carouselInner.scrollLeft += document.querySelector(
    ".forFamily .active .carousel-item"
  ).clientWidth;
});

forFamilyLeftBtn.addEventListener("click", () => {
  let carouselInner = document.querySelector(
    ".forFamily .cards.active .carousel-inner"
  );
  carouselInner.scrollLeft -= document.querySelector(
    ".forFamily .active .carousel-item"
  ).clientWidth;
});

const eventsRightBtn = document.querySelector(".events .sliderrightbtn");
const eventsLeftBtn = document.querySelector(".events .sliderleftbtn");

eventsRightBtn.addEventListener("click", () => {
  let carouselInner = document.querySelector(
    ".events .cards.active .carousel-inner"
  );
  carouselInner.scrollLeft += document.querySelector(
    ".events .active .carousel-item"
  ).clientWidth;
});

eventsLeftBtn.addEventListener("click", () => {
  let carouselInner = document.querySelector(
    ".events .cards.active .carousel-inner"
  );
  carouselInner.scrollLeft -= document.querySelector(
    ".events .active .carousel-item"
  ).clientWidth;
});

document.querySelectorAll(".forFamily .dropdown-item").forEach((element) => {
  let currentDropItem = document.querySelector(".forFamily .currentdrop");
  element.addEventListener("click", () => {
    let textValue = currentDropItem.textContent;
    let idValue = currentDropItem.id;
    currentDropItem.textContent = element.textContent;
    currentDropItem.id = element.id;
    element.textContent = textValue;
    element.id = idValue;
  });
});

document.querySelectorAll(".events .dropdown-item").forEach((element) => {
  let currentDropItem = document.querySelector(".events .currentdrop");
  element.addEventListener("click", () => {
    let textValue = currentDropItem.textContent;
    let idValue = currentDropItem.id;
    currentDropItem.textContent = element.textContent;
    currentDropItem.id = element.id;
    element.textContent = textValue;
    element.id = idValue;
  });
});
