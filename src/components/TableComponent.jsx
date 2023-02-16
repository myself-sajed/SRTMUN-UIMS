import React from 'react'
import EmptyBox from './EmptyBox'

const TableComponent = ({ tableHeads, tableCells, data, children, tableColor = 'bg-blue-700' }) => {
    return (
        <div>
            <div className="table-responsive">
                <table class="table table-bordered css-serial">
                    <thead className={`${tableColor} text-white`}>
                        <tr>
                            <th scope="col">Sr. No.</th>
                            {
                                tableHeads.map((head) => {
                                    return <th scope="col">{head}</th>
                                })
                            }
                        </tr>
                    </thead>
                    <tbody>

                        {
                            tableCells ? data?.map((item) => {
                                return <tr>
                                    <td></td>
                                    {
                                        tableCells.map((cell) => {
                                            return <td>{item?.[cell]}</td>
                                        })
                                    }
                                </tr>
                            })
                                :
                                children
                        }


                    </tbody>
                </table>

                {
                    data?.length === 0 && <EmptyBox />
                }

            </div>
        </div>
    )
}

export default TableComponent