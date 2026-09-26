import site from "@/data/site.json";
import experience from "@/data/experience.json";
import projects from "@/data/projects.json";

export type Role = {
  id: string;
  role: string;
  company: string;
  team: string;
  start: string;
  end: string | null;
  yearsLabel: string;
  stack: string[];
  description: string;
};

export type Project = {
  name: string;
  description: string;
  stack: string[];
  url: string;
};

export type Site = typeof site;

export const siteData: Site = site;
export const roles: Role[] = experience;
export const projectList: Project[] = projects as Project[];
