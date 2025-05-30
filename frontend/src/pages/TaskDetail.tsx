import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Task, getTask } from "src/api/tasks";
import { Button, Page, TaskForm } from "src/components";
import { UserTag } from "src/components/UserTag";
import styles2 from "src/components/UserTag.module.css";
import styles from "src/pages/TaskDetail.module.css";

export function TaskDetail() {
  const [task, updateTask] = useState<Task | null>(null);
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!id) return;
      const result = await getTask(id);

      if (result.success) {
        updateTask(result.data);
      } else {
        setNotFound(true);
        console.error(result.error);
      }
    };
    fetch();
  }, [id]);

  return (
    <Page>
      <Helmet>
        <title>Home | TSE Todos</title>
      </Helmet>

      {notFound ? (
        <div>
          <Link to="/">Back to home</Link>
          <h2>This task doesn’t exist!</h2>
        </div>
      ) : (
        task && (
          <>
            <div className={isEditing ? styles.outerDivEdit : styles.outerDiv}>
              <p>
                {/* `<Link>` renders an `<a>` element with a correct `href` attribute
            but uses the react-router library's client-side routing so the new page
            loads faster (see https://reactrouter.com/en/main/components/link) */}
                <Link to="/">Back to Home</Link>
              </p>

              {isEditing ? (
                <TaskForm
                  mode="edit"
                  task={task}
                  onSubmit={(updatedTask) => {
                    updateTask(updatedTask); // updates the task in state
                    setEditing(false); // closes the form
                  }}
                ></TaskForm>
              ) : (
                <>
                  <div className={styles.innerDiv1}>
                    <h2 className={styles.taskTitle}>{task.title}</h2>
                    <Button
                      kind="primary"
                      type="button"
                      data-testid="task-save-button"
                      label="Edit Task"
                      disabled={isEditing}
                      onClick={() => setEditing(true)}
                    />
                  </div>
                  <p>{task.description ? task.description : "(No description)"}</p>
                  <div className={styles.innerDiv2}>
                    <b> Assignee</b>
                    <div>
                      {" "}
                      {task.assignee && (
                        <UserTag user={task.assignee} className={styles2.userTagStyle}></UserTag>
                      )}
                      {!task.assignee && "not assigned"}
                    </div>
                  </div>
                  <div className={styles.innerDiv2}>
                    <b>Status</b> {task.isChecked ? "Done" : "Not done"}
                  </div>
                  <div className={styles.innerDiv2}>
                    <b>Date created</b>
                    <span style={{ whiteSpace: "nowrap" }}>
                      {new Date(task.dateCreated).toLocaleString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          </>
        )
      )}

      {/* If you want your individual tasks to be back, just call the taskItem component with
      a task object as its parameter (note that you will have to fill all of its fields*/}
    </Page>
  );
}
