document.getElementById('issueInputForm').addEventListener('submit', submitIssue);
const totalIssue = document.getElementById("total-issue");
const remainingIssues = document.getElementById("remaining-issue");
let sumIssue = 0;
let remainIssue = 0;

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  let issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  fetchIssues();
  e.preventDefault();
  sumIssue+=1;
    remainIssue+=1;
    remainingIssues.innerHTML = remainIssue;
  totalIssue.innerHTML = sumIssue;
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const currentIssue = issues.find(issue => issue.id == id);
  currentIssue.status = 'Closed';
  currentIssue.description = `<strike>${currentIssue.description}</strike>`;
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
  remainIssue-=1;
  remainingIssues.innerHTML = remainIssue;

}

const deleteIssue = id => { 
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter(issue =>(issue.id != id) )
  localStorage.removeItem(issues);
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  fetchIssues();
  if(remainIssue != 0){
    remainIssue-=1;
    remainingIssues.innerHTML = remainIssue;
  }
  if(sumIssue!=0){
    sumIssue-=1;
    totalIssue.innerHTML = sumIssue;
  }
}

const fetchIssues = () => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const {id, description, severity, assignedTo, status} = issues[i];

    issuesList.innerHTML +=   `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
  }
}
