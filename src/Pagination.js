import data from './data.json' assert { type: 'json' };

const totalDataCnt = data.length;
let pagePerDataCnt = 5; // 페이지 당 데이터 개수
let curPageNum; // 현재 페이지 번호
let maxBtnCnt = Math.ceil(totalDataCnt / pagePerDataCnt) + 2; // 마지막 페이지 버튼 번호
let startDataIdx, endDataIdx; // 데이터 시작 인덱스, 마지막 인덱스

// 페이지 버튼 생성, 속성 부여
function setPaginationBtns() {
  for (let i = 0; i < maxBtnCnt; i++) {
    const pageBtn = document.createElement('button');
    if (i === 0) {
      pageBtn.appendChild(document.createTextNode('◀️'));
      pageBtn.setAttribute('class', 'arrow');
      pageBtn.setAttribute('value', i + 1);
    } else if (i === 1) {
      pageBtn.appendChild(document.createTextNode(i));
      pageBtn.setAttribute('class', 'active');
      pageBtn.setAttribute('value', i);
    } else if (i === maxBtnCnt - 1) {
      pageBtn.appendChild(document.createTextNode('▶️'));
      pageBtn.setAttribute('class', 'arrow');
      pageBtn.setAttribute('value', i - 1);
    } else {
      pageBtn.appendChild(document.createTextNode(i));
      pageBtn.setAttribute('value', i);
    }
    document.getElementById('pagination').appendChild(pageBtn);

    pageBtn.addEventListener('click', (event) => {
      curPageNum = Number(event.target.value);
      // console.log(curPageNum);
      pageBtnStyle();
      paginationTableData();
    });
  }
}
setPaginationBtns();

// 페이지 번호 버튼 스타일 부여 (클릭 시 버튼 폰트 색상 변경)
function pageBtnStyle() {
  const btns = document.querySelectorAll('button');
  console.log(btns);
  for (let i = 0; i < maxBtnCnt; i++) {
    if (curPageNum == 1) {
      btns[1].classList.add('active');
    } else if (curPageNum == maxBtnCnt - 2) {
      btns[maxBtnCnt - 2].classList.add('active');
    } else {
      btns[curPageNum].classList.add('active');
      btns[1].classList.remove('active');
    }
    btns[i].classList.remove('active');
  }
}

// 페이지 당 보여질 데이터 개수 제어하는 함수
const trs = document.querySelectorAll('tbody tr');
function paginationTableData() {
  startDataIdx = (curPageNum - 1) * pagePerDataCnt;
  endDataIdx = startDataIdx + pagePerDataCnt;

  for (const ra of [...trs]) {
    ra.style.display = 'none';
  }

  let newRows = [...trs].slice(startDataIdx, endDataIdx);
  for (const nr of newRows) {
    nr.style.display = '';
  }
}

// 첫 화면 렌더링 시 출력되는 데이터 개수 제어하는 함수
function renderFirstPage(startDataIdx, endDataIdx) {
  for (const ra of [...trs]) {
    ra.style.display = 'none';
  }

  let newRows = [...trs].slice(startDataIdx, endDataIdx);
  for (const nr of newRows) {
    nr.style.display = '';
  }
}
renderFirstPage(startDataIdx, 5);

// select 및 option 생성 및 연결, 옵션 변경 이벤트 부여
const select = document.createElement('select');
for (let i = 5; i <= 15; i *= 3) {
  const option = document.createElement('option');
  option.appendChild(document.createTextNode(i + '개씩'));
  option.setAttribute('value', i);
  select.appendChild(option);
}
document.getElementById('dropdown').appendChild(select);

// 옵션 변경 이벤트 추가
select.addEventListener('change', (event) => {
  curPageNum = 1;
  pagePerDataCnt = Number(event.target.value);
  maxBtnCnt = Math.ceil(totalDataCnt / pagePerDataCnt) + 2;
  onChangeOptions();
});

// 셀렉트 옵션 변경 시 기존 버튼 노드리스트 제거 후 새로 생성
function onChangeOptions() {
  startDataIdx = (curPageNum - 1) * pagePerDataCnt;
  endDataIdx = startDataIdx + pagePerDataCnt;

  // 옵션 선택 전 생성됐던 버튼들 모두 제거
  const btns = document.querySelectorAll('button');
  for (const b of [...btns]) b.remove();

  setPaginationBtns(); // 옵션에 맞게 버튼 재생성

  // 옵션 변경 시 데이터 목록 갱신 후 렌더링
  renderFirstPage(startDataIdx, endDataIdx);
}
