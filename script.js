// const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
// const quoteSection = document.getElementById("quote");
// const userInput = document.getElementById("quote-input");

// let quote = "",
//   time = 60,
//   timer = "",
//   mistakes = 0;

// quoteSection.oncopy = function (event) {
//   event.preventDefault();
//   return false;
// };

// const renderNewQuote = async () => {
//   try {
//     const { content } = await (await fetch(quoteApiUrl)).json();
//     renderQuote(content);
//   } catch (error) {
//     console.error('Error fetching quote:', error.message);
//   }
// };

// const renderQuote = (quote) => {
//   quoteSection.innerHTML = [...quote].map(char => `<span class='quote-chars'>${char}</span>`).join('');
// };

// userInput.addEventListener("input", () => {
//   let quoteChars = Array.from(document.querySelectorAll(".quote-chars"));
//   let userInputChars = userInput.value.split("");

//   quoteChars.forEach((char, index) => {
//     if (char.innerText === userInputChars[index]) {
//       char.classList.add("success");
//     } else if (!userInputChars[index]) {
//       char.classList.remove("success", "fail");
//     } else {
//       if (!char.classList.contains("fail")) {
//         mistakes += 1;
//         char.classList.add("fail");
//         document.getElementById("mistakes").innerText = mistakes;
//       }
//     }
//   });

//   if (quoteChars.every((element) => element.classList.contains("success"))) {
//     displayResult();
//   }
// });


// function updateTimer() {
//   if (time == 0) {
//     //End test if timer reaches 0
//     displayResult();
//   } else {
//     document.getElementById("timer").innerText = --time + "s";
//   }
// }


// const timeReduce = () => {
//   time = 60;
//   timer = setInterval(updateTimer, 1000);
// };

// const displayResult = () => {

//   document.querySelector(".result").style.display = "block";
//   clearInterval(timer);
//   document.getElementById("stop-test").style.display = "none";
//   userInput.disabled = true;
//   let timeTaken = 1;
//   if (time != 0) {
//     timeTaken = (60 - time) / 100;
//   }
//   document.getElementById("wpm").innerText =
//     (userInput.value.length / 5 / timeTaken).toFixed(2) + " wpm";
//   document.getElementById("accuracy").innerText =
//     Math.round(
//       ((userInput.value.length - mistakes) / userInput.value.length) * 100
//     ) + " %";
// };


// const startTest = () => {
//   mistakes = 0;
//   timer = "";
//   userInput.disabled = false;
//   timeReduce();
//   document.getElementById("start-test").style.display = "none";
//   document.getElementById("stop-test").style.display = "block";
// };

// window.onload = () => {
//   userInput.value = "";
//   document.getElementById("start-test").style.display = "block";
//   document.getElementById("stop-test").style.display = "none";
//   userInput.disabled = true;
//   renderNewQuote();
// };

$(document).ready(function () {
  const quoteApiUrl = "https://api.quotable.io/random?minLength=80&maxLength=100";
  const quoteSection = $("#quote");
  const userInput = $("#quote-input");
  let quote = "",
    time = 60,
    timer = "",
    mistakes = 0;

  quoteSection.oncopy = function (event) {
    event.preventDefault();
    return false;
  };

  const renderNewQuote = async () => {
    try {
      const { content } = await (await fetch(quoteApiUrl)).json();
      renderQuote(content);
    } catch (error) {
      console.error('Error fetching quote:', error.message);
    }
  };

  const renderQuote = (quote) => {
    quoteSection.html([...quote].map(char => `<span class='quote-chars'>${char}</span>`).join(''));
  };

  userInput.on("input", function () {
    let quoteChars = $(".quote-chars");
    let userInputChars = userInput.val().split("");

    quoteChars.each(function (index, char) {
      char = $(char);
      if (char.text() === userInputChars[index]) {
        char.addClass("success");
      } else if (!userInputChars[index]) {
        char.removeClass("success fail");
      } else {
        if (!char.hasClass("fail")) {
          mistakes += 1;
          char.addClass("fail");
          $("#mistakes").text(mistakes);
        }
      }
    });

    if (quoteChars.toArray().every((element) => $(element).hasClass("success"))) {
      displayResult();
    }
  });

  function updateTimer() {
    if (time == 0) {
      displayResult();
    } else {
      $("#timer").text(--time + "s");
    }
  }

  const timeReduce = () => {
    time = 60;
    timer = setInterval(updateTimer, 1000);
  };

  const displayResult = () => {
    $(".result").css("display", "block");
    clearInterval(timer);
    $("#stop-test").css("display", "none");
    userInput.prop("disabled", true);
    let timeTaken = 1;
    if (time != 0) {
      timeTaken = (60 - time) / 100;
    }
    $("#wpm").text((userInput.val().length / 5 / timeTaken).toFixed(2) + " wpm");
    $("#accuracy").text(Math.round(((userInput.val().length - mistakes) / userInput.val().length) * 100) + " %");
  };

  const startTest = () => {
    mistakes = 0;
    timer = "";
    userInput.prop("disabled", false);
    timeReduce();
    $("#start-test").css("display", "none");
    $("#stop-test").css("display", "block");
  };

  window.onload = () => {
    userInput.val("");
    $("#start-test").css("display", "block");
    $("#stop-test").css("display", "none");
    userInput.prop("disabled", true);
    renderNewQuote();
  };

  $("#start-test").on("click", startTest);
  $("#stop-test").on("click", displayResult);
});