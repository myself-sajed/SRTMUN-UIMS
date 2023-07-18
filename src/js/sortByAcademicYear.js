
const sortByAcademicYear = (arrayToSort, fieldNameToSort, filterByAcademicYear = false, academicYear, isMultiYear = false) => {

    if (arrayToSort?.length > 0) {
        if (isMultiYear) {
            return arrayToSort.sort((a, b) => {
                const aYears = a.year.map(year => parseInt(year.split('-')[0]));
                const bYears = b.year.map(year => parseInt(year.split('-')[0]));
                const maxAYear = Math.max(...aYears);
                const maxBYear = Math.max(...bYears);

                if (maxAYear > maxBYear) {
                    return -1;
                } else if (maxAYear < maxBYear) {
                    return 1;
                } else {
                    const aCreatedAt = new Date(a.createdAt);
                    const bCreatedAt = new Date(b.createdAt);
                    return bCreatedAt - aCreatedAt;
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