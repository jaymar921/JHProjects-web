/**
 * The Developer API guide, as data.
 *
 * This is the content of docs/developer-api-guide.md from the plugin
 * repository. The repository is not public, so a page that points at a file
 * nobody can open is no help at all. The guide lives here instead, and this is
 * the copy developers are meant to read.
 *
 * Keep it in step with the doc in the plugin repo when the API changes. The
 * "since" flag marks what 2.0 added; everything without one has been there
 * since 1.x and kept its exact signature.
 */

/** KumandrasAPI against Vault, which is the first thing a developer has to pick. */
export const ApiRoutes = {
  columns: ["", "KumandrasAPI", "Vault"],
  rows: [
    {
      question: "Reaches",
      direct: "Kumandra's currency specifically",
      vault: "Whatever economy the server has set as primary",
    },
    {
      question: "Needs Vault installed",
      direct: "No",
      vault: "Yes",
    },
    {
      question: "Works when Kumandra is secondary",
      direct: "Yes",
      vault: "No, Vault returns the primary economy",
    },
    {
      question: "Gives you jobs, exchange rate, integrations",
      direct: "Yes",
      vault: "No",
    },
  ],
};

/**
 * Method reference, grouped the way the doc groups it. A flat list of twenty
 * signatures is a wall; the groups are how a developer finds the one they came
 * for.
 */
export const ApiGroups = [
  {
    key: "balances",
    title: "BALANCES",
    accent: "emerald",
    icon: "fa-solid fa-coins",
    note: "transfer is the one to reach for when money changes hands. A withdraw followed by a deposit destroys money if the second call fails or your code returns early in between. transfer checks both accounts and the sender's balance before moving anything.",
    methods: [
      {
        signature: "getBalance(Player)",
        returns: "Double",
        note: "The balance, or -1.0 when no account is loaded.",
      },
      {
        signature: "getBalance(UUID)",
        returns: "double",
        since: "2.0",
        note: "The same, for a player who may be offline.",
      },
      {
        signature: "deposit(Player, double)",
        returns: "boolean",
        note: "Adds to the balance. False if there is no account, or the amount is negative.",
      },
      {
        signature: "deposit(UUID, double)",
        returns: "boolean",
        since: "2.0",
        note: "The same, offline capable.",
      },
      {
        signature: "withdraw(Player, double)",
        returns: "boolean",
        note: "Takes from the balance. False if there is no account or it does not cover the amount, and the balance is untouched on failure.",
      },
      {
        signature: "withdraw(UUID, double)",
        returns: "boolean",
        since: "2.0",
        note: "The same, offline capable.",
      },
      {
        signature: "setBalance(UUID, double)",
        returns: "boolean",
        since: "2.0",
        note: "Overwrites outright. False if there is no account, or the amount is negative.",
      },
      {
        signature: "transfer(UUID from, UUID to, double)",
        returns: "boolean",
        since: "2.0",
        note: "An all or nothing move between two accounts.",
      },
    ],
  },
  {
    key: "accounts",
    title: "ACCOUNTS",
    accent: "sky",
    icon: "fa-solid fa-id-card",
    note: "Accounts are created automatically the first time a player joins, so in practice createAccount is only needed for someone who has never been on the server.",
    methods: [
      {
        signature: "hasAccount(UUID)",
        returns: "boolean",
        since: "2.0",
        note: "Whether a record is loaded for that id.",
      },
      {
        signature: "hasAccount(OfflinePlayer)",
        returns: "boolean",
        since: "2.0",
        note: "The same, by player.",
      },
      {
        signature: "createAccount(UUID)",
        returns: "boolean",
        since: "2.0",
        note: "Creates a zero balance account. True when one was created, false when it already existed.",
      },
    ],
  },
  {
    key: "jobs",
    title: "JOBS",
    accent: "amber",
    icon: "fa-solid fa-helmet-safety",
    note: "JobList is me.jaymar921.kumandraseconomy.InventoryGUI.enums.JobList, with the constants FARMER, LUMBERJACK, MINER, HUNTER, GUARDIAN, BUILDER and FISHERMAN.",
    methods: [
      {
        signature: "getJobs(Player)",
        returns: "JobList[]",
        note: "The jobs the player currently holds. Never null, and empty when they hold none.",
      },
      {
        signature: "hasJob(Player, JobList)",
        returns: "boolean",
        since: "2.0",
        note: "Whether they hold one specific job.",
      },
    ],
  },
  {
    key: "server",
    title: "SERVER AND CONFIGURATION",
    accent: "violet",
    icon: "fa-solid fa-sliders",
    note: "Use getCurrencyPrefix() rather than hard coding Kd. Server owners change it, and a message that says Kd on a server whose currency is called Credits looks like a bug in your plugin.",
    methods: [
      {
        signature: "primaryEconomy()",
        returns: "boolean",
        note: "True when Kumandra is this server's main currency.",
      },
      {
        signature: "getCurrencyPrefix()",
        returns: "String",
        since: "2.0",
        note: "The suffix from config.yml, Kd by default. Never null.",
      },
      {
        signature: "getExchangeRate()",
        returns: "double",
        since: "2.0",
        note: "How much Kumandra currency one unit of the primary economy is worth.",
      },
      {
        signature: "getForeignEconomyName()",
        returns: "String",
        since: "2.0",
        note: "The primary economy's plugin name, or null when Kumandra is itself primary.",
      },
      {
        signature: "isVaultHooked()",
        returns: "boolean",
        since: "2.0",
        note: "Whether Vault is installed and hooked.",
      },
      {
        signature: "isCustomEnchantmentsSupported()",
        returns: "boolean",
        since: "2.0",
        note: "Whether Custom Enchantments is installed and integrated.",
      },
      {
        signature: "getServerVersion()",
        returns: "String",
        since: "2.0",
        note: "The detected Minecraft version, 1.16.5 or 26.2 for example.",
      },
      {
        signature: "getPluginVersion()",
        returns: "String",
        since: "2.0",
        note: "The running Kumandra's Economy version.",
      },
    ],
  },
  {
    key: "register",
    title: "REGISTERING YOUR PLUGIN",
    accent: "rose",
    icon: "fa-solid fa-plug",
    note: "Call it once, in onEnable. It is what tells players your plugin is part of their economy, and it costs nothing.",
    methods: [
      {
        signature: "RegisterPlugin(String)",
        returns: "boolean",
        note: "Lists your plugin on the in game balance screen. Always true, including when already registered.",
      },
    ],
  },
];

