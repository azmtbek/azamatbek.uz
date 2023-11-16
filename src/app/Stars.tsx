import styles from "./Stars.module.css";
export const Stars = () => {
  let list = [];
  for (let i = 1; i < 13; i++) {
    list.push(i);
  }
  return (
    <div className="absolute top-0 overflow-hidden w-screen min-h-screen -z-20">
      <div className="  w-screen min-h-screen  origin-center overflow-hidde rotate-45 hidden dark:block">
        {list.map((index) => (
          <div key={index} className={styles.shooting_star}>
          </div>
        ))}
      </div>
    </div>
  );
};
