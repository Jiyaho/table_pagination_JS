import data from './data.json' assert { type: 'json' };

// table 생성하고 table ID에 연결
const table = document.createElement('table');
document.getElementById('table').appendChild(table);

// thead, theadTr 생성 후 연결
const thead = document.createElement('thead');
const theadTr = document.createElement('tr');
const keys = Object.keys(data[0]);
// console.log(keys);
for (let i = 0; i < keys.length; i++) {
  const th = document.createElement('th');
  th.appendChild(document.createTextNode(keys[i]));
  theadTr.appendChild(th);
}
thead.appendChild(theadTr);
table.appendChild(thead); // table에 thead 연결

// tbody 생성 후 thead와 연결
const tbody = document.createElement('tbody');

// tbodyTr 및 table data 연결 및 column출력
let i = 0;
function displayTableData(data) {
  const tbodyTr = document.createElement('tr');
  for (let j = 0; j < keys.length; j++) {
    const value = Object.values(data[i])[j];
    const td = document.createElement('td');
    td.appendChild(document.createTextNode(value));
    tbodyTr.appendChild(td);
  }
  i++;
  return tbodyTr;
}

// tbody에 tbodyTr 연결하고 데이터 row출력
for (let i = 0; i < data.length; i++) {
  tbody.appendChild(displayTableData(data));
}
table.appendChild(tbody); // table에 tbody연결
