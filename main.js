function post() {
  let name = document.getElementById('name').value;
  let msg = document.getElementById('message').value;

  if (!name || !msg) {
    alert('Enter your name and message first');
    return;
  }

  let feed = document.getElementById('feed');
  let div = document.createElement('div');
  div.className = 'post';
  div.innerHTML = "<b>" + name + "</b><br>" + msg;

  feed.prepend(div);

  document.getElementById('message').value = "";
}
