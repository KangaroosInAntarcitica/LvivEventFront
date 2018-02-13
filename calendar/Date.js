export default class Date{
    static monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    static monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    static dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    static getDate(string){
        // TODO check whether date of proper format
        // TODO remove the check whether time exists in string - it should always be there (in database)
        string = string.split(' ');
        let date = string[0].split('-');
        let time = string[1] ? string[1].split(':') : null;
        return {
            year: Number(date[0]),
            month: Number(date[1]) - 1,
            day: Number(date[2]),
            hour: Number(time ? time[0] : null),
            minute: Number(time ? time[1] : null)
        }
    }

    static getFirstDate(year, month){
        // returns day of week of the 1st date (Monday = 0)
        // January 2000 was Saturday = 5
        const defaultYear = 2000;
        const defaultMonth = 0;
        const defaultDay = 5;

        let additionalDays = defaultDay + 365.25 * (year - defaultYear);
        additionalDays +=  month === 0 ? 0 : Date.monthLengths.slice(0, month).reduce((a, b) => a + b);
        additionalDays += (year % 4 === 0 && month > 1) ? 1 : 0;

        let firstDay = Math.ceil(additionalDays) % 7;
        return firstDay;
    }

    static generateMonth(year, month) {
        const firstDay = Date.getFirstDate(year, month);

        const dates = [];
        let day = 0, date = 0;
        for (let row = 0; row < 6; row++) {
            let rowDates = [];
            for (let col = 0; col < 7; col++) {
                let date = row * 7 + col - firstDay;

                // if out of range for this month
                // if (date < 0 || date >= Date.monthLengths[month]) rowDates.push(0);
                rowDates.push(date + 1);
            }

            if(!(dates.length > 0 && rowDates[0] > Date.monthLengths[month])) dates.push(rowDates);
        }

        return dates;
    }
}