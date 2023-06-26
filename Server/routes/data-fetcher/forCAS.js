const { models, nonAcademicYearModels } = require("../faculty-routes/routes")

async function fetchDataForCAS(fetchYears, userId) {

    // general info data
    const Degree = await models.Degree.find({ userId: userId }).lean();
    const PostHeld = await models.PostHeld.find({ userId: userId }).lean();
    const Online = await models.Online.find({ userId: userId }).lean();




    // data for score calculation

    const ResearchPaper = await models.ResearchPaper.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const BookAndChapter = await models.BookAndChapter.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const PhdAwarded = await models.PhdAwarded.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const ResearchProject = await models.ResearchProject.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const ConsultancyServices = await models.ConsultancyServices.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const Patent = await models.Patent.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const PolicyDocuments = await models.PolicyDocuments.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const AwardRecognition = await models.AwardRecognition.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const Fellowship = await models.Fellowship.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();
    const InvitedTalk = await models.InvitedTalk.find({ year: { $in: fetchYears }, userId: userId }).sort({ _id: -1 }).lean();

    const scoreRelatedData = { ResearchPaper, BookAndChapter, PhdAwarded, ResearchProject, ConsultancyServices, Patent, PolicyDocuments, AwardRecognition, Fellowship, InvitedTalk }




    return scoreRelatedData
}

async function fetchBasicDataForCAS(userId) {

    // general info data
    const Degree = await models.Degree.find({ userId: userId }).lean();
    const PostHeld = await models.PostHeld.find({ userId: userId }).lean();
    const Online = await models.Online.find({ userId: userId }).lean();

    return [...Degree || [], ...PostHeld || [], ...Online || []]
}



module.exports = { fetchDataForCAS, fetchBasicDataForCAS }