export interface SubCategoryData {
  label: string
  details: string[]
}

export interface CategoryData {
  label: string
  slug: string
  subCategories: SubCategoryData[]
}

export const CATEGORIES: CategoryData[] = [
  {
    label: '스킨케어',
    slug: '스킨케어',
    subCategories: [
      { label: '스킨케어', details: ['스킨/토너, 미스트', '로션, 에멀젼', '에센스, 세럼, 앰플', '크림, 아이크림'] },
      { label: '마스크팩, 패드', details: ['시트 마스크', '패드', '페이셜 팩'] },
      { label: '클렌징, 필링', details: ['클렌징 폼, 젤', '클렌징 오일, 밤', '클렌징 워터, 밀크', '립앤아이 리무버', '스크럽, 필링'] },
      { label: '선케어', details: ['선크림, 선로션', '선스틱, 선밤', '선쿠션, 선스프레이', '애프터선, 쿨링'] },
      { label: '스킨케어 디바이스', details: ['클렌징 디바이스', '리프팅 디바이스'] },
    ],
  },
  {
    label: '메이크업',
    slug: '메이크업',
    subCategories: [
      { label: '페이스 메이크업', details: ['쿠션, 파운데이션, BB·CC크림', '프라이머, 베이스', '컨실러', '파우더, 팩트'] },
      { label: '아이 메이크업', details: ['아이섀도우, 팔레트', '아이라이너', '마스카라', '아이브로우'] },
      { label: '립 메이크업', details: ['립스틱', '립틴트, 립글로스', '립밤, 립케어', '립라이너'] },
      { label: '치크, 컨투어링', details: ['블러셔', '쉐딩, 하이라이터'] },
      { label: '메이크업 디바이스', details: [] },
    ],
  },
  {
    label: '헤어케어',
    slug: '헤어케어',
    subCategories: [
      { label: '두피, 세정', details: ['샴푸', '두피 스케일러, 스크럽'] },
      { label: '트리트먼트, 영양', details: ['린스, 컨디셔너', '헤어 트리트먼트, 팩, 앰플', '헤어 에센스, 오일, 미스트'] },
      { label: '스타일링, 염색', details: ['헤어 왁스, 스프레이, 컬크림', '염색약, 새치 커버'] },
      { label: '헤어케어 디바이스', details: ['고데기', '헤어 드라이어'] },
    ],
  },
  {
    label: '바디케어',
    slug: '바디케어',
    subCategories: [
      { label: '바디 세정', details: ['바디워시, 바디비누', '바디스크럽, 필링'] },
      { label: '바디 보습, 미용', details: ['바디로션, 크림, 오일', '바디미스트', '데오도란트'] },
      { label: '핸드, 풋 케어', details: ['핸드크림, 핸드워시', '풋케어'] },
      { label: '여성 용품', details: ['여성 청결제, 티슈', '생리대, 팬티라이너', 'Y존 케어'] },
      { label: '바디케어 디바이스', details: ['제모기', '바디 마사지기'] },
    ],
  },
  {
    label: '네일',
    slug: '네일',
    subCategories: [
      { label: '네일 컬러', details: ['일반 네일폴리시', '젤 네일', '네일 스티커, 팁'] },
      { label: '네일 케어', details: ['베이스코트, 탑코트', '큐티클 오일, 케어', '네일 리무버'] },
      { label: '네일 툴', details: ['네일 파일, 버퍼', '네일 아트 도구', '네일 램프'] },
    ],
  },
  {
    label: '향',
    slug: '향',
    subCategories: [
      { label: '향수', details: ['퍼퓸, 오드퍼퓸', '오드뚜왈렛, 코롱', '미니향수, 고체향수'] },
      { label: '바디 센트', details: ['바디미스트, 스프레이', '퍼퓸드 핸드크림', '헤어퍼퓸'] },
      { label: '홈 센트', details: ['디퓨저', '인센스, 인센스 홀더', '캔들', '룸스프레이, 패브릭 미스트'] },
    ],
  },
  {
    label: '뷰티소품',
    slug: '뷰티소품',
    subCategories: [
      { label: '메이크업 툴', details: ['브러시 세트', '퍼프, 스펀지', '뷰러, 속눈썹', '화장솜, 면봉', '거울, 파우치'] },
      { label: '아이래시 툴', details: ['속눈썹 풀', '속눈썹 핀셋'] },
      { label: '페이스 툴', details: ['마사지 롤러', '괄사, 페이스 롤러'] },
      { label: '헤어/바디 툴', details: ['빗, 헤어 액세서리', '면도기, 트리머'] },
      { label: '데일리 툴', details: ['화장솜, 면봉', '미용티슈'] },
    ],
  },
]

export const SUB_NAV_ITEMS = ['전체', ...CATEGORIES.map(c => c.label)]
