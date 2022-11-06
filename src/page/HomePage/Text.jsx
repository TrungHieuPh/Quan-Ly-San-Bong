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
      {/*  <div className="containerWrapper3">
          <ul className={styles.ContentContainer3}>
            <Link to={ROUTES.USER.PITCH_LIST} className={styles.ContentLeft3}>
              <div className={styles.ContentItem}>
                <div className={styles.ContentThumb}>
                  <img className={styles.ImageLeft} src={piture43} />
                </div>
                <div className={styles.ContentCaption}>
                  <div className={styles.ContentCapDesc}>
                    <p>
                      <a>
                        <span>BÓNG ĐÁ</span>
                      </a>
                    </p>
                    <p>
                      <a>
                        <span>Thể thao sức khỏe</span>
                      </a>
                    </p>
                  </div>
                  <div className={styles.ContentCapTitle}>SPORTS</div>
                  <div className={styles.ContentCapContent}>
                    <p>&nbsp;</p>
                    <p>
                      <a>
                        <span style={{ color: "#ffffff" }}>
                          Bóng đá là môn thể thao phổ biến và được yêu thích
                          nhất trên thế giới từ xưa tới nay, nó được chơi từ
                          đẳng cấp chuyên nghiệp cho tới nghiệp dư, từ thành thị
                          cho tới xóm làng, từ người lớn cho tới trẻ nhỏ. Bóng
                          đá là bình đẳng, không phân biệt màu da hay giới tính.
                          Mỗi khi có trận bóng đá lớn, hàng vạn người đến sân để
                          xem và cổ vũ cùng hàng triệu người khác theo dõi qua
                          tivi nếu không thể đến sân vận động. Ở các quán cà phê
                          hay những điểm chiếu công cộng, bóng đá gắn kết mọi
                          người theo cách rất riêng và đặc biệt mà không thứ gì
                          khác có thể làm được. Có thể nói, bóng đá còn nhiều
                          hơn là một môn thể thao!
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            <Link to={ROUTES.USER.PITCH_LIST} className={styles.ContentRight3}>
              <div className={styles.ContentItemRight}>
                <div className={styles.ContentThumbRight}>
                  <img src={soccer2} />
                </div>
                <div className={styles.ContentCaptionRight}>
                  <div className={styles.ContentCapDescRight}>
                    <p>
                      <a>
                        <span>Sự đoàn kết</span>
                      </a>
                    </p>
                    <p>
                      <a>
                        <span>Nơi thể hiện đam vê và tính đồng đội</span>
                      </a>
                    </p>
                  </div>
                  <div className={styles.ContentCapTitleRight}>SPORT</div>
                  <div className={styles.ContentCapContentRight}>
                    <p>&nbsp;</p>
                    <p>
                      <a>
                        <span style={{ color: "#ffffff" }}>
                          Bóng đá là tôn giáo, bóng đá cũng là cuộc sống. Với
                          nhiều người, đó là niềm đam mê mãnh liệt, họ như sinh
                          ra chỉ vì bóng đá và chết đi cùng với bóng đá. Trong
                          trận đấu, họ cùng cười, khóc, hồi hộp, căng thẳng
                          trong từng giây, từng phút với đội bóng yêu thích của
                          mình. Họ cũng cảm nhận được sự vinh quang khi chiến
                          thắng hay những giọt nước mắt của nỗi buồn khi thất
                          bại. Hôm nay, tôi sẽ gửi tới các bạn 50 dòng status
                          bóng đá và những câu nói hay nhất về bóng đá vô cùng ý
                          nghĩa để mọi người cùng nhau suy ngẫm. Hy vọng rằng
                          các bạn cũng sẽ thích những câu nói hay về bóng đá!
                        </span>
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </ul>
        </div> */}
    </div>
  );
};

export default Text;
