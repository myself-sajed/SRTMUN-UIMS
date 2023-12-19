import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query'; // Assuming you are using react-query
import { setNIRFPrograms } from '../../redux/slices/NIRFSlice';
import { fetchPrograms } from '../../services/director/reports/nirf/js/savePrograms';

const useNIRFGetProgram = (user, academicYear) => {
    const { data, isLoading } = useQuery(['Programs', user?._id], () => fetchPrograms(user?.department, academicYear));
    return { programs: data?.data, isLoading };
};

export default useNIRFGetProgram;
