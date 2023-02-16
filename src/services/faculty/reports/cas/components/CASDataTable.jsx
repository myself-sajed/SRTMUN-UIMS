const CASDataTable = {
    AppointmentsHeldPrior: {
        tableHeads: [
            "Designation",
            "Employer Name",
            "Joining Date",
            "Leaving Date ",
            "Salary with Grade",
            "Leaving Reason"
        ],

        tableCells: [
            "designation",
            "employerName",
            "joiningDate",
            "leavingDate",
            "salaryWithGrade",
            "leavingReason"
        ]
    },
    Experience: {
        tableHeads: [
            "UG Teaching (in years)",
            "PG Teaching (in years)",
            "Research Experience excluding years spent in M. Phil. / Ph. D. (in years)",
            "Fields of Specialization under the Subject / Discipline ",
        ],

        tableCells: [
            "ug",
            "pg",
            "researchExperience",
            "specialization",
        ]
    },
    AwardRecognition: {
        tableHeads: ["Name of full-time teachers receiving award",
            "Award Date",
            "PAN",
            "Designation",
            "Name of the Award, Fellowship, received",
            "Award Agency Name",
            "National / International",
            "Incentives/Type of incentive given by the HEI in recognition of the award",
            "Year", "Uploaded Proof"
        ],
        tableCells: [
            "teacherName",
            "awardYear",
            "pan",
            "designation",
            "awardName",
            "agencyName",
            "isNat",
            "incentive",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Name of the Award, Fellowship, received'],
            keyName: ['awardName']
        }
    },
    TrimmedBookAndChapter: {
        tableHeads: [
            "Teacher Name",
            "Title of Published Book",
            "Paper Title",
            "Title of proceedings",
            "Author / Editor / Translator",
            "Conference Name",
            "National / International",
            "Publication Year",
            "SBN/ISSN number",
            "Affiliation Institute at the time of publication",
            "Publisher Name",
            "School Name",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "teacherName",
            "titleOfBook",
            "paperTitle",
            "titleOfProceeding",
            "authorEditor",
            "conName",
            "isNat",
            "publicationYear",
            "issnNumber",
            "aff",
            "publisherName",
            "schoolName",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Title of Published Book'],
            keyName: ['titleOfBook']
        }
    },
    BookAndChapter: {
        tableHeads: [
            "Title of Published Book",
            "Paper Title",
            "Title of proceedings",
            "Author / Editor / Translator",
            "Conference Name",
            "National / International",
            "Publication Year",
            "SBN/ISSN number",
            "Affiliation Institute at the time of publication",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "titleOfBook",
            "paperTitle",
            "titleOfProceeding",
            "authorEditor",
            "conName",
            "isNat",
            "publicationYear",
            "issnNumber",
            "aff",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Title of Published Book'],
            keyName: ['titleOfBook']
        }
    },
    Collaboration: {
        tableHeads: [
            "Title of the collaborative activity",
            "Name of the collaborating agency with contact details",
            "Participant Name",
            "Year of Collaboration",
            "Duration",
            "Nature of the activity",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "collabTitle",
            "agencyName",
            "participantName",
            "collabYear",
            "duration",
            "activityNature",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Title of the collaborative activity'],
            keyName: ['titleOfBook']
        }
    },
    ConferenceOrganized: {
        tableHeads: [
            "Program Title",
            "School Name",
            "Funded By",
            "National / International",
            "No of Participants",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "programTitle",
            "schoolName",
            "fundedBy",
            "isNational",
            "noOfParticipants",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Program Title'],
            keyName: ['programTitle']
        },

    },
    ConsultancyServices: {
        tableHeads: [
            "Consultant Name",
            "Consultancy Project Name",
            "Consulting / Sponsoring Agency",
            "Consultancy Year",
            "Revenue Generated(INR)",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "cName",
            "cProjectName",
            "cAgency",
            "cYear",
            "revenue",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Consultancy Project Name'],
            keyName: ['cProjectName']
        }
    },
    EContentDeveloped: {
        tableHeads: [
            "Name of the Module / Course developed",
            "Creation Type",
            "Platform on which the module is developed",
            "Year",
            "Link to content"
        ],
        tableCells: [
            "moduleName",
            "creationType",
            "platform",
            "year",
            "link",
        ],
        mainKey: {
            head: ['Name of the Module / Course developed'],
            keyName: ['moduleName']
        }
    },
    Fellowship: {
        tableHeads: [
            "Name of the teacher awarded fellowship/financial support",
            "Name of the award/fellowship",
            "Award Year",
            "National / International",
            "Awarding Agency",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "teacherName",
            "awardName",
            "awardYear",
            "isNat",
            "awardingAgency",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Name of the award/fellowship'],
            keyName: ['awardName']
        }
    },
    FinancialSupport: {
        tableHeads: [
            "Name Of Conference",
            "Name of professional body Funds provided for",
            "Ammount of Support",
            "PAN No.",
            "Year",
            "Proof"
        ],
        tableCells: [
            "nameOfConference",
            "feeprovider",
            "amountOfSupport",
            "pan",
            "year",
            "proof",
        ]
    },
    ConferenceParticipated: {
        tableHeads: [
            "Program Title",
            "Organizing Institute",
            "Level",
            "Year",
            "Proof"
        ],
        tableCells: [
            'programTitle',
            'organizingInstitute',
            'isNational',
            'year',
            'proof',
        ]
    },
    ForeignVisit: {
        tableHeads: [
            "Purpose Of Visit",
            "Name Of The Institution Visited",
            "From",
            "To",
            "Year"
        ],
        tableCells: [
            'purposeOfVisit',
            'nameOfTheInstitutionVisited',
            'fromDate',
            'toDate',
            'year',
        ]
    },
    Responsibilities: {
        tableHeads: [
            "Name of the Committee",
            "Designation",
            "Hosting institute name",
            "Year",
            "Uploaded Proof"
        ],
        tableCells: [
            'committeeName',
            'designation',
            'institute',
            'year',
            'proof',
        ]
    },
    InvitedTalk: {
        tableHeads: [
            "Title of Lecture/Academic Session",
            "Title of Seminar, etc.",
            "Organized by ",
            "Type",
            "Nature",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "lectureTitle",
            "seminarTitle",
            "organizedBy",
            "isNat",
            "nature",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Title of Lecture/Academic Session'],
            keyName: ['lectureTitle']
        }
    },
    JrfSrf: {
        tableHeads: [
            "Research Fellow Name",
            "Enrolment Year",
            "Fellowship Duration",
            "Fellowship Type",
            "Granting Agency",
            "Qualifying Exam (if any)",
            "Year",
            "Uploaded Proof",
        ],
        tableCells: [
            "researchName",
            "enrolmentYear",
            "fellowshipDuration",
            "fellowshipType",
            "grantingAgency",
            "qualifyingExam",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Research Fellow Name'],
            keyName: ['researchName']
        }
    },
    Lectures: {
        tableHeads: [
            "Course/Paper",
            "Level",
            "Teaching Mode",
            "No of classes alloted per week",
            "% of classes taken as per documented record",
            "Year",
            "Uploaded Attendance",
        ],
        tableCells: [
            "course",
            "level",
            "teachingMode",
            "noOfClasses",
            "percentageOfClasses",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Course/Paper'],
            keyName: ['course']
        }
    },
    Online: {
        tableHeads: [
            "Program Title",
            "Organized by",
            "Duration From",
            "Duration To",
            "Year",
            "Proof",
        ],
        tableCells: [
            "programTitle",
            "nameOfAttendedTeacher",
            "durationFrom",
            "durationTo",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Program Title'],
            keyName: ['programTitle']
        }
    },
    Patent: {
        tableHeads: [
            "Patenter Name",
            "Patent Number",
            "Patent Title",
            "National / International",
            "Award Year of Patent ",
            "Year",
            "Uploaded Proof ",
        ],
        tableCells: [
            "patenterName",
            "patentNumber",
            "patentTitle",
            "isNat",
            "awardYear",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Patent Title'],
            keyName: ['patentTitle']
        }
    },
    PhdAwarded: {
        tableHeads: [
            "Scholar Name",
            "Department Name",
            "Guide Name",
            "Thesis Title",
            "Degree",
            "Awarded / Submitted",
            "Year of Scholar Registration",
            "Year of Award",
            "Year",
            "Uploaded Degree",
        ],
        tableCells: [
            "scholarName",
            "departmentName",
            "guideName",
            "thesisTitle",
            "degreeName",
            "awardSubmit",
            "yearOfScholar",
            "phdAwardYear",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Thesis Title'],
            keyName: ['thesisTitle']
        }
    },
    PostHeld: {
        tableHeads: [
            "Designation",
            "Department",
            "Joining Date",
            "Leaving Date ",
            "Appointment Order / CAS Promotion",
        ],
        tableCells: [
            "designation",
            "department",
            "joiningDate",
            "leavingDate",
            "proof",
        ],

    },
    Qualification: {
        tableHeads: [
            "Exams",
            "Institute/Boards",
            "Year",
            "Percentage",
            "Subjects",
        ],
        tableCells: [
            "exam",
            "institute",
            "year",
            "percentage",
            "subjects",
        ],
    },
    Degree: {
        tableHeads: [
            "Degree",
            "Title",
            "University",
            "Award Year",
            "Proof",
        ],
        tableCells: [
            "degreeName",
            "title",
            "university",
            "awardDate",
            "proof",
        ],
    },
    ResearchGuidance: {
        tableHeads: [
            "Are You a recognized research guide of this University",
            "Year",
            "Research Guide Letter",
        ],
        tableCells: [
            "isResearchGuide",
            "year",
            "proof",
        ],
    },
    ResearchPaper: {
        tableHeads: [
            "Paper Title",
            "Journal Name",
            "Publication Year",
            "ISSN Number",
            "Year",
            "Proof",
        ],
        tableCells: [
            "paperTitle",
            "journalName",
            "publicationYear",
            "issnNumber",
            "year",
            "proof"
        ],
        mainKey: {
            head: ['Paper Title'],
            keyName: ['paperTitle']
        }
    },
    TrimmedResearchProject: {
        tableHeads: [
            "Scheme/Project Name",
            "Program Title",
            "Principal Invigilator Name",
            "Funding Agency Name",
            "Government / Non-Government",
            "Department",
            "Award Year",
            "Provided Funds (INR)",
            "Major/Minor",
            "Project Status",
            "Project Duration",
            "Year",
            "Proofs",
        ],
        tableCells: [
            "schemeName",
            "programTitle",
            "principalName",
            "fundingName",
            "isGov",
            "department",
            "awardYear",
            "providedFunds",
            "fundType",
            "status",
            "projectDuration",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Scheme/Project Name'],
            keyName: ['schemeName']
        }

    },
    ResearchProject: {
        tableHeads: [
            "Scheme/Project Name",
            "Program Title",
            "Principal Invigilator Name",
            "Funding Agency Name",
            "Government / Non-Government",
            "Award Year",
            "Provided Funds (INR)",
            "Major/Minor",
            "Project Status",
            "Project Duration",
            "Year",
            "Proofs",
        ],
        tableCells: [
            "schemeName",
            "programTitle",
            "principalName",
            "fundingName",
            "isGov",
            "awardYear",
            "providedFunds",
            "fundType",
            "status",
            "projectDuration",
            "year",
            "proof",
        ],
        mainKey: {
            head: ['Scheme/Project Name'],
            keyName: ['schemeName']
        }


    },
    PolicyDocuments: {
        tableHeads: ["Policy Name", "Organisation Name", "Type", "Year", "Proofs"],
        tableCells: ["policyName", "organizationName", "isNat", "year", "proof"],
        mainKey: {
            head: ['Policy Name'],
            keyName: ['policyName']
        }
    }
}

export default CASDataTable