/** What a return value means, since the API reports rather than throws. */
export const ReturnConventions = [
  {
    value: "-1.0 from getBalance",
    meaning:
      "No account is loaded for this player, not a zero balance. A player with no money returns 0.0. Treat -1.0 as a number and subtract from it and you will write nonsense into somebody's account, so check for it.",
  },
  {
    value: "false from deposit, withdraw, setBalance, transfer",
    meaning: "Nothing moved. There is no partial state to unwind.",
  },
  {
    value: "An empty JobList[]",
    meaning: "The player holds no jobs, or has no record yet. Both are normal.",
  },
  {
    value: "A negative amount",
    meaning:
      "Refused by every write method, rather than being applied as its opposite.",
  },
];

/** The Vault side, and what 2.0 fixed about it. */
export const VaultChanges = [
  {
    method: "format(double)",
    now: "Returns a formatted string with the configured currency suffix.",
    before: "Returned null.",
  },
  {
    method: "currencyNameSingular() and currencyNamePlural()",
    now: "Both return the configured prefix.",
    before: "The singular form returned null.",
  },
  {
    method: "createPlayerAccount(...)",
    now: "Creates an account and returns true.",
    before:
      "Always returned false, which made plugins that create then pay conclude the economy had rejected the player.",
  },
  {
    method: "The world scoped overloads",
    now: "Ignore the world, because Kumandra balances are server wide.",
    before:
      "Compared the player's current world to the requested one and returned zero when they differed, so a balance appeared to change as a player walked through a portal.",
  },
  {
    method: "Every string name overload",
    now: "Resolves offline players safely.",
    before: "Asserted non null and threw an NPE into the calling plugin.",
  },
  {
    method: "Bank methods",
    now: "Return NOT_IMPLEMENTED responses. hasBankSupport() is false; there are no banks.",
    before: "Returned null.",
  },
];

/** Threading and persistence, which is where integrations usually go wrong. */
export const RuntimeNotes = [
  {
    icon: "fa-solid fa-diagram-project",
    accent: "rose",
    title: "CALL IT FROM THE MAIN THREAD",
    body: "Balances live in a plain HashMap that the command handlers, GUI listeners and job listeners all write to on the main thread. Reading or writing it from an async task is a race. If you are working off thread, hop back with Bukkit.getScheduler().runTask before touching the API.",
  },
  {
    icon: "fa-solid fa-floppy-disk",
    accent: "amber",
    title: "WRITES ARE HELD IN MEMORY",
    body: "deposit, withdraw, setBalance and transfer update the in memory record immediately, and the record is written to playerData.yml, or MySQL where the server has it enabled, when the plugin disables. A change you make is visible to every other reader straight away, and a hard server crash loses whatever happened since the last save, the same as every other value the plugin tracks.",
  },
  {
    icon: "fa-solid fa-user-clock",
    accent: "emerald",
    title: "RECORDS OUTLIVE THE SESSION",
    body: "An account record stays loaded after a player logs off, so the UUID overloads work for offline players without any extra loading step.",
  },
];

