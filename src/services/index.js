export async function login(data) {
  const result = await fetch("https://gtodolist-api.herokuapp.com/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  localStorage.setItem("token", response.token);
  localStorage.setItem("name", response.user.name);

  return response;
}

export async function register(data) {
  const result = await fetch("https://gtodolist-api.herokuapp.com/register", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  localStorage.setItem("token", response.token);
  localStorage.setItem("name", response.user.name);

  return response;
}

export async function getCategories() {
  const result = await fetch("https://gtodolist-api.herokuapp.com/categories", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  });

  const data = await result.json();
  return data.categories;
}

export async function getTasks() {
  const result = await fetch("https://gtodolist-api.herokuapp.com/tasks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
  });
  const data = await result.json();
  return data;
}

export async function createTask(data) {
  const result = await fetch("https://gtodolist-api.herokuapp.com/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response;
}

export async function createCategory(data) {
  const result = await fetch("https://gtodolist-api.herokuapp.com/categories", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const response = await result.json();
  return response;
}

export async function updateTask(data) {
  const result = await fetch(
    `https://gtodolist-api.herokuapp.com/tasks/${data._id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const response = await result.json();
  return response;
}

export async function logout() {
  const result = await fetch(`https://gtodolist-api.herokuapp.com/logout`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "content-type": "application/json",
    },
    body: {},
  });

  localStorage.removeItem("token");
  localStorage.removeItem("name");
  return result;
}
