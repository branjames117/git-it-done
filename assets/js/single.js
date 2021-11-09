const issueContainerEl = document.querySelector('#issues-container');

const getRepoIssues = function (repo) {
  const apiUrl =
    'https://api.github.com/repos/' + repo + '/issues?direction=asc';

  fetch(apiUrl).then(function (res) {
    // request was successful
    if (res.ok) {
      res.json().then(function (data) {
        // pass response data to dom function
        displayIssues(data);
      });
    } else {
      alert('There was a problem with your request!');
    }
  });
};

const displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = 'This repo has no open issues!';
    return;
  }

  for (let i = 0; i < issues.length; i++) {
    // create a link element to take users to the issue on github
    const issueEl = document.createElement('a');
    issueEl.classList = 'list-item flex-row justify-space-between align-center';
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute('target', '_blank');

    // create a span to hold issue title
    const titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;

    // append to container
    issueEl.appendChild(titleEl);

    // create a type element
    const typeEl = document.createElement('span');

    // check if issue is an actual issue or a pull req
    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }

    // append to container
    issueEl.appendChild(typeEl);

    // append to main container
    issueContainerEl.appendChild(issueEl);
  }
};

getRepoIssues('branjames117/git-it-done');