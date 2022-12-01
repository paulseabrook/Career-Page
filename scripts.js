// declare a constant triggers and set it equal to grabbing all li's within the ul of class cool
const triggers = document.querySelectorAll('.cool > li');
// this is our little background div that follows us around
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');
const a = document.querySelectorAll('a');
const x = window.matchMedia('(max-width: 1000px');

function handleEnter() {
  if (x.matches) {
    console.log('This is working');
    this.classList.add('aMove');
  }

  //a.classList.add('aMove');
  // add class of trigger-enter first to "this" which is our list item
  this.classList.add('trigger-enter');
  // add class of trigger-enter-active next but only after 150 milliseconds
  // we stagger these because in order to getBoundingClientRect information, we must have an element on page and not hidden, even if it isn't visible
  setTimeout(
    () =>
      this.classList.contains('trigger-enter') &&
      this.classList.add('trigger-enter-active'),
    150
  );
  // add a class list to background called open which sets opacity to 1
  background.classList.add('open');

  // we add this constant here becauase we need to find the dropdown that exists within this ...  not global
  const dropdown = this.querySelector('.dropdown');
  // get the height, weight, width, etc. infromation about the dropdown
  const dropdownCoords = dropdown.getBoundingClientRect();
  // we do this because somthing could be higher on the document than the nav, so we want these coords as well
  const navCoords = nav.getBoundingClientRect();

  // more info on getBoundingClientRect()
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect

  const coords = {
    width: dropdownCoords.width,
    height: dropdownCoords.height,
    // we must account for if something is added above our nav bar (like the cool H2)
    // therefore, we subtract from the top the distance of the top of document to the top of the navCoords
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left,
  };

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);

  background.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
  // background.style.setProperty("top", `${coords.top}px`);
  // background.style.setProperty("width", `${coords.left}px`);
}

function handleLeave() {
  this.classList.remove('aMove');
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

// for each trigger(li parent) in triggers(li parent), upon the mouse entering (basically hovering), call the handleEnter() function.
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseenter', handleEnter)
);
// same as above, but upon the mouse leaving, call the handleLeave() function
triggers.forEach((trigger) =>
  trigger.addEventListener('mouseleave', handleLeave)
);
