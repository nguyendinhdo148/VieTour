import styles from "../../../../src/BlogContent.module.css";

interface BlogContentProps {
  content: string;
}

export const BlogContent = ({ content }: BlogContentProps) => {
  const decodeHTML = (html: string) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const decodedContent = decodeHTML(content);

  return (
    <div
      className={styles.container}
      dangerouslySetInnerHTML={{ __html: decodedContent }}
    />
  );
};
