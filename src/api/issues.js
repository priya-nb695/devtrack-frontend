import API from "./axios";

export const getIssues = () => API.get("/issues");
export const createIssue = (data) => API.post("/issues", data);
export const deleteIssue = (id) => API.delete(`/issues/${id}`);