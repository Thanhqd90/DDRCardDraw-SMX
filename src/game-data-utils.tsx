import { useIntl } from "./hooks/useIntl";
import { Chart, GameData, I18NDict } from "./models/SongData";

export function getMetaString(t: (key: string) => string, key: string) {
  return t("meta." + key);
}

export function MetaString({ key }: { key: string }) {
  const { t } = useIntl();
  return <>{getMetaString(t, key)}</>;
}

export function getDiffClass(t: (key: string) => string, diffClassKey: string) {
  return t("meta.$abbr." + diffClassKey);
}

interface AbbrProps {
  diffClass: string;
}

export function AbbrDifficulty({ diffClass }: AbbrProps) {
  const { t } = useIntl();
  return <>{getDiffClass(t, diffClass)}</>;
}

/**
 * get a sorted list of unique difficutly levels (or tiers) from a game data file
 * @credit Albert Shin, from albshin/PerformaiCardDraw
 */
export function getAvailableLevels(
  gameData: GameData | null,
  useGranular = false,
): number[] {
  if (gameData === null) {
    return [];
  }

  let getLevelForChart = (chart: Chart) =>
    useGranular ? chart.sanbaiTier || chart.lvl : chart.lvl;
  if (gameData.meta.usesDrawGroups) {
    getLevelForChart = (chart) => chart.drawGroup || chart.lvl;
  }
  const levelSet = new Set<number>();
  gameData.songs.forEach((song) => {
    song.charts.forEach((chart) => levelSet.add(getLevelForChart(chart)));
  });
  return [...levelSet].sort((a, b) => a - b);
}

export function getDiffAbbr(gameData: GameData, diffClass: string) {
  return ((gameData.i18n.en as I18NDict)["$abbr"] as I18NDict)[
    diffClass
  ] as string;
}
