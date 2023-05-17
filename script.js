// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  
  // This function saves the user input in local storage.
  function userInput() {
    $('.saveBtn').on('click', function() {
      const key = $(this).parent().attr('id');
      const value = $(this).siblings('.description').val();
      localStorage.setItem(key, value);
    });
  }
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  
  // Use Day.js to get current hour of the day
  const currentHour = dayjs().format('H');
  console.log(currentHour); // Check console log to see current hour
  
  // This function will change color of each time block indicating past, present, or future relative to the current hour.
  function hourColor() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id); // Parses a string argument, returns an integer
      console.log(hourBlock); // Check console log to see hourBlock as an integer
      $(this).toggleClass('past', hourBlock < currentHour);
      $(this).toggleClass('present', hourBlock === currentHour);
      $(this).toggleClass('future', hourBlock > currentHour);
    });
  }

  // This function will update the color of each time block to indicate whether it is in the past, present, or future.
  function updateColor() {
    $('.time-block').each(function() {
      const hourBlock = parseInt(this.id);
      if (hourBlock == currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else if (hourBlock < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    })
  }

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  // This function gets user input saved in local storage and set the values in textarea.
  $('.time-block').each(function() {
    const key = $(this).attr('id');
    const value = localStorage.getItem(key);
    $(this).children('.description').val(value);
  });

  // TODO: Add code to display the current date in the header of the page.
  
  // This function displays the current date in the format to include day of week, month, day of month, year, and time.
  function getCurrentDate() {
    const currentDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    $('#currentDay').text(currentDate);
  }

  // Call functions to have working page
  getCurrentDate();
  userInput();
  hourColor();
  updateColor();
});
