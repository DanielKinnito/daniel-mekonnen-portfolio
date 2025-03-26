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

    if (!project.title.trim() || !project.description.trim() || !project.technologies.trim()) {
      alert("All fields are required!");
      return;
    }

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

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="w-full max-w-lg rounded-md bg-secondary-background p-6 shadow-lg">
        {!authenticated ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <h2 className="text-center text-3xl font-bold text-primary-foreground">Enter Password</h2>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-primary-foreground">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-transparent p-2 text-primary-foreground outline-none focus:border-main"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-main py-2 text-lg font-semibold text-white transition hover:opacity-90"
            >
              Submit
            </button>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <h2 className="text-center text-3xl font-bold text-primary-foreground">Add New Project</h2>
            <div>
              <label htmlFor="title" className="block text-lg font-medium text-primary-foreground">
                Project Title
              </label>
              <input
                id="title"
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full rounded-md border border-border bg-transparent p-2 text-primary-foreground outline-none focus:border-main"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-lg font-medium text-primary-foreground">
                Project Description
              </label>
              <textarea
                id="description"
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => setProject({ ...project, description: e.target.value })}
                className="w-full rounded-md border border-border bg-transparent p-2 text-primary-foreground outline-none focus:border-main"
              />
            </div>
            <div>
              <label htmlFor="technologies" className="block text-lg font-medium text-primary-foreground">
                Technologies (comma-separated)
              </label>
              <input
                id="technologies"
                type="text"
                placeholder="Technologies (comma-separated)"
                value={project.technologies}
                onChange={(e) => setProject({ ...project, technologies: e.target.value })}
                className="w-full rounded-md border border-border bg-transparent p-2 text-primary-foreground outline-none focus:border-main"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-main py-2 text-lg font-semibold text-white transition hover:opacity-90"
            >
              Add Project
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
