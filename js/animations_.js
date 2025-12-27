function fadeIn(element, duration) {
    element.style.opacity = 0;
    element.style.display = 'block';

    let start = null;

    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = Math.min(progress / duration, 1);

        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    };

    requestAnimationFrame(animate);
}

function fadeOut(element, duration) {
    element.style.opacity = 1;

    let start = null;

    const animate = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        element.style.opacity = Math.max(1 - progress / duration, 0);

        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    };

    requestAnimationFrame(animate);
}

// Example usage
document.addEventListener('DOMContentLoaded', () => {
    const elementsToFadeIn = document.querySelectorAll('.fade-in');
    elementsToFadeIn.forEach(element => {
        fadeIn(element, 1000);
    });

    const elementsToFadeOut = document.querySelectorAll('.fade-out');
    elementsToFadeOut.forEach(element => {
        fadeOut(element, 1000);
    });
});