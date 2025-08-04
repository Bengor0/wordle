import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllUsers } from "../../utils/firestoreUtils.js";
import { useGameMode } from "../../hooks/useGameMode.js";
import { SortingCategories } from "../../enums/SortingCategories.js";
import {
  compareClassicDailyStreakMax,
  compareClassicIndex,
  compareClassicWinRate,
  compareRoyaleDailyStreakMax,
  compareRoyaleIndex,
  compareRoyaleWinRate,
} from "../../utils/sortingUtils.js";
import {
  getDailyStreakMax,
  getGamesPlayed,
  getIndex,
  getWinRate,
} from "../../utils/userDataUtils.js";
import "./LeaderBoard.css";
import Accordion from "react-bootstrap/Accordion";
import { GameModes } from "../../enums/GameModes.js";
import { Badge, Dropdown, ListGroup, Table } from "react-bootstrap";

function LeaderBoard() {
  const { gameMode } = useGameMode();
  const { data: users, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchAllUsers,
  });
  const [sortedBy, setSortedBy] = useState(SortingCategories.INDEX);
  const [sortedUsers, setSortedUsers] = useState([]);

  useEffect(() => {
    const sortUsers = () => {
      switch (sortedBy) {
        case SortingCategories.INDEX:
          setSortedUsers(
            gameMode === GameModes.CLASSIC
              ? users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareClassicIndex)
              : users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareRoyaleIndex),
          );
          break;
        case SortingCategories.WIN_RATE:
          setSortedUsers(
            gameMode === GameModes.CLASSIC
              ? users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareClassicWinRate)
              : users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareRoyaleWinRate),
          );
          break;
        case SortingCategories.DAILY_STREAK:
          setSortedUsers(
            gameMode === GameModes.CLASSIC
              ? users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareClassicDailyStreakMax)
              : users.docs
                  .filter((user) => getGamesPlayed(user.data(), gameMode) >= 5)
                  .toSorted(compareRoyaleDailyStreakMax),
          );
          break;
      }
    };

    users && sortUsers();
  }, [users, gameMode, sortedBy]);

  return (
    <div className="leader-board">
      <Table hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nickname</th>
            <th>
              <Dropdown align="end">
                <Dropdown.Toggle>{sortedBy}</Dropdown.Toggle>
                <Dropdown.Menu>
                  {Object.keys(SortingCategories).map((key) =>
                    SortingCategories[key] === sortedBy ? null : (
                      <Dropdown.Item
                        onClick={() => setSortedBy(SortingCategories[key])}
                      >
                        {SortingCategories[key]}
                      </Dropdown.Item>
                    ),
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </th>
          </tr>
        </thead>
        <tbody>
          {!isLoading ? (
            sortedUsers.map((user, index) => {
              let displayStat;
              switch (sortedBy) {
                case SortingCategories.INDEX:
                  displayStat = getIndex(user.data(), gameMode);
                  break;
                case SortingCategories.WIN_RATE:
                  displayStat = getWinRate(user.data(), gameMode);
                  break;
                case SortingCategories.DAILY_STREAK:
                  displayStat = getDailyStreakMax(user.data(), gameMode);
                  break;
              }
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.get("nickname")}</td>
                  <td>{displayStat}</td>
                </tr>
              );
            })
          ) : (
            <div>kokot</div>
          )}
        </tbody>
      </Table>
    </div>
  );

  // return (
  //   <div className="leader-board">
  //     <ListGroup variant="flush">
  //       <ListGroup.Item variant="light">
  //         <span>No.</span>
  //         <span>Nickname</span>
  //         <span>Sorted by</span>
  //       </ListGroup.Item>
  //     </ListGroup>
  //     <ListGroup variant="flush" as="ol" numbered className="d-flex">
  //       {!isLoading ? (
  //         sortedUsers.map((user, index) => {
  //           let displayStat;
  //           switch (sortedBy) {
  //             case SortingCategories.INDEX:
  //               displayStat = getIndex(user.data(), gameMode);
  //               break;
  //             case SortingCategories.WIN_RATE:
  //               displayStat = getWinRate(user.data(), gameMode);
  //               break;
  //             case SortingCategories.DAILY_STREAK:
  //               displayStat = getDailyStreakMax(user.data(), gameMode);
  //               break;
  //           }
  //           return (
  //             <ListGroup.Item
  //               as="li"
  //               variant="dark"
  //               className="d-flex justify-content-between align-items-start"
  //             >
  //               <span>{user.get("nickname")}</span>
  //               <Badge>{displayStat}</Badge>
  //             </ListGroup.Item>
  //           );
  //         })
  //       ) : (
  //         <div>kokot</div>
  //       )}
  //     </ListGroup>
  //   </div>
  // );
}

function CategorySelector({ sortedBy, setSortedBy }) {
  const accordionRef = useRef(null);
  const [collapse, setCollapse] = useState(false);
  const [changedSortedBy, setChangedSortedBy] = useState(sortedBy);
  return (
    <div className="category-selector">
      <Accordion activeKey={"true"} ref={accordionRef}>
        <Accordion.Item
          eventKey={String(collapse)}
          style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
        >
          <Accordion.Header
            onClick={() => {
              collapse ? setCollapse(false) : setCollapse(true);
            }}
          >
            <span className="current-catgeory">
              {changedSortedBy.toUpperCase()}
            </span>
          </Accordion.Header>
          <Accordion.Body
            onExited={() => {
              setSortedBy(changedSortedBy);
            }}
          >
            <ul>
              {Object.keys(SortingCategories).map((key, index) =>
                SortingCategories[key] === sortedBy ? null : (
                  <li
                    className={`selector-list ${index + 1 === Object.keys(SortingCategories).length && "last"}`}
                    key={index}
                    onClick={() => {
                      setCollapse(false);
                      setChangedSortedBy(SortingCategories[key]);
                    }}
                  >
                    <span className="category">
                      {SortingCategories[key].toUpperCase()}
                    </span>
                  </li>
                ),
              )}
            </ul>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default LeaderBoard;
