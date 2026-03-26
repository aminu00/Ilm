export type Language = 'en' | 'ar' | 'yo' | 'ha' | 'ig' | 'pcm';

export const languageNames: Record<Language, string> = {
  en: 'English',
  ar: 'العربية',
  yo: 'Yorùbá',
  ha: 'Hausa',
  ig: 'Igbo',
  pcm: 'Pidgin',
};

export const rtlLanguages: Language[] = ['ar'];

type TranslationKeys = {
  // Common
  appName: string;
  appTagline: string;
  seekKnowledge: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  search: string;
  loading: string;
  noResults: string;
  back: string;
  submit: string;
  posting: string;
  
  // Nav
  home: string;
  explore: string;
  ask: string;
  saved: string;
  profile: string;
  admin: string;

  // Auth
  signIn: string;
  signUp: string;
  signOut: string;
  email: string;
  password: string;
  displayName: string;
  forgotPassword: string;
  resetPassword: string;
  sendResetLink: string;
  backToLogin: string;
  noAccount: string;
  haveAccount: string;
  continueWithGoogle: string;
  or: string;
  accountCreated: string;
  resetSent: string;
  newPassword: string;
  updatePassword: string;
  enterNewPassword: string;

  // Home
  all: string;
  noQuestionsYet: string;
  beFirstToAsk: string;
  askAQuestion: string;

  // Ask
  askQuestion: string;
  category: string;
  selectCategory: string;
  title: string;
  whatsYourQuestion: string;
  details: string;
  explainQuestion: string;
  askAnonymously: string;
  nameNotShown: string;
  postQuestion: string;

  // Question
  question: string;
  upvotes: string;
  views: string;
  answered: string;
  answers: string;
  noAnswersYet: string;
  scholarWillAnswer: string;
  respondAsScholar: string;
  writeYourAnswer: string;
  postAnswer: string;
  anonymous: string;

  // Explore
  categories: string;
  searchQuestions: string;
  noQuestionsFound: string;

  // Bookmarks
  savedQuestions: string;
  noSavedQuestions: string;
  bookmarkToFind: string;

  // Profile
  scholarProfile: string;
  settings: string;
  language: string;

  // Admin
  adminPanel: string;
  manageUsers: string;
  manageScholars: string;
  manageCategories: string;
  addScholar: string;
  removeScholar: string;
  users: string;
  scholars: string;
  role: string;
  actions: string;
  scholarAdded: string;
  scholarRemoved: string;
  noUsersFound: string;
  searchUsers: string;
  totalUsers: string;
  totalScholars: string;
  totalQuestions: string;
  totalAnswers: string;
  verified: string;
  notVerified: string;
  makeScholar: string;
  removeScholarRole: string;
  confirmAction: string;
  dashboard: string;
  // Share & Comments
  linkCopied: string;
  copyLink: string;
  shareQuestion: string;
  showComments: string;
  hideComments: string;
  noComments: string;
  writeComment: string;
  commentPosted: string;
  commentFailed: string;
  // Media Recording
  micPermissionDenied: string;
  cameraPermissionDenied: string;
  uploadFailed: string;
  recordingSaved: string;
  recording: string;
  stopRecording: string;
  // Scholar Profile & Explore
  followers: string;
  follow: string;
  unfollow: string;
  answerHistory: string;
  trending: string;
  mostUpvoted: string;
  recent: string;
  answeredTab: string;
  // Community
  community: string;
  communityTagline: string;
  createCommunity: string;
  communityCreated: string;
  communityCreateFailed: string;
  communityName: string;
  communityNameAr: string;
  communityDescription: string;
  communityIcon: string;
  noCommunities: string;
  posts: string;
  post: string;
  writePost: string;
  postCreated: string;
  postFailed: string;
  noPosts: string;
  postDeleted: string;
  // Reports
  reportPost: string;
  reportSpam: string;
  reportInappropriate: string;
  reportHarassment: string;
  reportOther: string;
  reportDetailsPlaceholder: string;
  submitReport: string;
  reportSubmitted: string;
  reportFailed: string;
  reports: string;
  pendingReports: string;
  resolvedReports: string;
  dismissReport: string;
  resolveReport: string;
  reportResolved: string;
  reportDismissed: string;
};