export const WorkedExamples = [
  {
    key: "charge",
    title: "Charging for something",
    accent: "emerald",
    code: `public boolean chargePlayer(Player player, double cost) {
    if (!api.withdraw(player, cost)) {
        player.sendMessage(ChatColor.RED + "You need "
            + cost + api.getCurrencyPrefix() + ".");
        return false;
    }
    player.sendMessage(ChatColor.GREEN + "Charged "
        + cost + api.getCurrencyPrefix() + ".");
    return true;
}`,
  },
  {
    key: "offline",
    title: "Paying a reward that has to reach an offline player",
    accent: "sky",
    code: `public void payReward(UUID winner, double amount) {
    api.createAccount(winner);   // no-op when they already have one
    api.deposit(winner, amount);
}`,
  },
  {
    key: "job",
    title: "A job gated feature",
    accent: "amber",
    code: `import me.jaymar921.kumandraseconomy.InventoryGUI.enums.JobList;

if (!api.hasJob(player, JobList.MINER)) {
    player.sendMessage("This shaft is for hired miners only.");
    return;
}`,
  },
  {
    key: "display",
    title: "Showing a balance in your own UI",
    accent: "violet",
    code: `double balance = api.getBalance(player);
String display = balance < 0
        ? "no account"
        : String.format("%,.2f%s", balance, api.getCurrencyPrefix());`,
  },
  {
    key: "absent",
    title: "Degrading gracefully when Kumandra is absent",
    accent: "rose",
    code: `private KumandrasAPI economy;   // null when Kumandra is not installed

public boolean economyAvailable() {
    return economy != null;
}

public void reward(Player player, double amount) {
    if (!economyAvailable()) {
        player.sendMessage("Reward: " + amount
            + " (economy plugin not installed)");
        return;
    }
    economy.deposit(player, amount);
}`,
  },
];

export const Troubleshooting = [
  {
    symptom: "getBalance returns -1.0 for a player who is clearly online.",
    cause:
      "Their record has not been created. This happens on the very first join if you run before the join listener. Call createAccount(player.getUniqueId()) first, or just use deposit and check the return value.",
  },
  {
    symptom: 'getPlugin("KumandrasEconomy") returns null in my onEnable.',
    cause:
      "Add softdepend: [KumandrasEconomy] to your plugin.yml. Without it, load order is undefined.",
  },
  {
    symptom:
      "NoClassDefFoundError: me/jaymar921/kumandraseconomy/KumandrasAPI at runtime.",
    cause:
      "You shaded the Kumandra jar into your plugin, or used compile scope instead of provided or compileOnly. The classes must come from the installed plugin at runtime, not from your jar.",
  },
  {
    symptom: "Vault gives me a different plugin's economy.",
    cause:
      "The server has Separate_Economy: true, so Kumandra is deliberately the secondary currency. Use KumandrasAPI if you specifically want Kumandra money. api.primaryEconomy() tells you which situation you are in.",
  },
  {
    symptom: "Balances I write are lost after a restart.",
    cause:
      "Check that the server shut down cleanly. Records flush on plugin disable, and a killed process never gets there. This is unchanged from 1.x and applies to the plugin's own data too.",
  },
];

export const MigrationNotes = [
  {
    title: "getJobs(Player) no longer throws",
    body: "In 1.x it dereferenced the player's record without checking, so it threw a NullPointerException for a player with no account, and an IllegalArgumentException if the stored data held a job name that build did not recognise. It now returns an array without the unknown entries. If you had a try/catch around it, you can drop it.",
  },
  {
    title: "KumandrasAPI.plugin is deprecated",
    body: "It still works, and it is there for source compatibility with 1.x integrations. Prefer plugin.getApi(). A static handle goes stale the moment the server reloads.",
  },
];

/** The code blocks that walk through wiring the API up. */
export const SetupSnippets = {
  softdepend: `softdepend: [KumandrasEconomy]`,
  maven: `<dependency>
    <groupId>me.JayMar921</groupId>
    <artifactId>KumandrasEconomy</artifactId>
    <version>2.0</version>
    <scope>system</scope>
    <systemPath>\${project.basedir}/lib/KumandrasEconomy.jar</systemPath>
</dependency>`,
  gradle: `compileOnly files('lib/KumandrasEconomy.jar')`,
  fetch: `import me.jaymar921.kumandraseconomy.KumandrasAPI;
import me.jaymar921.kumandraseconomy.KumandrasEconomy;

public final class YourPlugin extends JavaPlugin {

    private KumandrasAPI economy;

    @Override
    public void onEnable() {
        Plugin found = Bukkit.getPluginManager()
            .getPlugin("KumandrasEconomy");

        if (!(found instanceof KumandrasEconomy)) {
            getLogger().info("Kumandra's Economy is not installed; "
                + "economy features are off.");
            return;
        }

        economy = ((KumandrasEconomy) found).getApi();
        economy.RegisterPlugin(getName());
    }
}`,
  guard: `double balance = api.getBalance(player);
if (balance < 0) {
    player.sendMessage("You do not have an account yet.");
    return;
}`,
  vault: `RegisteredServiceProvider<Economy> rsp = getServer()
        .getServicesManager()
        .getRegistration(Economy.class);

if (rsp == null) {
    getLogger().warning("No Vault economy installed.");
    return;
}

Economy economy = rsp.getProvider();

economy.depositPlayer(player, 100);
String pretty = economy.format(100);   // "100.00Kd"`,
  thread: `Bukkit.getScheduler().runTask(this, () -> api.deposit(player, reward));`,
};
