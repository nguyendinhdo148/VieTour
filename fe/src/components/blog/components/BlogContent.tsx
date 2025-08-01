import styles from "../../../../src/BlogContent.module.css";

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
