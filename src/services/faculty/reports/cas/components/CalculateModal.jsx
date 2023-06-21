import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ConsultancyPoints, DegreePoints, ProjectPoints } from '../content/ResearchGuide'
import { AwardPoints, FellowPoints, PatentPoints, PolicyPoints } from '../content/PolicyDocuments'
import { InvitedTalkPoints } from '../content/InvitedLectures'
import { PublicationPoints } from '../content/Publications'
import { ContentPoints } from '../content/ContentCreated'
import { PaperPoints } from '../content/AddPaper'
import CASDataTable from "./CASDataTable";




const CalculateModal = ({ content, setCalculateModal, calculateModal, calculateItem, model, state, setState, isFetching, serverData, saveLoader, setSaveLoader }) => {

    return <div className='w-full'>
        <Dialog open={calculateModal} onClose={() => { setCalculateModal(false); setSaveLoader(true) }} fullWidth maxWidth='md'>
            <DialogTitle>

                <p className="text-base font-bold bg-blue-100 p-2 rounded-xl text-blue-800">Calculate Score</p>
                <table class="table text-base mt-3 table-bordered">
                    <thead className="bg-light text-black">
                        <tr>
                            <th>{CASDataTable[model].mainKey.head}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{calculateItem?.[CASDataTable[model].mainKey.keyName]}</td>
                        </tr>
                    </tbody>
                </table>
            </DialogTitle>
            <DialogContent>

                {content}
                {
                    model === 'ResearchPaper' && serverData ? <PaperPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                        model === 'BookAndChapter' && serverData ? <PublicationPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                            model === 'EContentDeveloped' && serverData ? <ContentPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                model === 'PhdAwarded' && serverData ? <DegreePoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                    model === 'ResearchProject' && serverData ? <ProjectPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                        model === 'ConsultancyServices' && serverData ? <ConsultancyPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                            model === 'Patent' && serverData ? <PatentPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                                model === 'AwardRecognition' && serverData ? <AwardPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                                    model === 'Fellowship' && serverData ? <FellowPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                                        model === 'PolicyDocuments' && serverData ? <PolicyPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> :
                                                            model === 'InvitedTalk' && serverData ? <InvitedTalkPoints item={calculateItem} state={state} setState={setState} serverData={serverData && serverData} /> : null
                }

                <hr className='my-4' />
                <p >Score : <span className='text-green-900 font-bold'>{state?.scoreMap?.[calculateItem?._id]?.score ? state.scoreMap?.[calculateItem?._id]?.score : 0}</span></p>

            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setCalculateModal(false); setSaveLoader(true) }} sx={{ textTransform: "none" }}>Done</Button>
            </DialogActions>
        </Dialog>
    </div>
}


export default CalculateModal