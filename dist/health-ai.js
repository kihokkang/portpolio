/* ==========================================================================
   HEALTH AI // ARCHITECTURE DOSSIER INTERACTIVE ENGINE
   AX Frontier Pattern: Sequence Stepper · Module Filter · Spec Tabs · Lightbox
   Zero Emojis · Verified SaaSTeam_AI-local Architecture
   ========================================================================== */

(function () {
  'use strict';

  // --- 1. All 26 Cleaned Mobile App Screenshots ---
  const ALL_SCREENS = [
    {
      id: 's00-intro',
      category: 'home',
      catLabel: 'HOME · ONBOARDING',
      title: '00 · 앱 인트로 & 하이브리드 부팅',
      sub: 'Flutter 네이티브 셸 및 Vue WebView 브리지 초기화',
      img: 'assets/health/s00-intro.png',
      runtime: 'Hybrid Shell',
      route: 'Flutter WebView -> /Intro',
      bridge: 'WebViewController + JWT Access/Refresh 자동 검증 (POST /api/auth/token)',
      desc: 'Flutter 네이티브 셸이 WebView를 마운트하고 4개의 JavascriptChannel(FlutterChannel, FlutterBodyCheck, FlutterFitnessPose, FlutterOpenBrowser)을 바인딩하며 초기 진입 화면을 렌더링합니다.'
    },
    {
      id: 's11-main-advice',
      category: 'home',
      catLabel: 'HOME · DAILY AI BRIEF',
      title: '01 · 홈 AI 건강 조언 & 유튜브 캐러셀',
      sub: '일별 3가지 AI 건강 팁 + 맞춤 운동 유튜브 큐레이션',
      img: 'assets/health/s11-main-advice.png',
      runtime: 'Vue 2 WebView',
      route: '/Main -> Main.vue',
      bridge: 'GET /api/advice?date=2025-01-02 · GET /api/interest/news-and-videos',
      desc: '상단 유튜브 큐레이션 슬라이더와 날짜 선택기(vue2-datepicker)를 중심으로 매일 새벽 03:00에 생성·적재된 개인별 식단·운동·수분 섭취 AI 조언 3건을 카드로 제공합니다.'
    },
    {
      id: 's12-main-activity',
      category: 'home',
      catLabel: 'HOME · ACTIVITY METRICS',
      title: '02 · 일일 활동량 & 영양 밸런스',
      sub: '사용자 프로필 기반 하루 권장 kcal 및 활동 목표 확인',
      img: 'assets/health/s12-main-activity.png',
      runtime: 'Vue 2 WebView',
      route: '/Main -> Main.vue',
      bridge: 'GET /api/nutrition · GET /api/fitnessPlan/dayPlan',
      desc: '사용자의 키·체중·나이·성별·목표를 기반으로 GPT-3.5가 산출한 19개 영양 지표 권장량과 당일 운동 플랜 수행 현황을 직관적으로 요약합니다.'
    },
    {
      id: 's13-main-report',
      category: 'home',
      catLabel: 'HOME · HEALTH REPORT',
      title: '03 · 종합 AI 건강 리포트 요약',
      sub: '식단·운동·체형 분석 이력을 단일 타임라인에서 조회',
      img: 'assets/health/s13-main-report.png',
      runtime: 'Vue 2 WebView',
      route: '/Main -> Main.vue',
      bridge: 'GET /api/food · GET /api/user/profile',
      desc: '여러 개별 앱에 흩어져 있던 식단 칼로리, 운동 완료 세트, 최신 체형 분석 결과를 단일 스크롤 대시보드로 통합해 재진입 장벽을 낮췄습니다.'
    },
    {
      id: 's21-fitness-input',
      category: 'fitness',
      catLabel: 'FITNESS · GOAL INPUT',
      title: '04 · 맞춤형 운동 목표·부위 설정',
      sub: '운동 숙련도·목표 부위·가용 장비 입력 폼',
      img: 'assets/health/s21-fitness-input.png',
      runtime: 'Vue 2 WebView',
      route: '/FitnessPlanInput -> FitnessPlanInput.vue',
      bridge: 'POST /api/fitnessPlan (GPT-4 incremental 2+2+3 day planner)',
      desc: '사용자가 운동 목표, 집중 부위, 주간 빈도를 선택하면 Express 서버가 GPT-4에게 7일 플랜 생성을 요청합니다. 응답 타임아웃 방지를 위해 2일+2일+3일 분할 생성 전략을 적용했습니다.'
    },
    {
      id: 's22-fitness-plan',
      category: 'fitness',
      catLabel: 'FITNESS · 7-DAY ROUTINE',
      title: '05 · 생성된 주간 AI 운동 루틴 상세',
      sub: '주차별·일별 세트/횟수 체크 및 실시간 포즈 측정 진입',
      img: 'assets/health/s22-fitness-plan.png',
      runtime: 'Vue 2 WebView',
      route: '/FitnessPlanDetail -> FitnessPlanDetail.vue',
      bridge: "window.FlutterFitnessPose.postMessage('fitnessPose&' + JSON.stringify(fitnessInfo))",
      desc: '주차·요일 탭으로 당일 루틴(스쿼트 15회 4세트 등)을 확인하고, 포즈 시작 버튼 클릭 시 FlutterFitnessPose 채널을 통해 네이티브 카메라 포즈 인식 화면을 호출합니다.'
    },
    {
      id: 's23-fitness-pose1',
      category: 'fitness',
      catLabel: 'FLUTTER · POSE CAMERA',
      title: '06 · Flutter 실시간 스켈레톤 포즈 트래킹 (스쿼트)',
      sub: '관절 키포인트 스켈레톤 오버레이 · 세트/횟수 실시간 카운팅',
      img: 'assets/health/s23-fitness-pose1.jpg',
      runtime: 'Flutter Native Camera',
      route: 'Native Pose Detector (2.4x Zoom HUD)',
      bridge: 'Flutter Pose ML -> elbowAngle · kneeAngle · torsoAngle · torsoStability 누적',
      desc: 'Vue WebView에서 전달받은 운동 종목(squat, curl, pushUp, pullUp, legRaise)을 기준으로 Flutter 네이티브 카메라가 실시간 관절 각도와 상체 안정성을 측정하고 반복 횟수·세트를 자동 카운팅합니다.'
    },
    {
      id: 's24-fitness-pose2',
      category: 'fitness',
      catLabel: 'FLUTTER · POSE CAMERA',
      title: '07 · 실시간 모션 각도 측정 & 상태 전환',
      sub: '하강/상승 stage 판별 및 실제 수행 시간 계측',
      img: 'assets/health/s24-fitness-pose2.jpg',
      runtime: 'Flutter Native Camera',
      route: 'Native Pose Detector -> Callback Bridge',
      bridge: 'window.handlePoseAnalysisResult(poseDataList, actualDuration)',
      desc: '세트가 종료되면 측정된 각도 시계열 배열(poseDataList)과 실제 운동 시간(actualDuration)을 직렬화하여 Vue 전역 콜백 window.handlePoseAnalysisResult로 역전달합니다.'
    },
    {
      id: 's25-fitness-loading',
      category: 'fitness',
      catLabel: 'FITNESS · AI COACHING SYNC',
      title: '08 · 자세 시계열 데이터 AI 분석 중',
      sub: 'GPT-4 기반 5개 영역 자세 정밀 교정 리포트 생성',
      img: 'assets/health/s25-fitness-loading.png',
      runtime: 'Vue 2 WebView',
      route: '/FitnessPlanDetail -> Loading Overlay',
      bridge: 'POST /api/fitnessPlan/updateDayPlan (MongoDB arrayFilters atomic update)',
      desc: 'Flutter에서 전달된 poseDataList를 Express 서버로 전송해 MongoDB nested day schema를 $[weekElem].days.$[dayElem] 조건으로 원자 업데이트하고 GPT-4 코칭을 생성합니다.'
    },
    {
      id: 's26-fitness-feedback1',
      category: 'fitness',
      catLabel: 'FITNESS · AI POSTURE REPORT',
      title: '09 · AI 운동 자세 교정 리포트 (1/2)',
      sub: '가동 범위·정렬 안정성·코어 균형 HTML 카드',
      img: 'assets/health/s26-fitness-feedback1.png',
      runtime: 'Vue 2 WebView',
      route: '/FitnessPlanDetail -> Coaching Result',
      bridge: 'GPT-4 5-Section Ordered List <ol> Structured Feedback',
      desc: '무릎 굴곡 각도, 발뒤꿈치 들림 위험, 상체 기울기 등 실제 측정 각도 데이터를 근거로 부상 예방 중심의 구체적인 자세 교정 피드백을 제공합니다.'
    },
    {
      id: 's27-fitness-feedback2',
      category: 'fitness',
      catLabel: 'FITNESS · AI POSTURE REPORT',
      title: '10 · AI 운동 자세 교정 리포트 (2/2)',
      sub: '다음 세트 개선 포인트 & 수행 시간/칼로리 요약',
      img: 'assets/health/s27-fitness-feedback2.png',
      runtime: 'Vue 2 WebView',
      route: '/FitnessPlanDetail -> Coaching Result',
      bridge: 'Saved to MongoDB FitnessPlan & reflected in Home Report',
      desc: '측정 완료된 세트 이력이 자동 저장되어 다음 루틴 강도 조절과 홈 대시보드 주간 운동 통계에 즉시 반영됩니다.'
    },
    {
      id: 's31-meal-list',
      category: 'meal',
      catLabel: 'MEAL · DAILY LOG',
      title: '11 · 일일 식단 기록 & 끼니별 칼로리 합계',
      sub: '아침·점심·저녁 카드 및 카메라 촬영 브리지 진입',
      img: 'assets/health/s31-meal-list.png',
      runtime: 'Vue 2 WebView',
      route: '/Food -> FoodManagement.vue',
      bridge: "window.FlutterChannel.postMessage('captureImage')",
      desc: '날짜별 섭취 식단 리스트를 조회하고, 사진 촬영 버튼 클릭 시 FlutterChannel을 통해 네이티브 카메라를 실행해 음식 사진을 Base64로 즉시 반환받습니다.'
    },
    {
      id: 's32-meal-loading',
      category: 'meal',
      catLabel: 'MEAL · GPT-4o VISION',
      title: '12 · GPT-4o 식단 비전 분석 진행 화면',
      sub: 'Cloudinary 이미지 호스팅 & GPT-4o 다중 영양소 추론',
      img: 'assets/health/s32-meal-loading.png',
      runtime: 'Vue 2 WebView',
      route: '/Food -> window.handleCapturedImage Callback',
      bridge: 'POST /api/food/analyzeImage (gpt-4o + imgHosting Cloudinary)',
      desc: '네이티브에서 전달받은 Base64 이미지를 Express 서버(100mb 페이로드)가 받아 Cloudinary에 업로드한 뒤 GPT-4o Vision API로 칼로리·탄수화물·단백질·지방을 추출합니다.'
    },
    {
      id: 's33-meal-result1',
      category: 'meal',
      catLabel: 'MEAL · NUTRITION RESULT',
      title: '13 · 식단 칼로리·탄단지 비율 및 AI 음식 분석',
      sub: '450 kcal 탄단지 배지 · 재료/조리법 AI 설명 & 타이핑 연출',
      img: 'assets/health/s33-meal-result1.png',
      runtime: 'Vue 2 WebView',
      route: '/Food -> FoodManagement.vue',
      bridge: '30ms Typing Effect UI + User Nutrition Goal Comparison',
      desc: '음식 사진과 함께 총 칼로리, 탄·단·지 그램(g), 주재료/조리법 및 사용자의 목표 칼로리 대비 적합성 코멘트를 30ms 타이핑 오버레이로 출력합니다.'
    },
    {
      id: 's34-meal-result2',
      category: 'meal',
      catLabel: 'MEAL · NUTRITION RESULT',
      title: '14 · 보완 식재료 추천 & 식단 상세 리포트',
      sub: '부족 영양소를 채우는 다음 끼니·페어링 추천',
      img: 'assets/health/s34-meal-result2.png',
      runtime: 'Vue 2 WebView',
      route: '/Food -> FoodManagement.vue',
      bridge: 'POST /api/food (Saved to MongoDB Food Collection)',
      desc: '단순 수치 나열에 그치지 않고 부족한 식이섬유·미량영양소를 보완하는 음식 페어링과 식단 개선 제안을 함께 저장해 일일 조언 생성 시 참조합니다.'
    },
    {
      id: 's41-body-input',
      category: 'body',
      catLabel: 'BODY · PROFILE INPUT',
      title: '15 · 바디라인 체형 분석 기본 정보 입력',
      sub: '키·몸무게·스타일 선호 입력 후 전신 가이드 촬영 진입',
      img: 'assets/health/s41-body-input.png',
      runtime: 'Vue 2 WebView',
      route: '/Body -> BodyInput.vue',
      bridge: "window.FlutterBodyCheck.postMessage('bodyCheck&' + userId)",
      desc: 'BMI·신장 정보와 평소 스타일 선호도를 입력하고 촬영 버튼을 누르면 FlutterBodyCheck 채널을 통해 전신 실루엣 가이드가 포함된 네이티브 카메라가 열립니다.'
    },
    {
      id: 's42-body-capture',
      category: 'body',
      catLabel: 'FLUTTER · BODY CHECK CAM',
      title: '16 · Flutter 전신 실루엣 가이드 & 키포인트 촬영',
      sub: '화면 인체 윤곽선 맞추기 + 적색 랜드마크 포인트 정렬',
      img: 'assets/health/s42-body-capture.png',
      runtime: 'Flutter Native Camera',
      route: 'Native Body Silhouette Alignment Camera',
      bridge: 'Flutter -> window.handledBodyCheck (Base64 Image Callback)',
      desc: '정확한 체형 비율 판별을 위해 Flutter 카메라 뷰파인더 위에 전신 인체 윤곽 가이드와 관절 키포인트 마커를 오버레이하여 촬영 편차를 최소화했습니다.'
    },
    {
      id: 's43-body-result1',
      category: 'body',
      catLabel: 'BODY · AI DIAGNOSIS',
      title: '17 · AI 체형 진단 (모래시계형 등) & BMI 요약',
      sub: 'GPT-4-Turbo Vision 전신 비율 판별 및 체형별 특성 안내',
      img: 'assets/health/s43-body-result1.png',
      runtime: 'Vue 2 WebView',
      route: '/BodyDetail -> BodyDetail.vue',
      bridge: 'POST /api/gpt/bodyshape (gpt-4-turbo)',
      desc: '어깨·허리·골반 비율을 GPT-4-Turbo Vision으로 분석하여 체형 유형(역삼각형·모래시계형·직사각형 등)을 진단하고 장단점 요약을 카드로 제공합니다.'
    },
    {
      id: 's44-body-result2',
      category: 'body',
      catLabel: 'BODY · STYLING & WORKOUT',
      title: '18 · 체형 맞춤 코디 추천 & 균형 보완 운동 루틴',
      sub: '체형 장점 부각 스타일링 + 네이버 이미지/유튜브 연동',
      img: 'assets/health/s44-body-result2.png',
      runtime: 'Vue 2 WebView',
      route: '/BodyDetail -> BodyDetail.vue',
      bridge: 'Naver Image Search Cache + Body Workout Recommendation',
      desc: '진단된 체형에 어울리는 의상 핏·실루엣 스타일링 가이드를 이미지와 함께 큐레이션하고 체형 균형을 개선할 타깃 운동을 연결합니다.'
    },
    {
      id: 's51-challenge-list',
      category: 'challenge',
      catLabel: 'CHALLENGE · 30-DAY BOARD',
      title: '19 · 30일 건강 습관 챌린지 목표 & 캘린더',
      sub: '저칼로리 식사 등 30일 챌린지 목록 및 일차별 스탬프',
      img: 'assets/health/s51-challenge-list.png',
      runtime: 'Vue 2 WebView',
      route: '/Challenge -> Challenge.vue',
      bridge: 'GET /api/challenge · Camera Trigger for Day Verification',
      desc: '사용자의 지속적인 참여(Participatory)를 유도하기 위해 30일 단위 습관 챌린지와 성공 조건(예: 30일 중 24일 이상 인증), 회차별 원형 스탬프 UI를 제공합니다.'
    },
    {
      id: 's52-challenge-loading',
      category: 'challenge',
      catLabel: 'CHALLENGE · AI VERIFICATION',
      title: '20 · 챌린지 미션 부합 여부 AI 실시간 검증 중',
      sub: '단순 업로드 차단을 위한 GPT-4-Turbo 비전 판정',
      img: 'assets/health/s52-challenge-loading.png',
      runtime: 'Vue 2 WebView',
      route: '/Challenge -> Verification Pending',
      bridge: 'POST /api/gpt/imageCheck (Binary Prompt: "1" | "0" | "FAIL")',
      desc: '형식적인 사진 도배를 막기 위해 서버 프롬프트가 업로드된 사진이 챌린지 주제(저칼로리 식단 등)에 실제로 부합하는지 엄격한 이진 판정("1", "0", "FAIL")을 수행합니다.'
    },
    {
      id: 's53-challenge-fail',
      category: 'challenge',
      catLabel: 'CHALLENGE · GUARDRAIL REJECT',
      title: '21 · AI 부정/미부합 사진 차단 경고 알림',
      sub: '"저칼로리 음식이 아닌 것 같습니다. 다시 인증해 주세요."',
      img: 'assets/health/s53-challenge-fail.png',
      runtime: 'Vue 2 WebView',
      route: '/Challenge -> Verdict Reject Modal',
      bridge: 'Strict Prompt Verdict === "0" -> Reject Stamp & Prompt Retry',
      desc: '고칼로리 음식이나 챌린지와 무관한 사진을 올리면 AI가 즉시 판별하여 스탬프 적립을 차단하고 재인증을 요청해 챌린지 신뢰도를 확보했습니다.'
    },
    {
      id: 's54-challenge-result',
      category: 'challenge',
      catLabel: 'CHALLENGE · VERIFIED STAMP',
      title: '22 · 챌린지 AI 검증 통과 & 사진 스탬프 적립',
      sub: '검증 통과 사진 썸네일이 30일 진행 캘린더에 즉시 각인',
      img: 'assets/health/s54-challenge-result.png',
      runtime: 'Vue 2 WebView',
      route: '/Challenge -> Stamp Updated',
      bridge: 'Verdict === "1" -> POST /api/challenge/stamp (Cloudinary URL Persist)',
      desc: 'AI 검증("1")을 통과한 인증샷은 Cloudinary에 영구 저장되고 캘린더의 해당 일차 슬롯에 원형 사진 스탬프로 기록되어 성취감을 극대화합니다.'
    },
    {
      id: 's61-news',
      category: 'media',
      catLabel: 'CURATION · NAVER NEWS',
      title: '23 · 관심사 기반 03:00 배치 건강 뉴스 큐레이션',
      sub: '네이버 뉴스 API + node-cron 새벽 자동 수집 및 외부 브라우저 연결',
      img: 'assets/health/s61-news.png',
      runtime: 'Hybrid (WebView + Flutter)',
      route: '/InterestNews -> Naver News Feed',
      bridge: 'node-cron (0 3 * * *) + window.FlutterOpenBrowser.postMessage(url)',
      desc: '사용자가 온보딩에서 선택한 관심 키워드별로 매일 새벽 03:00 배치 잡이 최신 뉴스를 수집해 두며, 기사 탭 시 FlutterOpenBrowser 채널로 안전하게 외부 브라우저를 실행합니다.'
    },
    {
      id: 's62-youtube1',
      category: 'media',
      catLabel: 'CURATION · YOUTUBE FEED',
      title: '24 · 맞춤 운동·다이어트 유튜브 콘텐츠 추천',
      sub: 'YouTube Data API v3 연동 썸네일 & 재생 브리지',
      img: 'assets/health/s62-youtube1.png',
      runtime: 'Hybrid (WebView + Flutter)',
      route: '/YoutubeRecommend -> Content Feed',
      bridge: 'GET /api/interest/news-and-videos (In-Memory Map Cache)',
      desc: '관심사·운동 루틴과 연관된 유튜브 운동 영상을 큐레이션하며 2계층 In-Memory 캐시를 통해 API 쿼터 소모와 응답 지연을 크게 줄였습니다.'
    },
    {
      id: 's63-youtube2',
      category: 'media',
      catLabel: 'CURATION · VIDEO EXPLORE',
      title: '25 · 추천 건강 영상 카테고리 필터 & 재생 연동',
      sub: '다이어트·식단·스트레칭 카테고리별 맞춤형 큐레이션',
      img: 'assets/health/s63-youtube2.png',
      runtime: 'Hybrid (WebView + Flutter)',
      route: '/YoutubeRecommend -> Video Player',
      bridge: 'FlutterOpenBrowser External Launch + Category Filter',
      desc: '운동·식단·생활습관 등 관심 카테고리별로 검증된 콘텐츠를 탐색하고 원탭으로 시청 화면까지 끊김 없이 이어집니다.'
    }
  ];

  // --- 2. AX Frontier-Style 6-Phase End-to-End Sequence ---
  const SEQUENCE_PHASES = [
    {
      id: 'phase-1',
      chip: '01 · 온보딩 & 03:00 배치',
      col1Title: '프로필 설정 & 관심사 수집',
      col1Desc: 'Vue WebView 온보딩에서 키·체중·나이·성별·목표와 관심 건강 키워드를 입력하고 JWT 인증(2h Access / 14d Refresh)을 초기화합니다.',
      col2Title: '03:00 야간 배치 사전 연산',
      col2Desc: 'node-cron(0 3 * * *) 스케줄러가 BatchHistory 멱등성 락을 확인한 뒤 전일 식단·운동 이력을 종합해 당일 AI 조언 3건과 네이버 건강 뉴스를 적재합니다.',
      col3Title: 'GPT-3.5 19대 영양 지표 산출',
      col3Desc: 'POST /api/gpt/calculateNutrition이 기초대사량 및 탄·단·지·비타민·미네랄 등 19개 개인별 권장 목표치를 계산해 홈 대시보드에 즉시 바인딩합니다.'
    },
    {
      id: 'phase-2',
      chip: '02 · 전신 체형 분석',
      col1Title: 'Flutter 전신 가이드 카메라 호출',
      col1Desc: 'Vue WebView에서 window.FlutterBodyCheck.postMessage("bodyCheck&" + userId)를 호출해 인체 실루엣과 적색 키포인트 가이드 뷰파인더를 실행합니다.',
      col2Title: 'GPT-4-Turbo 전신 비율 추론',
      col2Desc: '역콜백 window.handledBodyCheck로 전달된 전신 이미지(100mb Express 제한)를 POST /api/gpt/bodyshape로 분석해 모래시계형·역삼각형 등 체형을 진단합니다.',
      col3Title: '코디 스타일링 & 네이버 캐시',
      col3Desc: '체형 강점·보완 포인트를 요약하고 In-Memory ImageCollector 캐시로 네이버 이미지 검색 기반 의상 핏 스타일링과 보완 운동 루틴을 추천합니다.'
    },
    {
      id: 'phase-3',
      chip: '03 · AI 운동 루틴 생성',
      col1Title: '목표·집중 부위·난이도 입력',
      col1Desc: 'FitnessPlanInput.vue에서 체중 감량, 근육 키우기 등 운동 목적과 주간 일수·가능 시간을 선택하면 루틴 생성을 트리거합니다.',
      col2Title: 'GPT-4 (2+2+3) 분할 루틴 설계',
      col2Desc: '단일 7일 프롬프트 타임아웃을 방지하기 위해 서버가 GPT-4에게 2일+2일+3일 단위로 병렬·순차 분할 요청하여 안정적인 JSON 운동 플랜을 합성합니다.',
      col3Title: 'MongoDB FitnessPlan 구조화 저장',
      col3Desc: '주차(weeks)와 일차(days), 종목별 권장 세트·횟수·가이드 문구를 MongoDB Atlas 컬렉션에 저장해 일차별 탭으로 즉시 탐색할 수 있습니다.'
    },
    {
      id: 'phase-4',
      chip: '04 · Flutter 포즈 코칭',
      col1Title: '종목 메타데이터 네이티브 전달',
      col1Desc: 'FitnessPlanDetail.vue에서 시작을 누르면 FlutterFitnessPose.postMessage("fitnessPose&" + JSON)로 squat/curl/pushUp/pullUp/legRaise 정보를 넘깁니다.',
      col2Title: '2.4x 줌 스켈레톤 관절 추적',
      col2Desc: 'Flutter 네이티브 카메라가 실시간 관절 스켈레톤 오버레이 위에서 elbowAngle, kneeAngle, torsoAngle, torsoStability, stage, count를 계측합니다.',
      col3Title: 'arrayFilters 갱신 & 5단 교정 코칭',
      col3Desc: 'window.handlePoseAnalysisResult 역콜백으로 수신한 시계열 데이터를 $[weekElem].days.$[dayElem] 조건으로 원자 저장 후 GPT-4 <ol> 5개 항목 교정 피드백을 출력합니다.'
    },
    {
      id: 'phase-5',
      chip: '05 · GPT-4o 식단 비전',
      col1Title: '카메라 촬영 & Base64 콜백',
      col1Desc: 'FoodManagement.vue에서 FlutterChannel.postMessage("captureImage")로 네이티브 카메라를 열어 수동 칼로리 검색 없이 식단 사진을 취득합니다.',
      col2Title: 'Cloudinary + GPT-4o 복합 메뉴 추론',
      col2Desc: 'window.handleCapturedImage 콜백 데이터를 Express(100mb 수용)가 Cloudinary imgHosting에 영구 저장하고 GPT-4o Vision으로 칼로리·탄단지를 추론합니다.',
      col3Title: '30ms 타이핑 연출 & 영양 페어링',
      col3Desc: '주재료·조리법 설명과 사용자 목표 대비 과부족 코멘트를 30ms 타이핑 효과로 보여주고, 부족한 영양소를 채우는 다음 식사 페어링을 제안합니다.'
    },
    {
      id: 'phase-6',
      chip: '06 · 30일 챌린지 AI 검증',
      col1Title: '일차별 챌린지 스탬프 인증',
      col1Desc: 'Challenge.vue에서 저칼로리 식단 30일 챌린지(24일 성공 조건)의 당일 슬롯을 눌러 실시간 인증샷을 촬영합니다.',
      col2Title: 'GPT-4-Turbo 엄격 이진 가드레일',
      col2Desc: 'POST /api/gpt/imageCheck가 사진의 실제 미션 부합 여부를 "1"(통과), "0"(반려), "FAIL"(인식불가) 토큰으로 엄격하게 판별합니다.',
      col3Title: '부정 차단 & 원형 스탬프 각인',
      col3Desc: '"0" 판정 시 스탬프 적립을 차단하고 재인증 알림을 띄우며, "1" 통과 사진만 Cloudinary 썸네일 원형 스탬프로 30일 보드에 각인합니다.'
    }
  ];

  // --- 3. Chrome Utilities ---
  function initScrollProgressBar() {
    let bar = document.getElementById('reading-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'reading-progress';
      bar.className = 'reading-progress-bar';
      document.body.prepend(bar);
    }
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        bar.style.width = `${Math.min(100, Math.max(0, (window.scrollY / total) * 100))}%`;
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  function initHeaderScrollState() {
    const header = document.querySelector('.site-header');
    if (!header) return;
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.content-section, .press-spotlight-card, .health-feature-card, .sequence-detail-card, .module-box-item, .hybrid-arch-diagram, .adr-card-item, .spec-inspector-box, .studio-screen-frame, .bridge-contract-card'
    );
    targets.forEach(el => el.classList.add('reveal-on-scroll'));

    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.04, rootMargin: '0px 0px -30px 0px' });
      targets.forEach(el => obs.observe(el));
    } else {
      targets.forEach(el => el.classList.add('revealed'));
    }
  }

  function initDotCursor() {
    if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return;
    let cursor = document.getElementById('dot-cursor');
    if (!cursor) {
      cursor = document.createElement('div');
      cursor.id = 'dot-cursor';
      cursor.className = 'dot-cursor';
      document.body.appendChild(cursor);
    }
    let mx = window.innerWidth * 0.2;
    let my = window.innerHeight * 0.2;
    let cx = mx;
    let cy = my;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
    function tick() {
      cx += (mx - cx) * 0.25;
      cy += (my - cy) * 0.25;
      cursor.style.left = `${cx}px`;
      cursor.style.top = `${cy}px`;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    document.querySelectorAll('a, button, .health-feature-card, .screen-archive-card, .studio-screen-frame').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // --- 4. AX Frontier Style 6-Phase Sequence Stepper ---
  function initSequenceStepper() {
    const rail = document.getElementById('sequence-stepper');
    const detail = document.getElementById('sequence-detail');
    if (!rail || !detail) return;

    function renderPhase(idx) {
      const p = SEQUENCE_PHASES[idx] || SEQUENCE_PHASES[0];
      rail.querySelectorAll('.stepper-chip').forEach((btn, i) => {
        btn.classList.toggle('active', i === idx);
      });
      detail.innerHTML = `
        <div class="seq-grid">
          <div class="seq-col">
            <div class="seq-col-title">// CLIENT · VUE / FLUTTER TRIGGER</div>
            <h4 style="font-size:15.5px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">${p.col1Title}</h4>
            <p class="seq-col-desc">${p.col1Desc}</p>
          </div>
          <div class="seq-col">
            <div class="seq-col-title">// BRIDGE &amp; EXPRESS API</div>
            <h4 style="font-size:15.5px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">${p.col2Title}</h4>
            <p class="seq-col-desc">${p.col2Desc}</p>
          </div>
          <div class="seq-col">
            <div class="seq-col-title">// AI ENGINE &amp; MONGODB PERSIST</div>
            <h4 style="font-size:15.5px; font-weight:800; color:var(--text-primary); margin-bottom:8px;">${p.col3Title}</h4>
            <p class="seq-col-desc">${p.col3Desc}</p>
          </div>
        </div>
      `;
    }

    rail.innerHTML = SEQUENCE_PHASES.map((p, idx) => `
      <button type="button" class="stepper-chip ${idx === 0 ? 'active' : ''}" data-phase="${idx}">${p.chip}</button>
    `).join('');

    rail.querySelectorAll('.stepper-chip').forEach(btn => {
      btn.addEventListener('click', () => renderPhase(Number(btn.dataset.phase)));
    });

    renderPhase(0);
  }

  // --- 5. AX Frontier Style 12-Module Filter Tabs ---
  function initModuleTabs() {
    const tabs = document.querySelectorAll('.module-tab-item');
    const items = document.querySelectorAll('.module-box-item');
    if (!tabs.length || !items.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const filter = tab.dataset.filter;
        tabs.forEach(t => t.classList.toggle('active', t === tab));
        items.forEach(box => {
          box.classList.toggle('hidden', filter !== 'all' && box.dataset.category !== filter);
        });
      });
    });
  }

  // --- 6. Spec Inspector Tabs ---
  function initSpecTabs() {
    const btns = document.querySelectorAll('.spec-tab-btn');
    const panels = document.querySelectorAll('.spec-panel');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.spec;
        btns.forEach(b => b.classList.toggle('active', b === btn));
        panels.forEach(p => p.classList.toggle('active', p.id === `spec-panel-${target}`));
      });
    });
  }

  // --- 7. 26-Screen Clean Visual Archive Grid & Lightbox ---
  const IMG_VER = '?v=20261113h2';
  let currentLightboxIdx = 0;

  function renderArchiveGrid() {
    const grid = document.getElementById('screens-archive-grid');
    if (!grid) return;
    grid.innerHTML = ALL_SCREENS.map((item, idx) => `
      <article class="screen-archive-card" data-category="${item.category}" data-idx="${idx}" tabindex="0" role="button" aria-label="${item.title} 크게 보기">
        <div class="screen-thumb-wrap">
          <img src="${item.img}${IMG_VER}" alt="${item.title}">
        </div>
        <div class="screen-archive-meta">
          <div class="screen-archive-tag">${item.catLabel}</div>
          <div class="screen-archive-title">${item.title}</div>
          <div class="screen-archive-sub">${item.sub}</div>
        </div>
      </article>
    `).join('');

    grid.querySelectorAll('.screen-archive-card').forEach(card => {
      const open = () => openHealthLightbox(Number(card.dataset.idx));
      card.addEventListener('click', open);
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      });
    });

    document.querySelectorAll('.gallery-filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.cat;
        document.querySelectorAll('.gallery-filter-btn').forEach(b => b.classList.toggle('active', b === btn));
        grid.querySelectorAll('.screen-archive-card').forEach(card => {
          card.classList.toggle('hidden', cat !== 'all' && card.dataset.category !== cat);
        });
      });
    });
  }

  window.openHealthLightbox = function (idx) {
    if (idx < 0 || idx >= ALL_SCREENS.length) idx = 0;
    currentLightboxIdx = idx;
    updateHealthLightbox();
    const modal = document.getElementById('health-lightbox-modal');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeHealthLightbox = function () {
    const modal = document.getElementById('health-lightbox-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  window.navHealthLightbox = function (delta) {
    currentLightboxIdx = (currentLightboxIdx + delta + ALL_SCREENS.length) % ALL_SCREENS.length;
    updateHealthLightbox();
  };

  function updateHealthLightbox() {
    const item = ALL_SCREENS[currentLightboxIdx];
    if (!item) return;
    const counter = document.getElementById('hlb-counter');
    const title = document.getElementById('hlb-title');
    const img = document.getElementById('hlb-img');
    const heading = document.getElementById('hlb-heading');
    const desc = document.getElementById('hlb-desc');
    const meta = document.getElementById('hlb-meta');

    if (counter) {
      counter.textContent = `[ ${String(currentLightboxIdx + 1).padStart(2, '0')} / ${String(ALL_SCREENS.length).padStart(2, '0')} ]`;
    }
    if (title) title.textContent = item.catLabel;
    if (img) {
      img.src = item.img + IMG_VER;
      img.alt = item.title;
    }
    if (heading) heading.textContent = item.title;
    if (desc) desc.textContent = item.desc;
    if (meta) {
      meta.innerHTML = `<div><strong>RUNTIME:</strong> ${item.runtime}</div><div><strong>ROUTE:</strong> ${item.route}</div><div><strong>BRIDGE / API:</strong> ${item.bridge}</div>`;
    }
  }

  document.addEventListener('click', e => {
    const modal = document.getElementById('health-lightbox-modal');
    if (modal && modal.classList.contains('open') && e.target === modal) {
      window.closeHealthLightbox();
    }
  });

  document.addEventListener('keydown', e => {
    const modal = document.getElementById('health-lightbox-modal');
    if (modal && modal.classList.contains('open')) {
      if (e.key === 'Escape') window.closeHealthLightbox();
      if (e.key === 'ArrowLeft') window.navHealthLightbox(-1);
      if (e.key === 'ArrowRight') window.navHealthLightbox(1);
    }
  });

  window.copyEmail = function () {
    const email = 'gihokim@uracle.co.kr';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).catch(() => {});
    }
    const toast = document.getElementById('copy-toast');
    if (toast) {
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 2600);
    }
  };

  // --- 8. Boot ---
  document.addEventListener('DOMContentLoaded', () => {
    initScrollProgressBar();
    initHeaderScrollState();
    initScrollReveal();
    initDotCursor();
    initSequenceStepper();
    initModuleTabs();
    initSpecTabs();
    renderArchiveGrid();
  });
})();
