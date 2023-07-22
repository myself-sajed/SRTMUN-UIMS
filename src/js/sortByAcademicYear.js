
const sortByAcademicYear = (arrayToSort, fieldNameToSort, filterByAcademicYear = false, academicYear, isMultiYear = false) => {

    if (arrayToSort?.length > 0) {
        if (isMultiYear) {
            return arrayToSort.sort((a, b) => {
                // Check if "Till Date" exists in the year array
                const aHasTillDate = a.durationYears.includes('Till Date');
                const bHasTillDate = b.durationYears.includes('Till Date');

                if (aHasTillDate && !bHasTillDate) {
                    return -1;
                } else if (!aHasTillDate && bHasTillDate) {
                    return 1;
                } else if (aHasTillDate && bHasTillDate) {
                    // Both have "Till Date", sort by createdAt field in descending order
                    return new Date(b.createdAt) - new Date(a.createdAt);
                } else {
                    // Sort by the highest academic year first
                    const parseYear = (year) => parseInt(year.split('-')[0]);
                    const maxAYear = Math.max(...a.durationYears.map(parseYear));
                    const maxBYear = Math.max(...b.durationYears.map(parseYear));

                    if (maxAYear > maxBYear) {
                        return -1;
                    } else if (maxAYear < maxBYear) {
                        return 1;
                    } else {
                        // Academic years are equal, sort by createdAt field in descending order
                        return new Date(b.createdAt) - new Date(a.createdAt);
                    }
                }
            });
        } else {
            if (filterByAcademicYear) {
                // Filter the array based on the provided academicYear
                const filteredArray = arrayToSort.filter(item => {
                    return item[fieldNameToSort] === academicYear;
                });


                // Sort the filtered array by createdAt and year
                filteredArray.sort(function (a, b) {
                    var dateA = new Date(a.createdAt),
                        dateB = new Date(b.createdAt);
                    return dateB - dateA;
                }).sort((a, b) => {
                    let yearA = a?.[fieldNameToSort]?.split('-')[0];
                    let yearB = b?.[fieldNameToSort]?.split('-')[0];
                    return yearB - yearA;
                });
                return filteredArray;
            } else {
                // Sort the entire array by createdAt and year
                arrayToSort.sort(function (a, b) {
                    var dateA = new Date(a.createdAt),
                        dateB = new Date(b.createdAt);
                    return dateB - dateA;
                }).sort((a, b) => {
                    let yearA = a?.[fieldNameToSort]?.split('-')[0];
                    let yearB = b?.[fieldNameToSort]?.split('-')[0];
                    return yearB - yearA;
                });

                return arrayToSort;
            }
        }
    } else {
        return [];
    }
};

export default sortByAcademicYear