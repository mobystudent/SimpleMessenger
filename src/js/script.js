'use strict';

document.addEventListener('DOMContentLoaded', () => {
	addComment();
	countService();

	const comment = {
		name: 'admin',
		date: new Date(),
		get convertToDateTime() {
			this.numMonth = (this.date.getMonth() < 10) ? `0${this.date.getMonth() + 1}` : `${this.date.getMonth() + 1}`;
			this.datetime = `${this.date.getFullYear()}-${this.numMonth}-${this.date.getDate()}`;

			return this.datetime;
		},
		get convertToDateField() {
			this.monthArr = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
			this.currMonth = this.monthArr[this.date.getMonth()];
			this.dateField = `${this.date.getDate()} ${this.currMonth} ${this.date.getFullYear()}`;

			return this.dateField;
		},
		get showComment() {
			return `<article class='message__item'>
				<header class='message__header'>
					<span class='message__name'>${this.name}</span>
					<time class='message__date' datetime=${this.convertToDateTime}>${this.convertToDateField}</span>
				</header>
				<div class='message__block'>
					<p class='message__text'>${this.message}</p>
				</div>
			</article>`;
		}
	};

	function addComment() {
		const handler = (e) => {
			comment.message = document.querySelector(".comment__textarea").value;

			if ((e.ctrlKey && e.which == 13) || e.target.classList.contains('comment__button')) {
				if (comment.message != '') {
					document.querySelector('.message').insertAdjacentHTML('beforeend', comment.showComment);
					document.querySelector(".comment__textarea").value = '';
				}
			}
		};

		document.addEventListener('click', handler);
		document.addEventListener('keydown', handler);
	}

	function countService() {
		const count = document.querySelectorAll(".service__count");
		const total_count = [...count].reduce((acc, item) => acc += +item.innerText, 0);

		document.querySelector(".service__total-count").innerText = total_count;
	}
});
