// const TypeWriter = function(txtElement, words, wait = 3000) {
//   this.txtElement = txtElement;
//   this.words = words;
//   this.txt = '';
//   this.wordIndex = 0;
//   this.wait = parseInt(wait, 10);
//   this.type();
//   this.isDeleting = false;
// }

// // Type Method
// TypeWriter.prototype.type = function() {
//   // Current index of word
//   const current = this.wordIndex % this.words.length;
//   // Get full text of current word
//   const fullTxt = this.words[current];

//   // Check if deleting
//   if(this.isDeleting) {
//     // Remove char
//     this.txt = fullTxt.substring(0, this.txt.length - 1);
//   } else {
//     // Add char
//     this.txt = fullTxt.substring(0, this.txt.length + 1);
//   }

//   // Insert txt into element
//   this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

//   // Initial Type Speed
//   let typeSpeed = 300;

//   if(this.isDeleting) {
//     typeSpeed /= 2;
//   }

//   // If word is complete
//   if(!this.isDeleting && this.txt === fullTxt) {
//     // Make pause at end
//     typeSpeed = this.wait;
//     // Set delete to true
//     this.isDeleting = true;
//   } else if(this.isDeleting && this.txt === '') {
//     this.isDeleting = false;
//     // Move to next word
//     this.wordIndex++;
//     // Pause before start typing
//     typeSpeed = 500;
//   }

//   setTimeout(() => this.type(), typeSpeed);
// }

// ES6 Class
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

// const speed = 200; // The lower the slower

// function updateCounter(counter, target) {
//   let count = +counter.innerText;

//   const increment = () => {
//     const inc = target / speed;
//     count += inc;
//     if (count < target) {
//       counter.innerText = Math.ceil(count); // Round up the count for display
//       setTimeout(increment, 1);
//     } else {
//       counter.innerText = target;
//     }
//   };

//   increment();
// }

// function handleHover() {
//   const counters = this.querySelectorAll('.counter');
//   counters.forEach((counter) => {
//     const target = +counter.getAttribute('data-target');
//     updateCounter(counter, target);
//   });
// }

// function resetCounters() {
//   const counters = this.querySelectorAll('.counter');
//   counters.forEach((counter) => {
//     const initialCount = +counter.getAttribute('data-initial');
//     counter.innerText = initialCount;
//   });
// }

// const statDivs = document.querySelectorAll('#home-b .stats > div');

// statDivs.forEach((div) => {
//   const counters = div.querySelectorAll('.counter');
//   counters.forEach((counter) => {
//     const initialCount = +counter.innerText;
//     counter.setAttribute('data-initial', initialCount);
//   });

//   div.addEventListener('mouseenter', handleHover);
//   div.addEventListener('mouseleave', resetCounters);
// });

const speed = 500; // The lower the slower

function updateCounter(counter, target) {
  let count = +counter.innerText;

  const increment = () => {
    const inc = target / speed;
    count += inc;
    if (count < target) {
      counter.innerText = Math.ceil(count); // Round up the count for display
      setTimeout(increment, 1);
    } else {
      counter.innerText = target;
    }
  };

  increment();
}

function handleIntersect(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        updateCounter(counter, target);
      });
    } else {
      const counters = entry.target.querySelectorAll('.counter');
      counters.forEach((counter) => {
        const initialCount = +counter.getAttribute('data-initial');
        counter.innerText = initialCount;
      });
    }
  });
}

const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5 }); // Trigger when half of the element is visible

const statDivs = document.querySelectorAll('#home-b .stats > div');

statDivs.forEach((div) => {
  const counters = div.querySelectorAll('.counter');
  counters.forEach((counter) => {
    const initialCount = +counter.innerText;
    counter.setAttribute('data-initial', initialCount);
  });

  observer.observe(div);
});
