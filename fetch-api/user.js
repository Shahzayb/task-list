export const getMyProfile = async () => {
  const jwtToken = localStorage.getItem('token') || '';
  if (!jwtToken) {
    return Promise.reject();
  }
  const url = '/api/user/me';
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(response);
    }
  });
};

export const loginUser = async (credentials) => {
  const url = '/api/user/login';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

export const postUser = async (user) => {
  const url = '/api/user';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(response);
  }
};

export const getAllUsers = async () => {
  const jwtToken = localStorage.getItem('token') || '';
  if (!jwtToken) {
    return Promise.reject();
  }
  const url = '/api/user';
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
