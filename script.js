/* Load header for every page
* @Desc: include files for header and footer in every page
*/
function loadInclude() {
    let includes = document.querySelectorAll('[data-header-content],[data-footer-content]');
    let totalIncludes = includes.length;
    let loadedCount = 0;
    includes.forEach((element) => {
        // set header
        let file = element.getAttribute('data-header-content') || element.getAttribute('data-footer-content');
        fetch(file)
            .then((response) => response.text())
            .then((data) => {
                element.outerHTML = data;
                loadedCount += 1;
                if (loadedCount === totalIncludes) {// Execute additional scripts only after all includes have loaded
                    // set menu button color
                    buttonColorControl();
                    // set footer
                    let footer = document.getElementById('footer');
                    if(footer){
                        if(document.body.getAttribute('data-footer-background')==='true'){
                            footer.classList.add('footer-background');
                        }
                    }     
                    // load social media buttons for footer
                    replicateSocialMediaButtons();
                }
            });
    });
     
}

document.addEventListener('DOMContentLoaded', loadInclude);

/* menu button color control
*  @Desc: In the header menu,  set font color as lightblack(#1E1E1E) for current page and grey(#1E1E1E80) for the rest pages.
*/
function buttonColorControl() {
    var currentPage = window.location.pathname.split("/").pop();
    console.log(currentPage);
    var navs = document.querySelectorAll("#menu a")

    navs.forEach(function (link) {
        if (link.getAttribute("href") === currentPage) {
            link.style.color = "#1E1E1E";
        } else {
            link.style.color = "#1E1E1E80";
        }
    });
};

/* 
*  @Desc: Replicate social media share buttons in the header for reuse in the footer
*/
function replicateSocialMediaButtons() {
    const headerSocialMedia = document.getElementById('social-media-share-buttons');
    const footerSocialMedia = document.getElementById('social-media-share-buttons-footer');

    if (headerSocialMedia && footerSocialMedia) {
        footerSocialMedia.innerHTML = headerSocialMedia.innerHTML;

        document.querySelectorAll('#social-media-share-buttons-footer .fa').forEach(function (button) {
            button.style.color = '#1E1E1E80';
            button.style.fontSize = '45px';
        });
    } else {
        console.warn('Social media share buttons not found in header or footer.');
    }
};

// flip image 
document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('.aboutme-1-part').forEach(function (image) {
        image.addEventListener('click', function () {
            this.querySelector('.image-container').classList.toggle('is-flipped');
        });
    });
});

/* See more info 
* @Desc: in drinks - photo gallery, get a description window for every type of drinks  when clicking "read more"
*        Refer to https://www.w3schools.com/howto/howto_css_modals.asp
*/
function checkMore () {
    document.querySelectorAll('.material-icons').forEach(function (item) {
        item.addEventListener('click', function () {
            var modalId = item.getAttribute('data-modal');
            var modal = document.querySelector(modalId);
            modal.style.display = 'block';
        });
    });

    var closeButtons = document.querySelectorAll('.modal .close');

    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var modal = button.closest('.modal');
            modal.style.display = 'none';
        });
    });

    window.addEventListener('click', function (event) {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
};

window.addEventListener('load',checkMore);

/* Prev and Next check button
* @ Desc: in drinks - photo gallery, we need buttons to check previous and next modal description.
*/
function openModal(modalNumber) {
    let totalModals = document.querySelectorAll('.modal').length;
    let modal = document.getElementById('modal' + modalNumber);
    let prevButton = modal.querySelector('.prev');
    let nextButton = modal.querySelector('.next');

    modalNumber == 1 ? prevButton.style.display = 'none':prevButton.style.display = 'block';
    modalNumber == totalModals ? nextButton.style.display = 'none': nextButton.style.display = 'block';;

    if (modal) {
        modal.style.display = 'block';
    }
}

function changeModalSlide(direction, modalNumber) {
    closeModal(modalNumber);

    let totalModals = document.querySelectorAll('.modal').length;
    let newModalNumber = modalNumber + direction;

    if (newModalNumber > totalModals) {
        newModalNumber = 1; // Wrap to the first one.
    } else if (newModalNumber < 1) {
        newModalNumber = totalModals; // Wrap to the last one.
    }

    openModal(newModalNumber);
}

function closeModal(modalNumber) {
    let modal = document.getElementById('modal' + modalNumber);
    if (modal) {
        modal.style.display = 'none';
    }
}

document.querySelectorAll('.prev').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); //prevents propagation of closeButton from being called when clicking Prev and Next
        let modalNumber = parseInt(button.closest('.modal').id.replace('modal', ''), 10);
        changeModalSlide(-1, modalNumber);
    });
});

document.querySelectorAll('.next').forEach(function(button) {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); 
        let modalNumber = parseInt(button.closest('.modal').id.replace('modal', ''), 10);
        changeModalSlide(1, modalNumber);
    });
});

function floatWinControl() {
    const floatWindow = document.getElementById("float-window");
    const closeButton = document.querySelector(".closebtn");
    const submitButton = document.getElementById("submit-survey");
    const survey = document.getElementById("survey");

    // Check if the elements exist before setting the onclick events
    if (floatWindow) {
        floatWindow.onclick = function () {
            if (survey) {
                survey.style.display = "block";
            }
        };
    }

    if (closeButton) {
        closeButton.onclick = function (event) {
            event.stopPropagation(); // Prevent event bubbling to the float window
            closeFloatWindow();
        };
    }

    if (submitButton) {
        submitButton.onclick = function (event) {
            submitSurvey(event);
        };
    }
}

function closeFloatWindow() {
    const floatWindow = document.getElementById("float-window");
    if (floatWindow) {
        floatWindow.style.display = 'none';
    }
}

function submitSurvey(event) {
    // Check if any option is selected
    const selectedOption = document.querySelector('input[name="channel"]:checked');
    if (selectedOption) {
        console.log(selectedOption.value);
        alert("Submission successful! Thank you so much🤗");
    } else {
        alert("Please select a discovery channel!");
    }

    closeFloatWindow();
}

window.addEventListener('load', floatWinControl);


function toggleSidebar() {
    var sidebarCSS = document.getElementById('sidebar-style');
    sidebarCSS.disabled = !sidebarCSS.disabled;
}

// function toggleSidebar() {
//     var sidebarCSS = document.getElementById('sidebar-style');
//     sidebarCSS.disabled = !sidebarCSS.disabled;
//     localStorage.setItem('sidebarEnabled', !sidebarCSS.disabled);
// }


// document.addEventListener('DOMContentLoaded', function() {
//     var sidebarCSS = document.getElementById('sidebar-style');
//     var sidebarEnabled = localStorage.getItem('sidebarEnabled') === 'true';

//     sidebarCSS.disabled = !sidebarEnabled;
// });




