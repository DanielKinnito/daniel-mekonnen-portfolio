import { useState } from "react";

export default function AddProjects() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [project, setProject] = useState({ title: "", description: "", technologies: "" });

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === process.env.NEXT_PUBLIC_PROJECTS_PASSWORD) {
      setAuthenticated(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!project.title.trim() || !project.description.trim() || !project.technologies.trim()) {
      alert("All fields are required!");
      return;
    }

    // Sanitize inputs
    const sanitizedProject = {
      title: project.title.trim(),
      description: project.description.trim(),
      technologies: project.technologies.split(",").map((tech) => tech.trim()).join(", "),
    };

    const response = await fetch("/api/add-project", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sanitizedProject),
    });

    if (response.ok) {
      alert("Project added successfully!");
      setProject({ title: "", description: "", technologies: "" });
    } else {
      alert("Failed to add project.");
    }
  };

  if (!authenticated) {
    return (
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    );
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        type="text"
        placeholder="Project Title"
        value={project.title}
        onChange={(e) => setProject({ ...project, title: e.target.value })}
      />
      <textarea
        placeholder="Project Description"
        value={project.description}
        onChange={(e) => setProject({ ...project, description: e.target.value })}
      />
      <input
        type="text"
        placeholder="Technologies (comma-separated)"
        value={project.technologies}
        onChange={(e) => setProject({ ...project, technologies: e.target.value })}
      />
      <button type="submit">Add Project</button>
    </form>
  );
}
