import styles from "../HomePage/style.module.css";
import soccer2 from "../../Images/soccer2.jpg";

import ImageHome3 from "../../Images/ImageHome3.jpg";

const Text = () => {
  return (
    <div className="containerWrapper3">
      <ul className={styles.ContentContainer3}>
        <li className={styles.ContentLeft3}>
          <div className={styles.ContentItem}>
            <div className={styles.ContentThumb}>
              <img className={styles.ImageLeft} src={ImageHome3} />
            </div>
            <div className={styles.ContentCaption}>
              <div className={styles.ContentCapDesc}>
                <p>
                  <a>
                    <span>abc</span>
                  </a>
                </p>
                <p>
                  <a>
                    <span>abc</span>
                  </a>
                </p>
              </div>
              <div className={styles.ContentCapTitle}>Relax</div>
              <div className={styles.ContentCapContent}>
                <p>&nbsp;</p>
                <p>
                  <a>
                    <span style={{ color: "#ffffff" }}>
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </li>
        <li className={styles.ContentRight3}>
          <div className={styles.ContentItemRight}>
            <div className={styles.ContentThumbRight}>
              <img src={soccer2} />
            </div>
            <div className={styles.ContentCaptionRight}>
              <div className={styles.ContentCapDescRight}>
                <p>
                  <a>
                    <span>abc</span>
                  </a>
                </p>
                <p>
                  <a>
                    <span>abc</span>
                  </a>
                </p>
              </div>
              <div className={styles.ContentCapTitleRight}>Relax</div>
              <div className={styles.ContentCapContentRight}>
                <p>&nbsp;</p>
                <p>
                  <a>
                    <span style={{ color: "#ffffff" }}>
                      aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    </span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Text;
