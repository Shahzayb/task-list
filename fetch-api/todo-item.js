export const createTodoItem = async (data) => {
  const jwtToken = localStorage.getItem('token') || '';
  if (!jwtToken) {
    return Promise.reject();
  }
  const url = '/api/todo-item';
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

export const getInboxTodoItems = async () => {
  const jwtToken = localStorage.getItem('token') || '';
  if (!jwtToken) {
    return Promise.reject();
  }
  const url = '/api/todo-item/inbox';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

export const getSharedTodoItems = async () => {
  const jwtToken = localStorage.getItem('token') || '';
  if (!jwtToken) {
    return Promise.reject();
  }
  const url = '/api/todo-item/shared';
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};
