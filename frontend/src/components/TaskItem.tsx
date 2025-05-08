import { updateTask } from "src/api/tasks";
import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import { useState } from "react";

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
      const response = await updateTask(task);
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
        <span className={styles.title}>{task.title}</span>
        {task.description && (
          <span className={styles.description}>
            {task.description /* render description here */}
          </span>
        )}
      </div>
    </div>
  );
}
