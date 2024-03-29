import makeApiRequest from "./baseAPI.service";

export const loginMutation = async (formData) => {
  const response = await makeApiRequest("/api/v1/login", {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(formData)
  });

  return await response.json();
}

export const socialLoginMutation = async (googleUserData) => {
  const response = await makeApiRequest("/api/v1/login/social", {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(googleUserData)
  });

  return await response.json();
}

export const forgotPasswordMutation = async (data) => {
  const response = await makeApiRequest("/api/v1/forgot-password", {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

export const resetPasswordMutation = async (data) => {
  const response = await makeApiRequest(`/api/v1/reset-password/${data.tokenId}`, {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

export const registerMutation = async (data) => {
  const response = await makeApiRequest("/api/v1/register", {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}

export const socialRegisterMutation = async (data) => {
  const response = await makeApiRequest("/api/v1/register/social", {
    headers: {
      "Content-type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(data)
  });

  return await response.json();
}
