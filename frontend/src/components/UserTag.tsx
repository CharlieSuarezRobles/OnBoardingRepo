import { User } from "src/api/users";
import styles from "src/components/UserTag.module.css";

export function UserTag({ user, className }: { user?: User; className?: string }) {
  const userImage = "/userDefault.svg";
  return (
    <div className={`${styles.mainDiv} ${className ?? ""}`}>
      {user ? (
        <div className={styles.assignedTrue}>
          <img src={userImage} alt="user" className={styles.image} />
          <p className={styles.textBoxTrue}>{user.name}</p>
        </div>
      ) : (
        <div className={styles.assignedFalse}>
          <p className={styles.textBoxFalse}>Not assigned</p>
        </div>
      )}
    </div>
  );
}
