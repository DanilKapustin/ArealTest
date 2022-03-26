/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/
const getElement = (tagName, classNames, atributes) => {
	const element = document.createElement(tagName);

	if (classNames) {
		element.classList.add(...classNames);
	}

	if (atributes) {
		for (const atribute in atributes) {
			element[atribute] = atributes[atribute];
		}
	}

	return element;
}

const createHeader = ({title, header: {logo, social, menu}}) => {
	const header = getElement('header');
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if (logo) {
		wrapper.append(getElement('img', ['logo'], {
			src: logo,
			alt: 'логотип ' + title	
		}));
	}

	if (menu) {
		const menuWrapper = getElement('nav', ['menu-list']);
		const allMenu = menu.map(item => {
			const menuLink = getElement('a', ['menu-link'], {
				href: item.href,
				textContent: item.title
			});

			return menuLink;
		})
		menuWrapper.append(...allMenu);
		wrapper.append(menuWrapper);

		const elem_menu = getElement("button", ["menu-button"]);
		container.append(elem_menu);

		elem_menu.addEventListener('click', function () {
			elem_menu.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
	}

	if (social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = social.map(item => {
			const socialLink = getElement('a', ['social-link'], {
				href: item.link
			});
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title
			}));
			
			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	}

	header.append(container);
	container.append(wrapper);

	return header;
}

const createMain = ({ title, main: {genre, rating, description, trailer}}) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);
	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);
	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], { textContent: genre });
		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animate', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], {
			textContent: `${rating}/10`
		});
		
		for (let i = 0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animate', 'fadeInRight'], { textContent: title }));

	if (description) {
		content.append(getElement('p', ['main-description', 'animate', 'fadeInRight'], {textContent: description}));
	}

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animate', 'fadeInRight', 'youtube-modal'], {
			href: trailer,
			textContent: 'Смотреть трейлер'
		});

		const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
			ariaLabel: 'Смотреть трейлер'
		});

		const iconPlay = getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: '',
			ariaHidden: true
		})

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
	}

	return main;
}

const movieConstructor = (selector, options) => {
	if (options.title) {
		document.title = options.title;
	}

	if (options.header.logo) {
		document.head.append(getElement('link', [], {
			rel: "icon",
			type: "image/png",
			href: options.header.logo
		}));
	}

	const app = document.querySelector(selector);

	app.classList.add('body-app');

	app.style.backgroundImage = options.background ?
		`url("${options.background}")` : '';

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}
}

movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'facebbok',
				link: 'https://facebook.com',
				image: 'witcher/social/facebook.svg',
			},
			{
				title: 'instagram',
				link: 'https://instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'twitter',
				link: 'https://twitter.com',
				image: 'witcher/social/twitter.svg',
			}
		],
		menu: [ 
			{
				title: 'Описание',
				link: '#'
			},
						{
				title: 'Трейлер',
				link: '#'
			},
			{
				title: 'Отзывы',
				link: '#'
			},
		]
	},
	main: {
		genre: '2019, фэнтези',
		rating: 8,
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ'
	}
});

