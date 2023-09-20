let siteLinks = {
    welcome: { title: 'Welcome', link: '/' },
    adminHome: { title: 'Admin Dashboard', link: '/admin' },
    facultyHome: { title: 'Faculty Home', link: '/faculty' },
    facultyProfile: { title: 'Faculty Profile', link: '/faculty/faculty-profile' },
    facultyReport: { title: 'Faculty Report', link: '/faculty/service/generateFacultyReport' },
    facultyLogin: { title: 'Faculty Login', link: '/faculty-login' },
    facultyPasswordReset: { title: "Faculty Password Reset", link: '/services/forgot-password/faculty' },
    facultyRegistration: { title: 'Faculty Registration', link: '/faculty-registration' },
    contractualFacultyRegistration: { title: 'Contractual Faculty Registration', link: '/contractual-faculty-registration' },
    facultyChangePass: { title: 'Change Password', link: '/changePassword' },
    cas: { title: 'CAS Report', link: '/faculty/service/cas-report' },
    casReport: { title: 'Generate CAS Report', link: '/faculty/service/generateCASReport' },
    pbas: { title: 'PBAS Report', link: '/faculty/service/pbas-report' },
    pbasReport: { title: 'Generate PBAS Report', link: '/faculty/service/generatePBASReport' },
    aqar: { title: 'Faculty AQAR Report', link: '/faculty/service/aqar-report' },
    aqarReport: { title: 'Generate AQAR Report', link: '/faculty/service/generateAQARReport' },
    directorAqar: { title: 'Director AQAR Report', link: '/director/service/aqar-report' },
    directorAqarReport: { title: 'Generate AQAR Report', link: '/director/service/generateAQARReport' },
    aaaReport: { title: 'Academic & Administrative Audit Report', link: '/director/service/generateAAAReport' },
    directorReport: { title: 'Director Report', link: '/director/service/generateDirectorReport' },
    directorPasswordReset: { title: "Director Password Reset", link: '/services/forgot-password/director' },
    directorHome: { title: 'Director Home', link: '/director' },
    directorLogin: { title: 'Director Login', link: '/director-login' },
    directorRegistration: { title: 'Director Registration', link: '/director-registration' },
    sdm: { title: 'School Data Management', link: '/director/sdm' },
    fdc: { title: 'Faculty Data Center', link: '/director/fdc' },
    rc: { title: 'Research Center', link: '/director/research-center' },
    ssm: { title: 'School Student Management', link: '/director/ssm' },
    aaa: { title: 'Academic Audit  ', link: '/director/service/academic-audit' },
    alumniLogin: { title: 'Alumni Login', link: '/alumni-login' },
    alumniHome: { title: 'Alumni Home', link: '/alumni' },
    alumniPasswordReset: { title: "Alumni Password Reset", link: '/services/forgot-password/alumni' },
    alumniRegistration: { title: 'Alumni Registration', link: '/alumni-registration' },
    alumniStatus: { title: 'Alumni Status', link: '/alumni/alumni-status' },
    studentLogin: { title: "Student Login", link: '/student-login' },
    studentHome: { title: "Student Home", link: '/student' },
    studentRegistration: { title: "Student Registration", link: '/student-registration' },
    studentPasswordReset: { title: "Student Password Reset", link: '/services/forgot-password/student' },
    studentStatus: { title: "Student Status", link: '/student/student-status' },
    allNews: { title: "All News", link: '/news' },
    proLogin: { title: "PRO Login", link: '/pro-login' },
    proEditor: { title: "PRO Editor", link: '/pro-editor' },
    proHome: { title: "PRO Home", link: '/pro' },
    adminLogin: { title: "Login to Admin", link: '/admin-login' },
    adminDashboard: { title: "Admin Dashboard", link: '/admin' },
    forgotPassword: { title: "Forgot Password", link: '' },
    generateFeedbackLinksDirector: { title: "Generate Feedback Links", link: '/director/service/generateFeebackLinks' },
    feedbackDashboard: { title: "Feedback Dashboard", link: '/director/service/feedback/dashboard' },
    feedbackAction: { title: "Feedback Action Taken Report", link: '/director/service/feedback/action' },
    serviceStatusForDirector: { title: "Report Status for Director", link: '/director/service/status' },
    serviceStatusForAdmin: { title: "Report Status for Admin", link: '/admin/service/status' },
    studentFeedack: { title: "Student Feedback Form", link: '/feedback/student' },
    teacherFeedack: { title: "Teacher Feedback Form", link: '/feedback/teacher' },
    parentFeedack: { title: "Parent Feedback Form", link: '/feedback/parent' },
    alumniFeedack: { title: "Alumni Feedback Form", link: '/feedback/alumni' },
    expertFeedback: { title: "Subject Expert Feedback Form", link: '/feedback/expert' },
    employerFeedack: { title: "Employer Feedback Form", link: '/feedback/employer' },
    studentSatisfactionSurvey: { title: "Student Satisfaction Survey", link: '/student-satisfaction-survey' },
    programs: { title: "Programs", link: '/programs' },
    addProgram: { title: "Add a Program", link: '/addProgram' },
    yfCollegeRegistration: { title: "Youth Festival College Registration", link: '/youthfestival/college-registration' },
    yfCollegeLogin: { title: "Youth Festival College Login", link: '/youthfestival/college-login' },
    yfCollegeHome: { title: "Youth Festival Home", link: '/youthfestival' },
    yfCollegeYouthForm: { title: "Youth Festival Participant Details Form", link: '/youthfestival/participant-details-form' },
    yfCollegeReport: { title: "Youth Festival Participant Report", link: '/youthfestival/generate-report' },
    nssLogin: { title: "NSS Login", link: '/nss-login' },
    nssHome: { title: "Department of NSS Home", link: '/nss' },
    nssAQAR: { title: "NSS AQAR", link: '/nss/aqar' },
    nssStudentAdmission: { title: "NSS Student Admission", link: '/nss/student-admission' },
    dsdLogin: { title: "Department of Student Development Login", link: '/dsd-login' },
    dsdHome: { title: "Department of Student Development Home", link: '/dsd' },
    dsdAQAR: { title: "DSD AQAR Form", link: '/dsd/aqar' },
    dsdDashboard: { title: "Youth Festival Dashboard for DSD", link: '/dsd/youthfestival/dashboard' },
    krcLogin: { title: "Knowledge Resource Center Login", link: '/krc-login' },
    krcHome: { title: "Knowledge Resource Center Home", link: '/krc' },
    krcAQAR: { title: "KRC AQAR", link: '/krc/aqar' },
    examLogin: { title: "BOEE Login", link: '/boee-login' },
    examHome: { title: "BOEE Home", link: '/boee' },
    examAQAR: { title: "BOEE AQAR", link: '/boee/aqar' },
    sportsLogin: { title: "Sports Login", link: '/sports-login' },
    sportsHome: { title: "Sports Home", link: '/sports' },
    sportsAQAR: { title: "Sports AQAR", link: '/sports/aqar' },
    placementLogin: { title: "Training & Placement Login", link: '/training-and-placement-login' },
    placementHome: { title: "Training & Placement Home", link: '/training-and-placement' },
    placementAQAR: { title: "Training & Placement AQAR", link: '/training-and-placement/aqar' },
    otherAQAR: { title: "Expenditure & Demand Ratio AQAR", link: '/expenditure-and-demand-ratio/aqar' },
    iilLogin: { title: "Innovation, Incubation and Linkages Login", link: '/iil-login' },
    iilHome: { title: "Innovation, Incubation and Linkages Home", link: '/iil' },
    iilAQAR: { title: "IIL AQAR", link: '/iil/aqar' },



}
export default siteLinks;
