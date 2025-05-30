import { useState } from "react";
import { Link } from "react-router-dom";
import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";
import { UserTag } from "src/components/UserTag";
import styles2 from "src/components/UserTag.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task: initialTask }: TaskItemProps) {
  const [task, setTask] = useState<Task>(initialTask);
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleToggleCheck = async () => {
    try {
      setLoading(true);
      task.isChecked = !task.isChecked;
      const updateRequest = {
        ...task,
        assignee: task.assignee?._id, // convert User to string
      };
      const response = await updateTask(updateRequest);
      if (response.success) {
        setTask(response.data);
      } else {
        alert(response.error);
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  let textContainer = styles.textContainer;
  if (task.isChecked) {
    textContainer = styles.textContainer + " " + styles.checked;
  }
  return (
    <div className={styles.item}>
      {
        <CheckButton
          checked={task.isChecked}
          onPress={handleToggleCheck}
          disabled={isLoading}
        ></CheckButton> /* render CheckButton here */
      }
      <div className={textContainer}>
        <div className={styles.innerTextContainer}>
          {task.description && (
            <>
              <Link to={`/task/${task._id}`} className={styles.taskLink}>
                {<b>{task.title}</b>}
              </Link>
              <span className={styles.description}>
                {task.description /* render description here */}
              </span>
            </>
          )}
          {!task.description && (
            <>
              <Link to={`/task/${task._id}`} className={styles.taskLink}>
                {<b>{task.title}</b>}
              </Link>
            </>
          )}
        </div>
        <UserTag user={task.assignee} className={styles2.userTagStyle}></UserTag>
      </div>
    </div>
  );
}
