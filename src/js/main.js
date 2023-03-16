// ********** rodo modal ************ //

const handleRodoModal  = () => {
    const modalBtn = document.querySelector(".modal");
    const modal = document.querySelector(".modal-overlay");
    const closeBtn = document.querySelector(".close-btn");

    modalBtn.addEventListener("click", function () {
        modal.classList.add("open-modal");
      });
    closeBtn.addEventListener("click", function () {
        modal.classList.remove("open-modal");
      });
}

handleRodoModal();


// ********** links ************
const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
    const linksHeight = links.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    if (containerHeight === 0) {
        linksContainer.style.height = `${linksHeight}px`;
    } else {
        linksContainer.style.height = 0;
    }
});

// ********** fix navbar ************

const navbar = document.getElementById("nav");
const topLink = document.querySelector(".top-link");

window.addEventListener("scroll", function () {
    const scrollHeight = window.pageYOffset;
  const navHeight = navbar.getBoundingClientRect().height;
  if (scrollHeight > navHeight) {
      navbar.classList.add("fixed-nav");
    } else {
        navbar.classList.remove("fixed-nav");
    }
    // go back to top link
    
    if (scrollHeight > 500) {
        topLink.classList.add("show-link");
    } else {
        topLink.classList.remove("show-link");
    }
});


// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll(".scroll-link");
scrollLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        // prevent default
    e.preventDefault();
    // navigate to specific point
    const id = e.currentTarget.getAttribute("href").slice(1);
    const element = document.getElementById(id);
    
    const navHeight = navbar.getBoundingClientRect().height;
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const fixedNav = navbar.classList.contains("fixed-nav");
    let position = element.offsetTop - navHeight;
    
    if (!fixedNav) {
        position = position - navHeight;
    }
    if (navHeight > 82) {
        position = position + containerHeight;
    }
    
    window.scrollTo({
        left: 0,
      top: position,
    });
    // close
    linksContainer.style.height = 0;
});
});


// ********** contact form ************
const button = document.getElementById('sendMessage');
const rodoCheck = document.getElementById('title');
const contactModal = document.querySelector('.contact-modal');
const nameInput = document.querySelector('.required-name-message');
const mailInput = document.querySelector('.required-mail-message');
const phoneInput = document.querySelector('.required-phone-message');

button.addEventListener('click', function sendMail(){
    let params = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        tel: document.getElementById('tel').value,
        title: document.getElementById('title').value,
        message: document.getElementById('message').value,
    }

    const serviceID = 'service_dtw9lsb';
    const templateID = 'template_4rrr91a';
    if(params.name === ''){
        console.log('error-name');
        nameInput.classList.add('show-message');
    } 
    if (params.email === ''){
        console.log('error-email');
        mailInput.classList.add('show-message');
    }
    if (params.tel === ''){
        console.log('error-phone');
        phoneInput.classList.add('show-message');
    }
    else {
        console.log(params.name, params.email)
        nameInput.classList.remove('show-message');
        mailInput.classList.remove('show-message');
        phoneInput.classList.remove('show-message');
        emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('tel').value = '';
                document.getElementById('title').value = '';
                document.getElementById('message').value = '';
                console.log(res);
                contactModal.classList.add('show-modal');
               
            })
        .catch((err) => console.log(err));
    }
})

const closeBtn = document.querySelector('.close-modal');

closeBtn.addEventListener('click' , function closeModal(){
    contactModal.classList.remove('show-modal');
})


// ********** set date ************ //
const date = document.getElementById("date");
date.innerHTML = new Date().getFullYear();



// ********** count down ************ //

const timeLeft = document.getElementById('time-left')

//month day year
const courseDate = new Date('04/01/2023 17:00:00');

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let timerId;

function countDown() {
  const today = new Date();
  const timeSpan = courseDate - today;

  if (timeSpan <= -day) {
    timeLeft.innerHTML = 'Kurs obecnie trwa! Wkrótce termin nowego!';
    clearInterval(timerId);
    return
  }

  if (timeSpan <= 0) {
    timeLeft.innerHTML = 'Rozpoczynamy Kurs!!';
    clearInterval(timerId);
    return
  }


  const days = Math.floor(timeSpan / day);
  const hours = Math.floor((timeSpan % day) / hour);
  const minutes = Math.floor((timeSpan % hour) / minute);
  const seconds = Math.floor((timeSpan % minute) / second);

  timeLeft.innerHTML = days + 'dni ' + hours + 'godzin ' + minutes + 'minut ' + seconds + 'sekund';
}

timerId = setInterval(countDown, second);


// ********** galerry ************ //



const slideGallery =  () => {
    const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});
let counter = 0;
nextBtn.addEventListener("click", function () {
  counter++;
  slide();
});

prevBtn.addEventListener("click", function () {
  counter--;
  slide();
});

function slide() {
  if (counter < slides.length - 1) {
    nextBtn.style.display = "block";
  } else {
    nextBtn.style.display = "none";
  }
  if (counter > 0) {
    prevBtn.style.display = "block";
  } else {
    prevBtn.style.display = "none";
  }
  slides.forEach(function (slide) {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
}

prevBtn.style.display = "none";
}

slideGallery();