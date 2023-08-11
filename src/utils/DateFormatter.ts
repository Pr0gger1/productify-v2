import {DateFormatterSetDate} from 'types/DateFormatter';

export class DateFormatter {
	week: string[] = [
		'Понедельник', 'Вторник',
		'Среда', 'Четверг',
		'Пятница', 'Суббота',
		'Воскресенье'
	];

	months: string[] = [
		'Январь', 'Февраль',
		'Март', 'Апрель',
		'Май', 'Июнь',
		'Июль', 'Август',
		'Сентябрь', 'Октябрь',
		'Ноябрь', 'Декабрь'
	];

	getDayOfWeek(): string | undefined {
		return this.week.at(new Date().getDay() - 1);
	}

	getMonth(monthIndex: number | null = null, initial_form: boolean = false): string {
		let month = (monthIndex && monthIndex >= 0 && monthIndex < 12)
			?
			this.months[monthIndex]
			:
			this.months[new Date().getMonth()];

		if (!initial_form) {
			if (month.endsWith('й'))
				month = month.replace('й', 'я');
			else month.endsWith('ь')
				? month = month.replace('ь', 'я')
				: month +='a';
		}

		return month;
	}

	getTime(): string {
		const hour: number = new Date().getHours();
		const minute: number = new Date().getMinutes();
		return `${hour}:${minute}`;
	}

	getFullDate(customDate: number | null = null): string {
		const date: Date = customDate ? new Date(customDate) : new Date();
		const day: number = date.getDate();
		const month: string = this.getMonth(date.getMonth());
		const year: number = date.getFullYear();

		return `${day} ${month} ${year}`;
	}

	static setDate (options: DateFormatterSetDate): number | null {
		if (options.date) {
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