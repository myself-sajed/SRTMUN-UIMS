import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery } from 'react-query'; // Assuming you are using react-query
import { setNIRFPrograms } from '../../redux/slices/NIRFSlice';
import { fetchPrograms } from '../../services/director/reports/nirf/js/savePrograms';

const useNIRFGetProgram = (user) => {
    const dispatch = useDispatch();
    const [shouldFetch, setShouldFetch] = useState(false)
    const reduxPrograms = useSelector((state) => state.nirf.nirfPrograms);

    console.log('Redux Programs:', reduxPrograms)

    const { data, isLoading, refetch } = useQuery(['Programs', user?._id], () => fetchPrograms(user?.department), {
        enabled: shouldFetch,
        refetchOnWindowFocus: false,
        onSuccess: (data) => {
            dispatch(setNIRFPrograms(data?.data));
            setShouldFetch(false)
        },
    });

    useEffect(() => {
        if (!reduxPrograms) {
            setShouldFetch(true);
        }
    }, [reduxPrograms]);

    useEffect(() => {
        if (shouldFetch) {
            refetch();
            setShouldFetch(false);
        }
    }, [shouldFetch, refetch]);

    return { programs: data?.data || [], isLoading };
};

export default useNIRFGetProgram;
