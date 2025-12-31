export function createStars() {
	const nightStarsElement = document.getElementById('night-stars') as HTMLElement;
	const numberOfStars = 100; // Adjust for more or fewer stars
	for (let i = 0; i < numberOfStars; i++) {
		const star = document.createElement('div');
		star.classList.add('star');

		// Random size, position, and animation duration for each star
		const size = Math.random() * 3 + 1;
		star.style.width = `${size}px`;
		star.style.height = `${size}px`;
		star.style.left = `${Math.random() * 100}%`;
		star.style.top = `${Math.random() * 100}%`;
		star.style.animationDuration = `${Math.random() * 2 + 1}s`;

		nightStarsElement.appendChild(star);
	}
}
