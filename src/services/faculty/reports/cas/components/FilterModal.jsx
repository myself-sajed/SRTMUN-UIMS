import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Button } from 'antd';
import React, { useState } from 'react'
import { useEffect } from 'react';
import TableData from '../../../../director/reports/academic-audit/components/TableData';
import CASDataTable from '../components/CASDataTable'

const FilterModal = ({ title, data, setDataFilterModal, dataFilterModal, model, setState, state, isConsolidated = false, fetchFrom }) => {

  const [filterData, setFilterData] = useState([state?.dataMap])
  const recalculateScore = () => {
    let totalScore = 0

    for (const key in state?.scoreMap) {
      if ((state?.scoreMap[key]?.score) && (state?.dataMap?.includes(key))) {
        totalScore += state?.scoreMap[key]?.score
      }
    }

    setState({ ...state, totalScore })
  }

  return (
    <div className='w-full'>
      <Dialog open={dataFilterModal.isOpen} onClose={() => { setDataFilterModal({ ...dataFilterModal, isOpen: false }); recalculateScore() }} fullWidth maxWidth='md'>
        <DialogTitle><div className='flex items-start justify-between text-base'>
          <p className='w-[60%]'>Filter : <b>{title}</b> </p>
          <p className='w-[25%]'> Academic Year : <b>{dataFilterModal.year}</b></p></div></DialogTitle>
        <DialogContent>
          <FilterCheckBox data={data} model={model} year={dataFilterModal.year} state={state} setState={setState} filterData={filterData} setFilterData={setFilterData} isConsolidated={isConsolidated} fetchFrom={fetchFrom} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { setDataFilterModal({ ...dataFilterModal, isOpen: false }); recalculateScore() }} sx={{ textTransform: "none" }}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default FilterModal


const FilterCheckBox = ({ data, model, year, setState, state, isConsolidated, fetchFrom }) => {

  useEffect(() => {
    console.log('Data :', data)
  }, [data])


  const [isAllChecked, setIsAllChecked] = useState(false)
  const DataTable = isConsolidated ? TableData : CASDataTable


  const checkAll = () => {
    let arr = state?.dataMap ? state?.dataMap : []
    let newArray = []
    let serverArr = !isConsolidated ? data?.data?.data?.filter(function (filterable) { return filterable.year === year; }) : data

    serverArr.forEach(item => {
      newArray.push(item._id)
    })

    let array = [...arr, ...newArray]
    setState({ ...state, dataMap: [...new Set(array)] })
    setIsAllChecked(true)

  }

  const uncheckAll = () => {
    let arr = [...new Set(state?.dataMap)]
    let serverArr = !isConsolidated ? data?.data?.data?.filter(function (filterable) { return filterable.year === year; }) : data
    let newArr = []
    serverArr.forEach((item, index) => {
      newArr.push(item._id)
    })

    let filterArray = arr.filter((item) => !newArr.includes(item))

    setState({ ...state, dataMap: [...new Set(filterArray)] })
    setIsAllChecked(false)


  }


  const verifyCheckAll = () => {
    console.log('I have been called')
    if (!isConsolidated) {
      data && data?.data?.data?.filter(function (filterable) { return filterable.year === year; })?.length === state?.dataMap?.length ? setIsAllChecked(true) : setIsAllChecked(false)
    } else {
      data && data?.filter(function (filterable) { return filterable.year === year; })?.length === state?.dataMap?.length ? setIsAllChecked(true) : setIsAllChecked(false)
    }
  }


  useEffect(() => {
    verifyCheckAll()
  }, [])

  const singleCheckUncheck = (e, itemId) => {
    if (e.target.checked) {
      if (!state.dataMap || state.dataMap === undefined) {
        setState({ ...state, dataMap: [itemId] })
        verifyCheckAll()
      } else {
        setState({ ...state, dataMap: [...state.dataMap, itemId] })
        verifyCheckAll()
      }
    } else {
      setState({ ...state, dataMap: [...state.dataMap.filter((elem) => elem !== itemId)] })
      verifyCheckAll()

    }

  }




  return (
    <>
      <table className="table">
        <thead className="sticky-top bg-light">
          <tr>
            <th scope="col">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="selectAll" onChange={(e) => {
                  e.target.checked ? checkAll() : uncheckAll();
                }} checked={isAllChecked} />
              </div>
            </th>
            {
              DataTable[model]?.mainKey.head.map((head) => {
                return <th scope="col"><label htmlFor="selectAll">{head}</label></th>
              })
            }
            <th scope="col">Academic Year</th>

          </tr>
        </thead>
        {
          !isConsolidated ? <tbody>

            {data && data?.data?.data?.filter(function (filterable) { return filterable.year === year; })?.map((item, index) => {

              return <tr key={index}>
                <td>
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={item._id} id={item._id}
                      onChange={(e) => { singleCheckUncheck(e, item._id) }} checked={state.dataMap?.includes(item._id)} />
                  </div>
                </td>
                <td><label htmlFor={item._id}>{item[DataTable[model]?.mainKey?.keyName]}</label></td>
              </tr>

            })}
          </tbody> :
            <tbody>
              {data && data?.filter(function (filterable) {
                console.log('Filterable :', filterable, filterable.Year_of_activity, year)
                return fetchFrom === "faculty" ? filterable.year === year : (filterable.Academic_Year === year || filterable.Acadmic_Year === year || filterable.Year_of_Award === year || filterable.Academic_year === year || filterable.Acadmic_year === year || filterable.Year_of_activity === year || year.includes(filterable.Year))
              })?.map((item, index) => {
                return <tr key={index}>
                  <td>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value={item._id} id={item._id}
                        onChange={(e) => { singleCheckUncheck(e, item._id) }} checked={state.dataMap?.includes(item._id)} />
                    </div>
                  </td>
                  {
                    DataTable[model]?.mainKey.keyName.map((key) => {
                      return key === 'name' ? <td><label htmlFor={item._id}>{item.userId.name}</label></td> : <td><label htmlFor={item._id}>{item?.[key]}</label></td>
                    })
                  }
                  <td>{item?.year || item?.Academic_Year || item?.Academic_year || item?.Acadmic_Year || item?.Year_of_activity || item?.Year_of_Award || item?.Acadmic_year || item?.Year || 'NA'}</td>
                </tr>

              })}
            </tbody>
        }
      </table>
    </>
  )
}

