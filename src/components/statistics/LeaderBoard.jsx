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
import { GameModes } from "../../enums/GameModes.js";
import { Badge, Dropdown, ListGroup, Table } from "react-bootstrap";

function LeaderBoard({ gameMode }) {
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
                  {Object.keys(SortingCategories).map((key, index) =>
                    SortingCategories[key] === sortedBy ? null : (
                      <Dropdown.Item
                        onClick={() => setSortedBy(SortingCategories[key])}
                        key={index}
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
          {sortedUsers.map((user, index) => {
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
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.get("nickname")}</td>
                <td>{displayStat}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default LeaderBoard;
