import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SideBar from "./components/Sidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
  /*
    undefined: There is no selectedProject
    null: We want to add a new project
    [ID]: selected project id
  */
  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });
  const { selectedProjectId, projects, tasks } = projectsState;

  function handleAddTask(taskText) {
    setProjectsState((prevState) => {
      const newTaskId = Math.random() * Math.random();

      const newTask = {
        text: taskText,
        id: newTaskId,
        projectId: prevState.selectedProjectId,
      };

      return {
        ...prevState,
        tasks: [newTask, ...prevState.tasks],
      };
    });
  }

  function handleDeleteTask() {
    // this === ID
    setProjectsState((prevState) => ({
      ...prevState,
      tasks: prevState.tasks.filter((t) => t.id !== this),
    }));
  }

  function handleSelectProject() {
    // this === ID
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: this,
    }));
  }

  function handleStartAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: null,
    }));
  }

  function handleCancelAddProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
    }));
  }

  function handleAddProject(projectData) {
    setProjectsState((prevState) => {
      const newProjectId = Math.random() * Math.random();

      const newProject = {
        ...projectData,
        id: newProjectId,
      };

      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject],
      };
    });
  }

  function handleDeleteProject() {
    setProjectsState((prevState) => ({
      ...prevState,
      selectedProjectId: undefined,
      projects: prevState.projects.filter(
        (p) => p.id !== prevState.selectedProjectId
      ),
    }));
  }

  const selectedProject = projects.find((p) => p.id === selectedProjectId);
  let content = (
    <SelectedProject
      project={selectedProject}
      onDelete={handleDeleteProject}
      tasks={tasks.filter((task) => task.projectId === selectedProjectId)}
      onAddTask={handleAddTask}
      onDeleteTask={handleDeleteTask}
    />
  );

  if (selectedProjectId === null) {
    content = (
      <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
    );
  } else if (selectedProjectId === undefined) {
    content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
  }

  return (
    <main className="h-screen my-8 flex gap-8">
      <SideBar
        onStartAddProject={handleStartAddProject}
        onSelect={handleSelectProject}
        projects={projects}
        selectedProjectId={selectedProjectId}
      />
      {content}
    </main>
  );
}

export default App;
