
async function uploadOnePostingOnSellog(message) {
  const token = await getToken();
  if (isNull(token)) {
    console.error('token is null', token);
    return;
  }
  return upload(token, message);
}

async function upload(token, message) {
  console.log(token);
  const git = new GitHub(token);
  const stats = await getStats();
  await git.createRecord("blog", message, "");
}
