import { IEpisode } from "@types";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const useSaveHistoryView = (data: IEpisode) => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  useEffect(() => {
    let historyLocalStorage = JSON.parse(localStorage.getItem("history") || "[]");
    const history = {
      key: uuidv4(),
      id: data.id,
      category: category,
      name: data.name,
      coverVerticalUrl: data.coverVerticalUrl,
      coverHorizontalUrl: data.coverHorizontalUrl,
      episode: data.episode,
      episodeName: data.currentEpName,
      currentEpName: data.currentEpName
    };
    const firstHistory = historyLocalStorage[0];
    if (!firstHistory) {
      localStorage.setItem("history", JSON.stringify([history]));
      return;
    }
    const isExist = firstHistory.id === data.id && firstHistory.episode === data.episode;
    if (isExist) return;
    if (historyLocalStorage.length >= 30) {
      historyLocalStorage = historyLocalStorage.slice(0, 30);
    }
    localStorage.setItem("history", JSON.stringify([history, ...historyLocalStorage]));
  }, [data, id, category, episode]);
};

export default useSaveHistoryView;
