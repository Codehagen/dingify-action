const fetch = require('node-fetch');

return fetch('https://api.dingify.workers.dev/api/events', {
  method: 'POST',
  body: JSON.stringify({
    channel: process.env.INPUT_CHANNEL,
    name: process.env.INPUT_EVENT,
    userId: process.env.INPUT_USERID,
    icon: process.env.INPUT_ICON || '',
    notify: Boolean(process.env.INPUT_NOTIFY || ''),
    tags: JSON.parse(process.env.INPUT_TAGS || '{}')
  }),
  headers: {
    'Authorization': `Bearer ${process.env.INPUT_TOKEN}`,
    'Content-Type': 'application/json'
  }
}).then(response => {
  if (response.status < 200 || response.status > 299) {
    return response.json().then(json => {
      console.error('Bad request:', json);
      throw new Error('Bad request');
    });
  }

  process.exit(0);
}).catch(e => {
  console.error(e);
  process.exit(1);
});
