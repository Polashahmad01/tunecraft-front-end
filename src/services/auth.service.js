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
