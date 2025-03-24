import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { title, description, technologies } = req.body;

    if (!title || !description || !technologies) {
      console.error("Missing fields in project submission:", req.body);
      return res.status(400).json({ error: "Missing fields" });
    }

    // Sanitize inputs
    const sanitizedTitle = title.trim();
    const sanitizedDescription = description.trim();
    const sanitizedTechnologies = technologies.split(",").map((tech: string) => tech.trim());

    // Save the project data (e.g., to a database or file)
    console.log("New Project:", {
      title: sanitizedTitle,
      description: sanitizedDescription,
      technologies: sanitizedTechnologies,
    });

    return res.status(200).json({ message: "Project added successfully" });
  }

  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
