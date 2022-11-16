import { useEffect } from "react";
import { useNavigate, Navigate, useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Space, Button, Dropdown, Menu, Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getPitchListAction, getTeamListAction } from "../../redux/actions";

import styles from "./styles.module.css";
import { logoutAction } from "../../redux/actions/";
import { ROUTES } from "../../constants/routers";
import { PITCH_LIST_LIMIT } from "../../constants/paginations";

import goal from "../../Images/goal.png";
import award from "../../Images/award.gif";

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const { teamList } = useSelector((state) => state.team);

  useEffect(() => {
    dispatch(getTeamListAction());
  }, []);
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
