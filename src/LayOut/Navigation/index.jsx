import { useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col } from "antd";
import { getTeamListAction } from "../../redux/actions";

import styles from "./styles.module.css";
import { ROUTES } from "../../constants/routers";

import award from "../../Images/award.gif";

const Navigation = () => {
  const navRef = useRef();

  const dispatch = useDispatch();
  const { teamList } = useSelector((state) => state.team);
  console.log(teamList.data, "hieu");

  useEffect(() => {
    dispatch(getTeamListAction());
  }, []);

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };
  /*  const renderFilterTeam = () => { */
  /*   return filterParams.teamId.map((filterItem) => { */
  /*       const teamData = teamList.data.find(
            (teamItem) => teamItem.id === filterItem
          );
          console.log(teamData, "aaaa");
          if (!teamData) return null;
          return (
            <Tag
              key={filterItem}
              closable
              onClose={() => handleClearTeamFilter(filterItem)}
            >
              {teamData.name}
            </Tag>
          );
        });
      }; */

  return (
    <div className="containerNavigate">
      <Row>
        <Col span={24}>
          <div className={styles.moveNav}>
            <div className={styles.nav}>
              <ul className={styles.select}>
                <li>
                  <li>
                    <Link className={styles.isActive} to={ROUTES.USER.HOME}>
                      Trang chủ
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.isActive}
                      to={ROUTES.USER.PITCH_LIST}
                    >
                      Đặt Sân
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={styles.isActive}
                      to={ROUTES.USER.PITCH_LIST}
                      /*   to={( teamList.data.find((teamItem) => teamItem.id === 1) &&
                          dispatch(
                            getPitchListAction({
                              params: {
                                teamId: 1,
                                page: 1,
                                limit: PITCH_LIST_LIMIT,
                              },
                            })
                          )))} */
                    >
                      Sân 5
                    </Link>
                  </li>
                </li>
                <div className="logo">
                  <Link to="/">
                    <img src={award} style={{ width: 45, height: 45 }} />
                  </Link>
                </div>
                <li>
                  <li>
                    <Link
                      className={styles.isActive}
                      to={ROUTES.USER.PITCH_HISTORY}
                    >
                      Sân 7
                    </Link>
                  </li>

                  <li>
                    <Link
                      className={styles.isActive}
                      to={ROUTES.USER.PITCH_ABOUT}
                    >
                      Về chúng tôi
                    </Link>
                  </li>
                </li>
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Navigation;