const translations: Record<Language, TranslationKeys> = {
  en: {
    appName: 'عِلم',
    appTagline: 'Ilm — Seek Knowledge',
    seekKnowledge: 'Seek Knowledge from the Scholars',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    loading: 'Loading...',
    noResults: 'No results',
    back: 'Back',
    submit: 'Submit',
    posting: 'Posting...',
    home: 'Home',
    explore: 'Explore',
    ask: 'Ask',
    saved: 'Saved',
    profile: 'Profile',
    admin: 'Admin',
    signIn: 'Sign In',
    signUp: 'Create Account',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    displayName: 'Display Name',
    forgotPassword: 'Forgot password?',
    resetPassword: 'Reset Password',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to login',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    continueWithGoogle: 'Continue with Google',
    or: 'or',
    accountCreated: 'Account created! Check your email to confirm.',
    resetSent: 'Password reset email sent! Check your inbox.',
    newPassword: 'New Password',
    updatePassword: 'Update Password',
    enterNewPassword: 'Enter your new password',
    all: 'All',
    noQuestionsYet: 'No questions yet',
    beFirstToAsk: 'Be the first to ask a question',
    askAQuestion: 'Ask a Question',
    askQuestion: 'Ask a Question',
    category: 'Category',
    selectCategory: 'Select a category',
    title: 'Title',
    whatsYourQuestion: "What's your question?",
    details: 'Details',
    explainQuestion: 'Explain your question in detail...',
    askAnonymously: 'Ask anonymously',
    nameNotShown: "Your name won't be shown",
    postQuestion: 'Post Question',
    question: 'Question',
    upvotes: 'upvotes',
    views: 'views',
    answered: 'Answered',
    answers: 'Answers',
    noAnswersYet: 'No answers yet',
    scholarWillAnswer: 'A scholar will answer this soon, In shaa Allah',
    respondAsScholar: 'Respond as Scholar',
    writeYourAnswer: 'Write your answer...',
    postAnswer: 'Post Answer',
    anonymous: 'Anonymous',
    categories: 'Categories',
    searchQuestions: 'Search questions...',
    noQuestionsFound: 'No questions found',
    savedQuestions: 'Saved Questions',
    noSavedQuestions: 'No saved questions',
    bookmarkToFind: 'Bookmark questions to find them later',
    scholarProfile: 'Scholar Profile',
    settings: 'Settings',
    language: 'Language',
    adminPanel: 'Admin Panel',
    manageUsers: 'Manage Users',
    manageScholars: 'Manage Scholars',
    manageCategories: 'Manage Categories',
    addScholar: 'Add Scholar',
    removeScholar: 'Remove Scholar',
    users: 'Users',
    scholars: 'Scholars',
    role: 'Role',
    actions: 'Actions',
    scholarAdded: 'Scholar role added successfully',
    scholarRemoved: 'Scholar role removed successfully',
    noUsersFound: 'No users found',
    searchUsers: 'Search users by name or email...',
    totalUsers: 'Total Users',
    totalScholars: 'Total Scholars',
    totalQuestions: 'Total Questions',
    totalAnswers: 'Total Answers',
    verified: 'Verified',
    notVerified: 'Not Verified',
    makeScholar: 'Make Scholar',
    removeScholarRole: 'Remove Scholar Role',
    confirmAction: 'Are you sure?',
    dashboard: 'Dashboard',
    linkCopied: 'Link copied!',
    copyLink: 'Copy Link',
    shareQuestion: 'Share',
    showComments: 'Comments',
    hideComments: 'Hide comments',
    noComments: 'No comments yet',
    writeComment: 'Write a comment...',
    commentPosted: 'Comment posted!',
    commentFailed: 'Failed to post comment',
    micPermissionDenied: 'Microphone access denied',
    cameraPermissionDenied: 'Camera access denied',
    uploadFailed: 'Upload failed',
    recordingSaved: 'Recording saved!',
    recording: 'Recording...',
    stopRecording: 'Stop Recording',
    followers: 'Followers',
    follow: 'Follow',
    unfollow: 'Unfollow',
    answerHistory: 'Answer History',
    trending: 'Trending',
    mostUpvoted: 'Most Upvoted',
    recent: 'Recent',
    answeredTab: 'Answered',
  },

  ar: {
    appName: 'عِلم',
    appTagline: 'عِلم — اطلب العلم',
    seekKnowledge: 'اطلب العلم من العلماء',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    search: 'بحث',
    loading: 'جاري التحميل...',
    noResults: 'لا توجد نتائج',
    back: 'رجوع',
    submit: 'إرسال',
    posting: 'جاري النشر...',
    home: 'الرئيسية',
    explore: 'استكشاف',
    ask: 'اسأل',
    saved: 'المحفوظة',
    profile: 'الملف الشخصي',
    admin: 'الإدارة',
    signIn: 'تسجيل الدخول',
    signUp: 'إنشاء حساب',
    signOut: 'تسجيل الخروج',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    displayName: 'الاسم',
    forgotPassword: 'نسيت كلمة المرور؟',
    resetPassword: 'إعادة تعيين كلمة المرور',
    sendResetLink: 'إرسال رابط الإعادة',
    backToLogin: 'العودة لتسجيل الدخول',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    continueWithGoogle: 'المتابعة مع Google',
    or: 'أو',
    accountCreated: 'تم إنشاء الحساب! تحقق من بريدك الإلكتروني للتأكيد.',
    resetSent: 'تم إرسال بريد إعادة التعيين! تحقق من صندوق الوارد.',
    newPassword: 'كلمة المرور الجديدة',
    updatePassword: 'تحديث كلمة المرور',
    enterNewPassword: 'أدخل كلمة المرور الجديدة',
    all: 'الكل',
    noQuestionsYet: 'لا توجد أسئلة بعد',
    beFirstToAsk: 'كن أول من يطرح سؤالاً',
    askAQuestion: 'اطرح سؤالاً',
    askQuestion: 'اطرح سؤالاً',
    category: 'التصنيف',
    selectCategory: 'اختر تصنيفاً',
    title: 'العنوان',
    whatsYourQuestion: 'ما هو سؤالك؟',
    details: 'التفاصيل',
    explainQuestion: 'اشرح سؤالك بالتفصيل...',
    askAnonymously: 'اسأل بشكل مجهول',
    nameNotShown: 'لن يظهر اسمك',
    postQuestion: 'نشر السؤال',
    question: 'سؤال',
    upvotes: 'تصويت',
    views: 'مشاهدة',
    answered: 'تمت الإجابة',
    answers: 'الإجابات',
    noAnswersYet: 'لا توجد إجابات بعد',
    scholarWillAnswer: 'سيجيب عالم على هذا قريباً إن شاء الله',
    respondAsScholar: 'الرد كعالم',
    writeYourAnswer: 'اكتب إجابتك...',
    postAnswer: 'نشر الإجابة',
    anonymous: 'مجهول',
    categories: 'التصنيفات',
    searchQuestions: 'ابحث في الأسئلة...',
    noQuestionsFound: 'لم يتم العثور على أسئلة',
    savedQuestions: 'الأسئلة المحفوظة',
    noSavedQuestions: 'لا توجد أسئلة محفوظة',
    bookmarkToFind: 'احفظ الأسئلة للعثور عليها لاحقاً',
    scholarProfile: 'ملف العالم',
    settings: 'الإعدادات',
    language: 'اللغة',
    adminPanel: 'لوحة الإدارة',
    manageUsers: 'إدارة المستخدمين',
    manageScholars: 'إدارة العلماء',
    manageCategories: 'إدارة التصنيفات',
    addScholar: 'إضافة عالم',
    removeScholar: 'إزالة عالم',
    users: 'المستخدمون',
    scholars: 'العلماء',
    role: 'الدور',
    actions: 'الإجراءات',
    scholarAdded: 'تمت إضافة دور العالم بنجاح',
    scholarRemoved: 'تمت إزالة دور العالم بنجاح',
    noUsersFound: 'لم يتم العثور على مستخدمين',
    searchUsers: 'ابحث عن المستخدمين بالاسم أو البريد...',
    totalUsers: 'إجمالي المستخدمين',
    totalScholars: 'إجمالي العلماء',
    totalQuestions: 'إجمالي الأسئلة',
    totalAnswers: 'إجمالي الإجابات',
    verified: 'موثق',
    notVerified: 'غير موثق',
    makeScholar: 'تعيين كعالم',
    removeScholarRole: 'إزالة دور العالم',
    confirmAction: 'هل أنت متأكد؟',
    dashboard: 'لوحة التحكم',
    linkCopied: 'تم نسخ الرابط!',
    copyLink: 'نسخ الرابط',
    shareQuestion: 'مشاركة',
    showComments: 'التعليقات',
    hideComments: 'إخفاء التعليقات',
    noComments: 'لا توجد تعليقات بعد',
    writeComment: 'اكتب تعليقًا...',
    commentPosted: 'تم نشر التعليق!',
    commentFailed: 'فشل نشر التعليق',
    micPermissionDenied: 'تم رفض الوصول إلى الميكروفون',
    cameraPermissionDenied: 'تم رفض الوصول إلى الكاميرا',
    uploadFailed: 'فشل الرفع',
    recordingSaved: 'تم حفظ التسجيل!',
    recording: 'جاري التسجيل...',
    stopRecording: 'إيقاف التسجيل',
    followers: 'المتابعون',
    follow: 'متابعة',
    unfollow: 'إلغاء المتابعة',
    answerHistory: 'سجل الإجابات',
    trending: 'الأكثر رواجًا',
    mostUpvoted: 'الأكثر تصويتًا',
    recent: 'الأحدث',
    answeredTab: 'مُجاب',
  },

  yo: {
    appName: 'عِلم',
    appTagline: 'Ilm — Wá Ìmọ̀',
    seekKnowledge: 'Wá Ìmọ̀ lọ́dọ̀ àwọn Ọ̀jọ̀gbọ́n',
    save: 'Fi pamọ́',
    cancel: 'Fagilee',
    delete: 'Pa rẹ́',
    edit: 'Ṣàtúnṣe',
    search: 'Wá',
    loading: 'Ń gbéwọlé...',
    noResults: 'Kò sí èsì',
    back: 'Padà',
    submit: 'Firanṣẹ́',
    posting: 'Ń firanṣẹ́...',
    home: 'Ilé',
    explore: 'Ṣàwárí',
    ask: 'Béèrè',
    saved: 'Tí a fi pamọ́',
    profile: 'Àkọọ́lẹ̀',
    admin: 'Alákòóso',
    signIn: 'Wọlé',
    signUp: 'Forúkọ sílẹ̀',
    signOut: 'Jáde',
    email: 'Ímeèlì',
    password: 'Ọ̀rọ̀ aṣínà',
    displayName: 'Orúkọ',
    forgotPassword: 'Gbàgbé ọ̀rọ̀ aṣínà?',
    resetPassword: 'Tún ọ̀rọ̀ aṣínà ṣe',
    sendResetLink: 'Fi ìjápọ̀ àtúnṣe ránṣẹ́',
    backToLogin: 'Padà sí ìwọlé',
    noAccount: 'Kò ní àkọọ́lẹ̀?',
    haveAccount: 'Ní àkọọ́lẹ̀ tẹ́lẹ̀?',
    continueWithGoogle: 'Tẹ̀síwájú pẹ̀lú Google',
    or: 'tàbí',
    accountCreated: 'A ti ṣẹ̀dá àkọọ́lẹ̀! Ṣàyẹ̀wò ímeèlì rẹ.',
    resetSent: 'A ti fi ímeèlì àtúnṣe ránṣẹ́!',
    newPassword: 'Ọ̀rọ̀ aṣínà tuntun',
    updatePassword: 'Ṣe àtúnṣe ọ̀rọ̀ aṣínà',
    enterNewPassword: 'Tẹ ọ̀rọ̀ aṣínà tuntun sílẹ̀',
    all: 'Gbogbo',
    noQuestionsYet: 'Kò sí ìbéèrè',
    beFirstToAsk: 'Jẹ́ ẹni àkọ́kọ́ láti béèrè',
    askAQuestion: 'Béèrè Ìbéèrè',
    askQuestion: 'Béèrè Ìbéèrè',
    category: 'Ẹ̀ka',
    selectCategory: 'Yan ẹ̀ka kan',
    title: 'Àkọlé',
    whatsYourQuestion: 'Kí ni ìbéèrè rẹ?',
    details: 'Àlàyé',
    explainQuestion: 'Ṣàlàyé ìbéèrè rẹ ní kíkún...',
    askAnonymously: 'Béèrè láìmọ̀',
    nameNotShown: 'A kò ní fi orúkọ rẹ hàn',
    postQuestion: 'Fi Ìbéèrè Sílẹ̀',
    question: 'Ìbéèrè',
    upvotes: 'ìbọ̀wọ̀',
    views: 'àwòrán',
    answered: 'Tí a dáhùn',
    answers: 'Ìdáhùn',
    noAnswersYet: 'Kò sí ìdáhùn',
    scholarWillAnswer: 'Ọ̀jọ̀gbọ́n yóò dáhùn láìpẹ́, In shaa Allah',
    respondAsScholar: 'Dáhùn gẹ́gẹ́ bí Ọ̀jọ̀gbọ́n',
    writeYourAnswer: 'Kọ ìdáhùn rẹ...',
    postAnswer: 'Fi Ìdáhùn Sílẹ̀',
    anonymous: 'Aláìlórúkọ',
    categories: 'Àwọn Ẹ̀ka',
    searchQuestions: 'Wá àwọn ìbéèrè...',
    noQuestionsFound: 'Kò rí ìbéèrè',
    savedQuestions: 'Ìbéèrè tí a fi pamọ́',
    noSavedQuestions: 'Kò sí ìbéèrè tí a fi pamọ́',
    bookmarkToFind: 'Fi ìbéèrè pamọ́ láti rí wọn lẹ́yìn náà',
    scholarProfile: 'Àkọọ́lẹ̀ Ọ̀jọ̀gbọ́n',
    settings: 'Ètò',
    language: 'Èdè',
    adminPanel: 'Ojú-iwé Alákòóso',
    manageUsers: 'Ṣàkóso Àwọn Olùlò',
    manageScholars: 'Ṣàkóso Àwọn Ọ̀jọ̀gbọ́n',
    manageCategories: 'Ṣàkóso Àwọn Ẹ̀ka',
    addScholar: 'Fi Ọ̀jọ̀gbọ́n kún',
    removeScholar: 'Yọ Ọ̀jọ̀gbọ́n kúrò',
    users: 'Àwọn Olùlò',
    scholars: 'Àwọn Ọ̀jọ̀gbọ́n',
    role: 'Ipò',
    actions: 'Ìṣe',
    scholarAdded: 'A ti fi ipò ọ̀jọ̀gbọ́n kún ní àṣeyọrí',
    scholarRemoved: 'A ti yọ ipò ọ̀jọ̀gbọ́n kúrò ní àṣeyọrí',
    noUsersFound: 'Kò rí olùlò',
    searchUsers: 'Wá àwọn olùlò nípasẹ̀ orúkọ tàbí ímeèlì...',
    totalUsers: 'Àpapọ̀ Olùlò',
    totalScholars: 'Àpapọ̀ Ọ̀jọ̀gbọ́n',
    totalQuestions: 'Àpapọ̀ Ìbéèrè',
    totalAnswers: 'Àpapọ̀ Ìdáhùn',
    verified: 'Tí a fìdí múlẹ̀',
    notVerified: 'Kò tí fìdí múlẹ̀',
    makeScholar: 'Ṣe Ọ̀jọ̀gbọ́n',
    removeScholarRole: 'Yọ Ipò Ọ̀jọ̀gbọ́n',
    confirmAction: 'Ṣé o dá ọ lójú?',
    dashboard: 'Pánẹ́ẹ̀lì Ìṣàkóso',
    linkCopied: 'A ti daakọ ìjápọ̀!',
    copyLink: 'Daakọ Ìjápọ̀',
    shareQuestion: 'Pín',
    showComments: 'Àwọn àlàyé',
    hideComments: 'Pa àwọn àlàyé mọ́',
    noComments: 'Kò sí àlàyé',
    writeComment: 'Kọ àlàyé kan...',
    commentPosted: 'A ti fi àlàyé sílẹ̀!',
    commentFailed: 'Kò le fi àlàyé sílẹ̀',
    micPermissionDenied: 'Kò gba àyè máíkì',
    cameraPermissionDenied: 'Kò gba àyè kámẹ́rà',
    uploadFailed: 'Gbígbé sókè kùnà',
    recordingSaved: 'A ti fi ìgbàsílẹ̀ pamọ́!',
    recording: 'Ń gbàsílẹ̀...',
    stopRecording: 'Dá Ìgbàsílẹ̀ Dúró',
    followers: 'Àwọn olùtẹ̀lé',
    follow: 'Tẹ̀lé',
    unfollow: 'Dá Ìtẹ̀lé Dúró',
    answerHistory: 'Ìtàn Ìdáhùn',
    trending: 'Àwọn tó ń gbajúmọ̀',
    mostUpvoted: 'Tí a bọ̀wọ̀ fún jùlọ',
    recent: 'Tuntun',
    answeredTab: 'Tí a dáhùn',
  },

  ha: {
    appName: 'عِلم',
    appTagline: 'Ilm — Nemi Ilimi',
    seekKnowledge: 'Nemi Ilimi daga Malamai',
    save: 'Ajiye',
    cancel: 'Soke',
    delete: 'Share',
    edit: 'Gyara',
    search: 'Bincike',
    loading: 'Ana ɗaukaka...',
    noResults: 'Babu sakamako',
    back: 'Koma',
    submit: 'Aika',
    posting: 'Ana aikawa...',
    home: 'Gida',
    explore: 'Bincika',
    ask: 'Tambaya',
    saved: 'Ajiyayyu',
    profile: 'Bayanan Kai',
    admin: 'Mai Gudanarwa',
    signIn: 'Shiga',
    signUp: 'Yi Rajista',
    signOut: 'Fita',
    email: 'Imel',
    password: 'Kalmar Sirri',
    displayName: 'Suna',
    forgotPassword: 'An manta kalmar sirri?',
    resetPassword: 'Sake saita kalmar sirri',
    sendResetLink: 'Aika hanyar sake saita',
    backToLogin: 'Koma zuwa shiga',
    noAccount: 'Ba ka da asusu?',
    haveAccount: 'Kana da asusu?',
    continueWithGoogle: 'Ci gaba da Google',
    or: 'ko',
    accountCreated: 'An ƙirƙiri asusu! Duba imel ɗinka don tabbatarwa.',
    resetSent: 'An aika imel ɗin sake saita! Duba akwatin wasiƙa.',
    newPassword: 'Sabuwar Kalmar Sirri',
    updatePassword: 'Sabunta Kalmar Sirri',
    enterNewPassword: 'Shigar da sabuwar kalmar sirri',
    all: 'Duka',
    noQuestionsYet: 'Babu tambayoyi tukuna',
    beFirstToAsk: 'Kasance na farko da ya yi tambaya',
    askAQuestion: 'Yi Tambaya',
    askQuestion: 'Yi Tambaya',
    category: 'Nau\'i',
    selectCategory: 'Zaɓi nau\'i',
    title: 'Take',
    whatsYourQuestion: 'Menene tambayar ka?',
    details: 'Cikakkun Bayanai',
    explainQuestion: 'Bayyana tambayar ka a cikakke...',
    askAnonymously: 'Yi tambaya ba tare da sunan ka ba',
    nameNotShown: 'Ba za a nuna sunan ka ba',
    postQuestion: 'Buga Tambaya',
    question: 'Tambaya',
    upvotes: 'ƙuri\'u',
    views: 'kallon',
    answered: 'An Amsa',
    answers: 'Amsoshi',
    noAnswersYet: 'Babu amsoshi tukuna',
    scholarWillAnswer: 'Malami zai amsa nan ba da daɗewa ba, In shaa Allah',
    respondAsScholar: 'Amsa a matsayin Malami',
    writeYourAnswer: 'Rubuta amsarka...',
    postAnswer: 'Buga Amsa',
    anonymous: 'Ba a san wanda ba',
    categories: 'Nau\'o\'i',
    searchQuestions: 'Binciki tambayoyi...',
    noQuestionsFound: 'Ba a sami tambayoyi ba',
    savedQuestions: 'Tambayoyin da aka Ajiye',
    noSavedQuestions: 'Babu tambayoyin da aka ajiye',
    bookmarkToFind: 'Ajiye tambayoyi don samun su daga baya',
    scholarProfile: 'Bayanan Malami',
    settings: 'Saituna',
    language: 'Harshe',
    adminPanel: 'Shafin Mai Gudanarwa',
    manageUsers: 'Sarrafa Masu Amfani',
    manageScholars: 'Sarrafa Malamai',
    manageCategories: 'Sarrafa Nau\'o\'i',
    addScholar: 'Ƙara Malami',
    removeScholar: 'Cire Malami',
    users: 'Masu Amfani',
    scholars: 'Malamai',
    role: 'Matsayi',
    actions: 'Ayyuka',
    scholarAdded: 'An ƙara matsayin malami cikin nasara',
    scholarRemoved: 'An cire matsayin malami cikin nasara',
    noUsersFound: 'Ba a sami masu amfani ba',
    searchUsers: 'Binciki masu amfani ta suna ko imel...',
    totalUsers: 'Jimlar Masu Amfani',
    totalScholars: 'Jimlar Malamai',
    totalQuestions: 'Jimlar Tambayoyi',
    totalAnswers: 'Jimlar Amsoshi',
    verified: 'An Tabbatar',
    notVerified: 'Ba a Tabbatar ba',
    makeScholar: 'Mai da Malami',
    removeScholarRole: 'Cire Matsayin Malami',
    confirmAction: 'Ka tabbata?',
    dashboard: 'Shafin Sarrafa',
    linkCopied: 'An kwafi hanyar!',
    copyLink: 'Kwafi Hanyar',
    shareQuestion: 'Rabawa',
    showComments: 'Sharhi',
    hideComments: 'Ɓoye sharhi',
    noComments: 'Babu sharhi tukuna',
    writeComment: 'Rubuta sharhi...',
    commentPosted: 'An buga sharhi!',
    commentFailed: 'Ba a iya buga sharhi ba',
    micPermissionDenied: 'An hana samun damar mai ɗaukar sauti',
    cameraPermissionDenied: 'An hana samun damar kyamara',
    uploadFailed: 'Ɗora ya kasa',
    recordingSaved: 'An ajiye rikodin!',
    recording: 'Ana rikodin...',
    stopRecording: 'Dakatar da Rikodin',
    followers: 'Mabiya',
    follow: 'Bi',
    unfollow: 'Daina Bi',
    answerHistory: 'Tarihin Amsoshi',
    trending: 'Mafi Yawan Bincike',
    mostUpvoted: 'Mafi Yawan Ƙuri\'u',
    recent: 'Sababbi',
    answeredTab: 'An Amsa',
  },

  ig: {
    appName: 'عِلم',
    appTagline: 'Ilm — Chọọ Ihe Ọmụma',
    seekKnowledge: 'Chọọ Ihe Ọmụma site n\'aka Ndị Ọkà',
    save: 'Chekwaa',
    cancel: 'Kagbuo',
    delete: 'Hichapụ',
    edit: 'Dezie',
    search: 'Chọọ',
    loading: 'Na-ebufe...',
    noResults: 'Enweghị nsonaazụ',
    back: 'Laghachi',
    submit: 'Nyefee',
    posting: 'Na-eziga...',
    home: 'Ụlọ',
    explore: 'Nyochaa',
    ask: 'Jụọ',
    saved: 'Ndị echekwara',
    profile: 'Profaịlụ',
    admin: 'Onye Nchịkwa',
    signIn: 'Banye',
    signUp: 'Debanye Aha',
    signOut: 'Pụọ',
    email: 'Email',
    password: 'Okwuntụghe',
    displayName: 'Aha',
    forgotPassword: 'Chefuru okwuntụghe?',
    resetPassword: 'Tọgharia okwuntụghe',
    sendResetLink: 'Ziga njikọ ntọgharia',
    backToLogin: 'Laghachi na mbanye',
    noAccount: 'Enweghị akaụntụ?',
    haveAccount: 'Nwere akaụntụ?',
    continueWithGoogle: 'Gaa n\'ihu na Google',
    or: 'ma ọ bụ',
    accountCreated: 'Emepụtara akaụntụ! Lelee email gị iji kwado.',
    resetSent: 'Ezigara email ntọgharia!',
    newPassword: 'Okwuntụghe Ọhụrụ',
    updatePassword: 'Melite Okwuntụghe',
    enterNewPassword: 'Tinye okwuntụghe ọhụrụ gị',
    all: 'Niile',
    noQuestionsYet: 'Enweghị ajụjụ',
    beFirstToAsk: 'Bụrụ onye mbụ jụrụ ajụjụ',
    askAQuestion: 'Jụọ Ajụjụ',
    askQuestion: 'Jụọ Ajụjụ',
    category: 'Ụdị',
    selectCategory: 'Họrọ ụdị',
    title: 'Isiokwu',
    whatsYourQuestion: 'Gịnị bụ ajụjụ gị?',
    details: 'Nkọwa',
    explainQuestion: 'Kọwaa ajụjụ gị nke ọma...',
    askAnonymously: 'Jụọ n\'ikpugheghị aha',
    nameNotShown: 'Agaghị egosi aha gị',
    postQuestion: 'Bipụta Ajụjụ',
    question: 'Ajụjụ',
    upvotes: 'ntụ aka elu',
    views: 'nlele',
    answered: 'Azaala',
    answers: 'Azịza',
    noAnswersYet: 'Enweghị azịza',
    scholarWillAnswer: 'Onye ọkà ga-aza nke a n\'oge na-adịghị anya, In shaa Allah',
    respondAsScholar: 'Za dịka Onye Ọkà',
    writeYourAnswer: 'Dee azịza gị...',
    postAnswer: 'Bipụta Azịza',
    anonymous: 'Onye amaghị aha ya',
    categories: 'Ụdị Niile',
    searchQuestions: 'Chọọ ajụjụ...',
    noQuestionsFound: 'Ahụghị ajụjụ ọ bụla',
    savedQuestions: 'Ajụjụ Ndị Echekwara',
    noSavedQuestions: 'Enweghị ajụjụ echekwara',
    bookmarkToFind: 'Chekwaa ajụjụ iji chọta ha mgbe e mesịrị',
    scholarProfile: 'Profaịlụ Onye Ọkà',
    settings: 'Ntọala',
    language: 'Asụsụ',
    adminPanel: 'Pánẹ́lụ Nchịkwa',
    manageUsers: 'Jikwaa Ndị Ọrụ',
    manageScholars: 'Jikwaa Ndị Ọkà',
    manageCategories: 'Jikwaa Ụdị',
    addScholar: 'Tinye Onye Ọkà',
    removeScholar: 'Wepụ Onye Ọkà',
    users: 'Ndị Ọrụ',
    scholars: 'Ndị Ọkà',
    role: 'Ọrụ',
    actions: 'Omume',
    scholarAdded: 'Etinyela ọrụ onye ọkà nke ọma',
    scholarRemoved: 'Ewepụla ọrụ onye ọkà nke ọma',
    noUsersFound: 'Ahụghị ndị ọrụ',
    searchUsers: 'Chọọ ndị ọrụ site na aha ma ọ bụ email...',
    totalUsers: 'Mkpokọta Ndị Ọrụ',
    totalScholars: 'Mkpokọta Ndị Ọkà',
    totalQuestions: 'Mkpokọta Ajụjụ',
    totalAnswers: 'Mkpokọta Azịza',
    verified: 'Akwadoro',
    notVerified: 'Akwadoghị',
    makeScholar: 'Mee Onye Ọkà',
    removeScholarRole: 'Wepụ Ọrụ Onye Ọkà',
    confirmAction: 'Ị ji n\'aka?',
    dashboard: 'Dashịbọọdụ',
    linkCopied: 'Edekọla njikọ!',
    copyLink: 'Detuo Njikọ',
    shareQuestion: 'Kekọrịta',
    showComments: 'Okwu',
    hideComments: 'Zoo okwu',
    noComments: 'Enweghị okwu',
    writeComment: 'Dee okwu...',
    commentPosted: 'Etinyela okwu!',
    commentFailed: 'Enweghị ike itinye okwu',
    micPermissionDenied: 'Agọghị nnweta maịkrọfọn',
    cameraPermissionDenied: 'Agọghị nnweta kamẹra',
    uploadFailed: 'Nbugo adaghị',
    recordingSaved: 'Edekọla ndekọ!',
    recording: 'Na-edeko...',
    stopRecording: 'Kwụsị Ndekọ',
    followers: 'Ndị na-eso',
    follow: 'Soro',
    unfollow: 'Kwụsị Ịso',
    answerHistory: 'Akụkọ Azịza',
    trending: 'Ndị na-ewu ewu',
    mostUpvoted: 'Kacha ntụ aka',
    recent: 'Ọhụrụ',
    answeredTab: 'Azaala',
  },

  pcm: {
    appName: 'عِلم',
    appTagline: 'Ilm — Find Knowledge',
    seekKnowledge: 'Find Knowledge from di Scholars dem',
    save: 'Save am',
    cancel: 'Cancel am',
    delete: 'Delete am',
    edit: 'Edit am',
    search: 'Search',
    loading: 'E dey load...',
    noResults: 'Nothing dey',
    back: 'Go back',
    submit: 'Send am',
    posting: 'E dey send...',
    home: 'Home',
    explore: 'Explore',
    ask: 'Ask',
    saved: 'Saved',
    profile: 'Profile',
    admin: 'Admin',
    signIn: 'Sign In',
    signUp: 'Create Account',
    signOut: 'Sign Out',
    email: 'Email',
    password: 'Password',
    displayName: 'Your Name',
    forgotPassword: 'You forget password?',
    resetPassword: 'Reset Password',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Go back to login',
    noAccount: 'You no get account?',
    haveAccount: 'You get account?',
    continueWithGoogle: 'Continue with Google',
    or: 'or',
    accountCreated: 'Account don create! Check your email make you confirm am.',
    resetSent: 'We don send password reset email! Check your inbox.',
    newPassword: 'New Password',
    updatePassword: 'Update Password',
    enterNewPassword: 'Put your new password',
    all: 'All',
    noQuestionsYet: 'No question dey yet',
    beFirstToAsk: 'Be the first person wey go ask question',
    askAQuestion: 'Ask Question',
    askQuestion: 'Ask Question',
    category: 'Category',
    selectCategory: 'Choose category',
    title: 'Title',
    whatsYourQuestion: 'Wetin be your question?',
    details: 'Details',
    explainQuestion: 'Explain your question well well...',
    askAnonymously: 'Ask without name',
    nameNotShown: 'Dem no go show your name',
    postQuestion: 'Post Question',
    question: 'Question',
    upvotes: 'upvotes',
    views: 'views',
    answered: 'Answered',
    answers: 'Answers',
    noAnswersYet: 'No answer yet',
    scholarWillAnswer: 'Scholar go answer soon, In shaa Allah',
    respondAsScholar: 'Answer as Scholar',
    writeYourAnswer: 'Write your answer...',
    postAnswer: 'Post Answer',
    anonymous: 'Anonymous',
    categories: 'Categories',
    searchQuestions: 'Search questions...',
    noQuestionsFound: 'No question dey',
    savedQuestions: 'Questions wey you Save',
    noSavedQuestions: 'You never save any question',
    bookmarkToFind: 'Save questions make you fit find am later',
    scholarProfile: 'Scholar Profile',
    settings: 'Settings',
    language: 'Language',
    adminPanel: 'Admin Panel',
    manageUsers: 'Manage Users',
    manageScholars: 'Manage Scholars',
    manageCategories: 'Manage Categories',
    addScholar: 'Add Scholar',
    removeScholar: 'Remove Scholar',
    users: 'Users',
    scholars: 'Scholars',
    role: 'Role',
    actions: 'Actions',
    scholarAdded: 'Scholar role don add well well',
    scholarRemoved: 'Scholar role don remove well well',
    noUsersFound: 'No user dey',
    searchUsers: 'Search users by name or email...',
    totalUsers: 'Total Users',
    totalScholars: 'Total Scholars',
    totalQuestions: 'Total Questions',
    totalAnswers: 'Total Answers',
    verified: 'Verified',
    notVerified: 'Not Verified',
    makeScholar: 'Make Scholar',
    removeScholarRole: 'Remove Scholar Role',
    confirmAction: 'You sure?',
    dashboard: 'Dashboard',
    linkCopied: 'Link don copy!',
    copyLink: 'Copy Link',
    shareQuestion: 'Share',
    showComments: 'Comments',
    hideComments: 'Hide comments',
    noComments: 'No comment yet',
    writeComment: 'Write comment...',
    commentPosted: 'Comment don post!',
    commentFailed: 'Comment no fit post',
    micPermissionDenied: 'Mic access no gree',
    cameraPermissionDenied: 'Camera access no gree',
    uploadFailed: 'Upload fail',
    recordingSaved: 'Recording don save!',
    recording: 'E dey record...',
    stopRecording: 'Stop Recording',
    followers: 'Followers',
    follow: 'Follow',
    unfollow: 'Unfollow',
    answerHistory: 'Answer History',
    trending: 'Trending',
    mostUpvoted: 'Most Upvoted',
    recent: 'Recent',
    answeredTab: 'Answered',
  },
};

export default translations;
