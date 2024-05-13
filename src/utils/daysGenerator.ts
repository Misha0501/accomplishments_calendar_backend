/**
 * Generates day objects for each day of the specified year.
 * @param {number} year - The year for which days should be generated.
 * @returns {Array} Array of day objects.
 */
export const generateDaysForYear = (year: number): Array<any> => {
    const days = [];
    for (let month = 0; month < 12; month++) {
        for (let day = 1; day <= 31; day++) {
            const date = new Date(year, month, day);
            if (date.getMonth() === month) {
                const formattedDate = formatDate(date);
                const dayOnly = date.getDate().toString().padStart(2, '0');
                days.push({
                    day: dayOnly,
                    date: formattedDate,
                    isActive: false  // Default state for a new day
                });
            }
        }
    }
    return days;
}

export const formatDate = (date: string | number | Date)=> {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

