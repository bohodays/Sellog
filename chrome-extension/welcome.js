const option = () => {
  return $('#type').val();
};

const repositoryName = () => {
  return $('#name').val().trim();
};

/* Status codes for creating of repo */

const statusCode = (res, status, name) => {
  switch (status) {
    case 304:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unable to modify repository. Try again later!`);
      $('#error').show();
      break;

    case 400:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Bad POST request, make sure you're not overriding any existing scripts`);
      $('#error').show();
      break;

    case 401:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unauthorized access to repo. Try again later!`);
      $('#error').show();
      break;

    case 403:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Forbidden access to repository. Try again later!`);
      $('#error').show();
      break;

    case 422:
      $('#success').hide();
      $('#error').text(`Error creating ${name} - Unprocessable Entity. Repository may have already been created. Try Linking instead (select 2nd option).`);
      $('#error').show();
      break;

    default:
      /* Change mode type to commit */
      // 기록할 수 있는 상태
      chrome.storage.local.set({ mode_type: 'commit' }, () => {
        $('#error').hide();
        $('#success').html(`Successfully created <a target="blank" href="${res.html_url}">${name}</a>. Start <a href="https://www.acmicpc.net/">BOJ</a>!`);
        $('#success').show();
        $('#unlink').show();
        /* Show new layout */
        document.getElementById('commit_mode').style.display = 'inherit';
      });

      break;
  }
};

/* Detect mode type */
chrome.storage.local.get('mode_type', (data) => {
  const mode = data.mode_type;

  if (mode && mode === 'commit') {
    /* Check if still access to repo */
    chrome.storage.local.get('Sellog_token', (data2) => {
      const token = data2.Sellog_token;
      if (token === null || token === undefined) {
        /* Not authorized yet. */
        $('#error').text('Authorization error - Grant Sellog access to your GitHub account to continue (click Sellog extension on the top right to proceed)');
        $('#error').show();
        $('#success').hide();
        /* Hide accordingly */
        document.getElementById('commit_mode').style.display = 'none';
      }
    });

    document.getElementById('commit_mode').style.display = 'inherit';
  } else {
    document.getElementById('commit_mode').style.display = 'none';
  }
});
