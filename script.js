const input_day = document.querySelector('.input_day')
const input_month = document.querySelector('.input_month')
const input_year = document.querySelector('.input_year')

const arrow = document.querySelector('.circle')

const years_num = document.querySelector('.years_num')
const month_num = document.querySelector('.month_num')
const days_num = document.querySelector('.days_num')

const button = document.querySelector('.circle')

const updateTime = (params) => {
    const input_date = parseInt((new Date(`${input_year.value}.${input_month.value}.${input_day.value}`).getTime() / 1000).toFixed(0))
    let now = new Date()
    let unit = (now.getTime() /1000).toFixed(0) - input_date

    let days_count = (unit / (60*60*24)).toFixed()
    days_count = days_count - now.getDate() + 3
    console.log(days_count);
    let years_count = Math.floor(days_count / 365).toFixed()
    days_count = days_count - (years_count * 365)
    let month_count = Math.floor(days_count / 30)
    days_count = days_count - (month_count * 30)
    years_num.innerText = years_count
    month_num.innerText = month_count
    days_num.innerText = Math.floor(days_count)
}

button.addEventListener('click', updateTime)
