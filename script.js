const input_day = document.querySelector('.input_day')
const input_month = document.querySelector('.input_month')
const input_year = document.querySelector('.input_year')

const arrow = document.querySelector('.circle')

const years_num = document.querySelector('.years_num')
const month_num = document.querySelector('.month_num')
const days_num = document.querySelector('.days_num')

const year_error = document.querySelector('.year_error')
const month_error = document.querySelector('.month_error')
const day_error = document.querySelector('.day_error')

const button = document.querySelector('.circle')

const day_label = document.querySelector('.day_label')
const month_label = document.querySelector('.month_label')
const year_label = document.querySelector('.year_label')

const month_30 = [4, 6, 9, 11]

const validDate = () => {
	if (
		input_day.value == '' ||
		input_month.value == '' ||
		input_year.value == ''
	) {
		resetTime()
		if (input_day.value == '') {
			displayError('input_day', 'The field is required')
			resetTime()
		}
		if (input_month.value == '') {
			displayError('input_month', 'The field is required')
			resetTime()
		}
		if (input_year.value == '') {
			displayError('input_year', 'The field is required')
			resetTime()
		}
	} else {
		if (
			isNaN(input_day.value) ||
			isNaN(input_month.value) ||
			isNaN(input_year.value)
		) {
			resetTime()
			if (isNaN(input_day.value)) {
				displayError('input_day', 'Must be a valid number')
				resetTime()
			}
			if (isNaN(input_month.value)) {
				displayError('input_month', 'Must be a valid number')
				resetTime()
			}
			if (isNaN(input_year.value)) {
				displayError('input_year', 'Must be a valid number')
				resetTime()
			}
		} else {
			if (input_day.value < 0 || input_day.value > 31) {
				displayError('input_day', 'Must be a valid number')
				resetTime()
			} else if (input_month.value < 0 || input_month.value > 12) {
				displayError('input_month', 'Must be a valid number')
				resetTime()
			} else {
				y = new Date().getFullYear()
				if (input_year.value > y) {
					displayError('input_year', 'Must be in past')
					resetTime()
				} else if (input_year.value == y) {
					m = new Date().getMonth() + 1
					if (input_month.value > m) {
						displayError('input_month', 'Must be in past')
						resetTime()
					} else if (input_month.value == m) {
						d = new Date().getDate()
						if (input_day.value > d || input_day.value == d) {
							displayError('input_day', 'Must be in past')
							resetTime()
						} else {
							daysInMonth()
						}
					} else {
						daysInMonth()
					}
				} else {
					daysInMonth()
				}
			}
		}
	}
}

const daysInMonth = () => {
	console.log((input_year.value % 4 == 0 && input_year.value & (100 != 0)) ||
	input_year.value % 400 == 0);
	if (month_30.includes(parseInt(input_month.value))) {
		if (input_day.value > 30) {
			displayError('input_day', 'Must be a valid date')
		}
	} else if (parseInt(input_month.value) == 2) {
		console.log('jest if');
		if (
			(input_year.value % 4 == 0 && input_year.value & (100 != 0)) ||
			input_year.value % 400 == 0
		) {
			if (input_day.value > 29) {
				displayError('input_day', 'Must be a valid date')
			} else {
				resetError()
				updateTime()
			}
		} else {
			if (input_day.value > 28) {
				displayError('input_day', 'Must be a valid date')
			} else {
				resetError()
				updateTime()
			}
		}
	} else {
		resetError()
		updateTime()
	}
}

const resetTime = () => {
	years_num.innerText = '- -'
	month_num.innerText = '- -'
	days_num.innerText = '- -'
}

const displayError = (element, message) => {
	if (element == 'input_day') {
		day_error.innerText = message
		day_label.classList.add('error_label')
		input_day.classList.add('error_input')
	} else if (element == 'input_month') {
		month_error.innerText = message
		month_label.classList.add('error_label')
		input_month.classList.add('error_input')
	} else {
		year_error.innerText = message
		year_label.classList.add('error_label')
		input_year.classList.add('error_input')
	}
}

const resetError = () => {
	day_error.innerText = ''
	day_label.classList.remove('error_label')
	input_day.classList.remove('error_input')
	month_error.innerText = ''
	month_label.classList.remove('error_label')
	input_month.classList.remove('error_input')
	year_error.innerText = ''
	year_label.classList.remove('error_label')
	input_year.classList.remove('error_input')
}

const updateTime = () => {
	const input_date = parseInt(
		(
			new Date(
				`${input_year.value}.${input_month.value}.${input_day.value}`
			).getTime() / 1000
		).toFixed(0)
	)
	let now = new Date()
	let unit = (now.getTime() / 1000).toFixed(0) - input_date

	let days_count = (unit / (60 * 60 * 24)).toFixed()
	days_count = days_count - now.getDate() + 3
	let years_count = Math.floor(days_count / 365).toFixed()
	days_count = days_count - years_count * 365
	let month_count = Math.floor(days_count / 30)
	days_count = days_count - month_count * 30
	years_num.innerText = years_count
	month_num.innerText = month_count
	days_num.innerText = Math.floor(days_count)
}

button.addEventListener('click', validDate)
