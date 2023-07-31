<div>
    <div className='mt-3 border rounded-xl gray'>
        {/* PROFILE */}
        <div className='rounded-xl'>
            {/* // new */}
            {user &&
                <div className='p-4'>
                    <div className='sm:flex items-start justify-start gap-5 '>
                        <img src={serverLinks.showFile(user?.photoURL, 'student')} className='h-[100px] w-[100px] sm:h-[170px] sm:w-[170px] rounded-full object-cover border-4 border-[#344e87]' />

                        <div className='text-black '>
                            <p className='text-lg sm:text-2xl font-bold'>{user && user.salutation} {user && user.name}</p>
                            <p className='text-base sm:text-xl'>{user && user.programGraduated},</p>
                            <p className='text-xs sm:text-sm'>{user && user.schoolName},</p>
                            <p className='text-xs sm:text-sm'>{user && user.schoolName.includes("Latur") ? "Sub-Campus, Latur - 413531" : "SRTMUN, Vishnupuri, Nanded - 431 606"}</p>

                            <div className='flex items-cent-3 mt-4'>
                                {/* <button onClick={() => { navigate(siteLinks.studentStatus.link); }} className='mr-3 p-2 rounded-full border-2 text-sm sm:text-base hover:bg-blue-700 border-blue-800 bg-blue-800 text-white'>
                                            Update Status
                                        </button> */}

                                <button onClick={() => { dispatch(setStudentUser(null)); navigate(siteLinks.welcome.link); localStorage.removeItem('student-token'); }} className='p-2 text-sm sm:text-base rounded-full text-blue-700 border-2 hover:bg-blue-200 border-blue-700'>
                                    Log out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>

        <div>
            <div>
                <div className='flex items-center justify-between mx-4 my-2'>
                    <p className='font-bold text-base sm:text-xl text-black'>Personal Infomation</p>
                    <button className='flex items-center justify-end gap-2 text-blue-700 hover:bg-blue-200 p-2 rounded-xl' onClick={() => { setOpen(true); setEdit(true); setItemToEdit(user?._id); }}>
                        <EditRoundedIcon fontSize="small" />Edit Profile
                    </button>
                </div>
                <hr className='text-black' />
                <div className="md:mb-4 shadow-none">
                    {
                        user &&
                        <div className="card-body sm:flex">

                            <div className='flex flex-wrap' >
                                <DetailTile keyName="Full Name" value={`${user && user.salutation} ${user && user.name}`} />
                                <DetailTile keyName="Program Enroled" value={`${user && user.programGraduated}`} />
                                <DetailTile keyName="School Name" value={`${user && user.schoolName}`} />
                                <DetailTile keyName="(ABC) Credit No." value={`${user && user.abcNo}`} />
                                <DetailTile keyName="Religion" value={`${user && user.religion}`} />
                                <DetailTile keyName="Cast" value={`${user && user.cast}`} />
                                <DetailTile keyName="Date Of Birth" value={`${user && user.dob == "" || user.dob == undefined ? "Not Added" : user.dob}`} />
                                <DetailTile keyName="Gender" value={`${user && user.gender}`} />
                                <DetailTile keyName="Mobile" value={`${user && user.mobile}`} />
                                <DetailTile keyName="Program Enroled On" value={`${user && user.programEnroledOn}`} />
                                <DetailTile keyName="Email" value={`${user && user.email}`} />
                                <DetailTile keyName="Admitted In" value={`${user && user.currentIn}`} />
                                <DetailTile keyName="Nationality" value={`${user && user.country}`} />
                                <DetailTile keyName="Address" value={`${user && user.address == "" || user.address == undefined ? "Not Added" : user.address}`} />
                                {user?.programGraduated.includes("Ph.D") ? <>
                                    <DetailTile keyName="Research Guide" value={`${user && user.ResearchGuide == "" || user.ResearchGuide == undefined ? "Not Added" : user.ResearchGuide}`} />
                                    <DetailTile keyName="Date of Rac" value={`${user && user.dateOfRac == "" || user.dateOfRac == undefined ? "Not Added" : user.dateOfRac}`} />
                                    <DetailTile keyName="Title" value={`${user && user.Title == "" || user.Title == undefined ? "Not Added" : user.Title}`} />
                                    <DetailTile keyName="Receives any Felloship" value={`${user && user.ReceivesFelloship == "" || user.ReceivesFelloship == undefined ? "Not Added" : user.ReceivesFelloship}`} />
                                </> : null}

                            </div>
                        </div>
                    }
                </div>

            </div>
        </div>
    </div>

    {
        user?.programGraduated.includes("Ph.D") && user?.ReceivesFelloship == 'Yes' ? <div class="accordion" id="accordionExample">
            {
                navcom.map(((item, index) => {
                    return <div class="accordion-item" style={{ border: "solid #d6d6fb 2px", borderRadius: "10px", background: "#efeffa", margin: "3px 0" }}>
                        <h2 class="accordion-header" id={`heading-${index}`}>
                            <button class="accordion-button" style={{ borderRadius: "10px", background: "#dedef6", color: "#344e87", fontSize: 17, fontWeight: 600 }} type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index}`} aria-expanded="false" aria-controls={`collapse-${index}`}>
                                {item.value}
                            </button>
                        </h2>
                        <div id={`collapse-${index}`} class="accordion-collapse collapse" aria-labelledby={`heading-${index}`} data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <div key={item}>{item.element}</div>
                            </div>
                        </div>
                    </div>
                }))
            }
        </div> : null
    }


</div>