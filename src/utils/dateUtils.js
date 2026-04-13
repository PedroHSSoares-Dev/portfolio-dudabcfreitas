/**
 * Date utilities for calculating duration and formatting periods
 */

/**
 * Calculates the duration between two dates
 * @param {string} startDate - Start date in "YYYY-MM" format
 * @param {string|null} endDate - End date in "YYYY-MM" format, null for current
 * @returns {{ years: number, months: number }}
 */
export function calculateDuration(startDate, endDate = null) {
    const start = new Date(startDate + '-01');
    const end = endDate ? new Date(endDate + '-01') : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months };
}

/**
 * Formats duration as a compact string (e.g., "1a5m" or "5m")
 * @param {string} startDate - Start date in "YYYY-MM" format
 * @param {string|null} endDate - End date in "YYYY-MM" format, null for current
 * @returns {string}
 */
export function formatDuration(startDate, endDate = null) {
    const { years, months } = calculateDuration(startDate, endDate);

    if (years === 0) {
        return `${months}m`;
    }

    if (months === 0) {
        return `${years}a`;
    }

    return `${years}a${months}m`;
}

/**
 * Formats a period string (e.g., "ago/25 - hoje")
 * @param {string} startDate - Start date in "YYYY-MM" format
 * @param {string|null} endDate - End date in "YYYY-MM" format, null for current
 * @param {string} lang - Language code ("pt" or "en")
 * @returns {string}
 */
export function formatPeriod(startDate, endDate, lang = 'pt') {
    const monthNames = {
        pt: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    };

    const presentText = {
        pt: 'Hoje',
        en: 'Present'
    };

    const formatDate = (dateStr) => {
        const [year, month] = dateStr.split('-');
        const monthIndex = parseInt(month, 10) - 1;
        const shortYear = year.slice(-2);
        return `${monthNames[lang][monthIndex]}/${shortYear}`;
    };

    const startFormatted = formatDate(startDate);
    const endFormatted = endDate ? formatDate(endDate) : presentText[lang];

    return `${startFormatted} - ${endFormatted}`;
}

/**
 * Calculates the current semester based on start date and total semesters
 * @param {string} startDate - Start date in "YYYY-MM" format
 * @param {string} endDate - End date in "YYYY-MM" format
 * @param {number} totalSemesters - Total number of semesters
 * @returns {{ current: number, total: number, progress: number }}
 */
export function calculateSemesterProgress(startDate, endDate, totalSemesters) {
    const start = new Date(startDate + '-01');
    const end = new Date(endDate + '-01');
    const now = new Date();

    if (now >= end) {
        return { current: totalSemesters, total: totalSemesters, progress: 100 };
    }

    if (now < start) {
        return { current: 0, total: totalSemesters, progress: 0 };
    }

    const totalDuration = end.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const progressPercent = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));

    const currentSemester = Math.min(
        totalSemesters,
        Math.ceil((elapsed / totalDuration) * totalSemesters)
    );

    return {
        current: currentSemester,
        total: totalSemesters,
        progress: Math.round(progressPercent)
    };
}

/**
 * Gets the current year
 * @returns {number}
 */
export function getCurrentYear() {
    return new Date().getFullYear();
}
