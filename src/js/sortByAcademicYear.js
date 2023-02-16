
const sortByAcademicYear = (arrayToSort, fieldNameToSort) => {

    if (arrayToSort?.length > 0) {
        arrayToSort.sort(function (a, b) {
            var dateA = new Date(a.createdAt), dateB = new Date(b.createdAt)
            return dateB - dateA;
        }).sort((a, b) => {
            let yearA = a?.[fieldNameToSort]?.split('-')[0];
            let yearB = b?.[fieldNameToSort]?.split('-')[0];
            return yearB - yearA;
        });

        return arrayToSort
    } else {
        return []
    }
}

export default sortByAcademicYear