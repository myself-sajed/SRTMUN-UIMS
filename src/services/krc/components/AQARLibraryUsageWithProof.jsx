import React from 'react';

const AQARLibraryUsageWithProof = ({ setUsage, usage }) => {
    return <div className="grid grid-cols-2 gap-4">
        <div className="col-md-6">
            <label htmlFor="usage" className="form-label">Number of usage</label>
            <input type="number" value={usage} onChange={(e) => setUsage(() => e.target.value)} className="form-control" id="usage" placeholder="Usage by Students and Teachers" />
        </div>
        {
            usage && <div>
                <label htmlFor="usageFile" className="form-label">Upload Relevant document</label>
                <input type="file" className="form-control" id="usageFile" placeholder="by Students and Teachers" />
            </div>
        }
    </div>
}


export default AQARLibraryUsageWithProof