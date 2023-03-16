import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminExcelExoprt from '../components/AdminExcelExoprt';

const MoUs = ({id, setState}) => {
  const SendReq = ''
  const module = 'Admin'
  
  const params = { model: SendReq, id: '', module }
  
  const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

  useEffect(() => {
    setState((pri) => {
      return {
          ...pri,
          [id]: data?.data
      }
  })
  }, [data && data])

  return (
    <div>
      < AdminExcelExoprt data={data?.data} fileTitle='Research Degrees' module='faculty' SendReq={SendReq} isLoading={isLoading} />
    </div>
  )
}

export default MoUs