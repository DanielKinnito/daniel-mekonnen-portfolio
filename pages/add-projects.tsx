import { useState } from "react";
import FormInput from "@/components/ui/form-input";
import FormTextArea from "@/components/ui/form-textarea";
import IconButton from "@/components/ui/button";

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
    <div className="flex h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-2xl rounded-md bg-secondary-background p-6 shadow-lg md:p-8">
        {!authenticated ? (
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <h2 className="text-center text-4xl font-bold text-primary-foreground">Enter Password</h2>
            <FormInput
              type="password"
              label="Password"
              htmlFor="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="self-center">
              <IconButton text="Submit" />
            </div>
          </form>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <h2 className="text-center text-4xl font-bold text-primary-foreground">Add New Project</h2>
            <FormInput
              type="text"
              label="Project Title"
              htmlFor="title"
              value={project.title}
              onChange={(e) => setProject({ ...project, title: e.target.value })}
            />
            <FormTextArea
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
            />
            <FormInput
              type="text"
              label="Technologies (comma-separated)"
              htmlFor="technologies"
              value={project.technologies}
              onChange={(e) => setProject({ ...project, technologies: e.target.value })}
            />
            <div className="self-center">
              <IconButton text="Add Project" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
