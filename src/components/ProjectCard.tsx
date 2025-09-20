import { useNavigate } from "react-router";
import "../CSSpages/ProjectCard.css";

type ProjectCardProps = {
  title: string;
  image: string;
  route: string;
  repoLink: string;
  liveLink: string;
};

const ProjectCard = ({ title, image, route, repoLink, liveLink }: ProjectCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="project-card">
      <img
        src={image}
        alt={title}
        className="project-image"
        onClick={() => navigate(route)}
        title="Click to open project"
      />
      <h3 className="project-title">{title}</h3>
      <div className="project-links">
        <a href={repoLink} target="_blank" rel="noopener noreferrer" className="project-link">
          GitHub Repo
        </a>
        <a href={liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
          Live Preview
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
