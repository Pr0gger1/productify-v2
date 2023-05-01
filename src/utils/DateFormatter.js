export class DateFormatter {
    week = [
        "Понедельник", "Вторник",
        "Среда", "Четверг",
        "Пятница", "Суббота",
        "Воскресенье"
    ];

    months = [
        "Январь", "Февраль",
        "Март", "Апрель",
        "Май", "Июнь",
        "Июль", "Август",
        "Сентябрь", "Октябрь",
        "Ноябрь", "Декабрь"
    ];

    getDayOfWeek() {
        return this.week.at(new Date().getDay() - 1);
    }

    getMonth(monthIndex = null, initial_form = false) {
        let month = (monthIndex && monthIndex >= 0 && monthIndex < 12)
        ?
            this.months[monthIndex]
        :
            this.months[new Date().getMonth()];

        if (!initial_form) {
            month.endsWith('ь')
                ? month = month.replace('ь', 'я')
                : month +='a';
        }

        return month;
    }

    getTime() {
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        return `${hour}:${minute}`;
    }

    getFullDate(customDate = null) {
        const date = customDate ? new Date(customDate) : new Date();
        const day = date.getDate();
        const month = this.getMonth(date.getMonth());
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    static setDate (options) {
        if (options.date)
        {
            const { date, days, months } = options;
            if (days && months) {
                date.setDate(date.getDate() + days);
                date.setMonth(date.getMonth() + months);
            }
            else if (days)
                return date.setDate(date.getDate() + days);

            else if (months)
                return date.setMonth(date.getMonth() + months);

            else return null;
        }
        return null;
    }
}