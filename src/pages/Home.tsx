import ProjectCard from "../components/ProjectCard";
import todoimg from "../assets/todo.png";
import quizimg from "../assets/quiz.png";
import stepperimg from "../assets/stepper.png";
import "../CSSpages/Home.css"

const Home = () => {
  const projects = [
    {
      title: "Todo App",
      image: todoimg,
      route: "/todo",
      repoLink: "https://github.com/AbdulRafay8207/learning-projects",
      liveLink: "https://yourliveurl.com/todo",
    },
    {
      title: "Quiz App",
      image: quizimg,
      route: "/quiz",
      repoLink: "https://github.com/AbdulRafay8207/learning-projects",
      liveLink: "https://yourliveurl.com/quiz",
    },
    {
      title: "Stepper Form",
      image: stepperimg,
      route: "/stepper",
      repoLink: "https://github.com/AbdulRafay8207/learning-projects",
      liveLink: "https://yourliveurl.com/stepper",
    },
  ];

  return (
    <div className="home-container">
      <h1>Learning Projects</h1>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            image={project.image}
            route={project.route}
            repoLink={project.repoLink}
            liveLink={project.liveLink}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
