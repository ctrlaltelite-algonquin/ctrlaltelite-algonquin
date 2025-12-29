import Swup from 'https://unpkg.com/swup@4?module';
const swup = new Swup({debugMode: true});

let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if(entry.isIntersecting)
        {
            entry.target.classList.add('tile-card-show');
        }
        else
        {
            entry.target.classList.remove('tile-card-show');
        }
    });
});

function observer_refresh()
{
    if(observer) observer.disconnect();
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry)
            if(entry.isIntersecting)
            {
                entry.target.classList.add('tile-card-show');
            }
            else
            {
                entry.target.classList.remove('tile-card-show');
            }
        });
    });

}

// In app.js
function initializeObservers() {
    // Check if the page is the specific page you want
    if (window.location.pathname.endsWith('/team')) {
        console.log("AwsomeSauce");
        observer_refresh(); // Call the function only if we're on the specific page
    }

    const hiddenElements = document.querySelectorAll('.tile-card');
    hiddenElements.forEach((el) => observer.observe(el));
}

// Initialize observers on initial page load
document.addEventListener('DOMContentLoaded', initializeObservers);

// Reinitialize observers after Swup replaces content
swup.hooks.on('page:view', initializeObservers);
  

const hiddenElements = document.querySelectorAll('.tile-card');
hiddenElements.forEach((el) => observer.observe(el));