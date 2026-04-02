import { useEffect, useState } from "react";
import { getIssues, createIssue, deleteIssue } from "../api/issues";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchIssues = async () => {
    const { data } = await getIssues();
    setIssues(data.data);
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    await createIssue({ title, description });
    setTitle("");
    setDescription("");
    fetchIssues();
  };

  const handleDelete = async (id) => {
    await deleteIssue(id);
    fetchIssues();
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Issues</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="Issue title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        /><br/><br/>

        <textarea
          placeholder="Issue description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        /><br/><br/>

        <button>Create Issue</button>
      </form>

      <hr/>

      {issues.map((issue) => (
        <div key={issue._id} style={{ border: "1px solid black", padding: 10, marginTop: 10 }}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <button onClick={() => handleDelete(issue._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;