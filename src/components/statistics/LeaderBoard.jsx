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
      <div className="list">
        <RowHeadline
          placement={"No."}
          nickname={"Nickname"}
          sortedBy={sortedBy}
          setSortedBy={setSortedBy}
        />
        {!isLoading ? (
          sortedUsers.map((user, index) => {
            switch (sortedBy) {
              case SortingCategories.INDEX:
                return (
                  <Row
                    placement={`${index + 1}.`}
                    nickname={user.get("nickname")}
                    sortedBy={getIndex(user.data(), gameMode)}
                    key={index}
                  />
                );
              case SortingCategories.WIN_RATE:
                return (
                  <Row
                    placement={`${index + 1}.`}
                    nickname={user.get("nickname")}
                    sortedBy={getWinRate(user.data(), gameMode)}
                    key={index}
                  />
                );
              case SortingCategories.DAILY_STREAK:
                return (
                  <Row
                    placement={`${index + 1}.`}
                    nickname={user.get("nickname")}
                    sortedBy={getDailyStreakMax(user.data(), gameMode)}
                    key={index}
                  />
                );
            }
          })
        ) : (
          <div>kokot</div>
        )}
      </div>
    </div>
  );
}

function Row({ placement, nickname, sortedBy }) {
  return (
    <div className={`lb-row r${placement}`}>
      <div className="placement">
        <span>{placement}</span>
      </div>
      <div className="nickname">
        <span>{nickname}</span>
      </div>
      <div className="sorted-by">
        <span>{sortedBy}</span>
      </div>
    </div>
  );
}

function RowHeadline({ placement, nickname, sortedBy, setSortedBy }) {
  return (
    <div className={"lb-row headline"}>
      <div className="placement">
        <span>{placement}</span>
      </div>
      <div className="nickname">
        <span>{nickname}</span>
      </div>
      <div className="sorted-by">
        <CategorySelector sortedBy={sortedBy} setSortedBy={setSortedBy} />
      </div>
    </div>
  );
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
            <ol>
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
            </ol>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default LeaderBoard;
