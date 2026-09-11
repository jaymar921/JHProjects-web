import ChangelogBrowser from "../../page_components/ChangelogBrowser";
import { FT_Logs } from "../../contants/farm_tales/FTConstants_Logs";

/**
 * The release history. One entry so far, and it is the whole plugin.
 *
 * Reuses the shared browser rather than copying the search box a fourth
 * time. It knows the green accent.
 */
function FT_ChangeLogs() {
  return (
    <ChangelogBrowser
      logs={FT_Logs}
      accent="green"
      title="Release history"
      subtitle="Every release from newest to oldest. Click a version to open it. The 1.0.0 entry is long because it is the whole plugin; the first block is the one-paragraph version."
      latestLabel="LATEST"
      emptyPrefix="Nothing here matches"
    />
  );
}

export default FT_ChangeLogs;
