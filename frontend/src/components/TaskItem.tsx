import { CheckButton } from "src/components";
import styles from "src/components/TaskItem.module.css";

import type { Task } from "src/api/tasks";

export interface TaskItemProps {
  task: Task;
}

export function TaskItem({ task }: TaskItemProps) {
  let textContainer = styles.textContainer;
  if (task.isChecked) {
    textContainer = styles.textContainer + " " + styles.checked;
  }
  return (
    <div className={styles.item}>
      {<CheckButton checked={task.isChecked}></CheckButton> /* render CheckButton here */}
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
