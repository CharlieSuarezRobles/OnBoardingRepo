import { useEffect, useState } from "react";
import { getAllTasks } from "src/api/tasks";
import { TaskItem } from "src/components";
import styles from "src/components/TaskList.module.css";

import type { Task } from "src/api/tasks";

export interface TaskListProps {
  title: string;
}

export function TaskList({ title }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then((result) => {
      if (result.success) {
        setTasks(result.data);
      } else {
        alert(result.error);
      }
    });
  }, []);

  return (
    <div className={styles.outerMostDiv}>
      <span className={styles.title}>{title}</span>
      <div className={styles.innerDivContainer}>
        {tasks.length === 0 ? (
          // your code here
          <p></p>
        ) : (
          tasks.map((task) => (
            // your code here
            <TaskItem key={task._id} task={task}></TaskItem>
          ))
        )}
      </div>
    </div>
  );
}
