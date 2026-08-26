import {
  Body,
  Bullet,
  Bullets,
  Cmd,
  Note,
  Panel,
  Section,
  SectionHeading,
  Shot,
  Step,
  Steps,
  SubHeading,
  Terminal,
  TerminalLabel,
} from "../../page_components/PixelUIKit";
import * as FeatureArt from "../../../assets/kumandras_economy/features";

function KE_Database() {
  return (
    <div className="w-full pb-6">
      <Section>
        <SectionHeading
          icon="fa-solid fa-database"
          title="Where the money lives"
          subtitle="Flat files that need no setup, or MySQL when your server outgrows them."
          accent="sky"
        />
        <Body className="pt-5 text-justify">
          Out of the box the plugin keeps player data in local YAML and asks
          nothing of you. That is genuinely fine for a single server, and it is
          what most people should leave it on. When you need the data somewhere
          else, point it at MySQL and it takes care of the rest.
        </Body>
      </Section>

      <Section>
        <Shot
          src={FeatureArt.database}
          alt="The Kumandra's Economy player_data table, the connection keys and the YAML fallback"
          accent="sky"
          caption="The table it creates for you, and what happens when the database is unreachable"
        />
      </Section>

      <Section>
        <div className="grid gap-4 md:grid-cols-2">
          <Panel accent="emerald" className="p-5">
            <SubHeading accent="emerald">YAML, THE DEFAULT</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="emerald">
                Nothing to install and nothing to configure.
              </Bullet>
              <Bullet accent="emerald">
                Data is written on shutdown and read back on start.
              </Bullet>
              <Bullet accent="emerald">
                Backing up the server folder backs up the economy with it.
              </Bullet>
            </Bullets>
          </Panel>
          <Panel accent="sky" className="p-5">
            <SubHeading accent="sky">MYSQL, WHEN YOU WANT IT</SubHeading>
            <Bullets className="pt-3">
              <Bullet accent="sky">
                Player balances and jobs go to a real database.
              </Bullet>
              <Bullet accent="sky">
                The database and the <Cmd accent="sky">player_data</Cmd> table
                are created on first connect. There is no schema to import.
              </Bullet>
              <Bullet accent="sky">
                Deleting the plugin folder by accident stops being the end of
                your economy.
              </Bullet>
              <Bullet accent="sky">
                Prepared statements, one batched write per save, and connections
                closed on every path. 2.0 rewrote all three.
              </Bullet>
            </Bullets>
          </Panel>
        </div>
      </Section>

      <Section>
        <Panel accent="sky" className="p-5">
          <SubHeading accent="sky">TURNING IT ON</SubHeading>
          <Steps className="pt-3">
            <Step n="1" accent="sky">
              Open <Cmd accent="sky">Database.yml</Cmd> in the plugin folder.
            </Step>
            <Step n="2" accent="sky">
              Set <Cmd accent="sky">EnableDatabase: true</Cmd>.
            </Step>
            <Step n="3" accent="sky">
              Put your host in <Cmd accent="sky">URL</Cmd>, in the JDBC form,
              and fill in the user and password if your database needs them.
            </Step>
            <Step n="4" accent="sky">
              Restart. The console tells you whether it connected.
            </Step>
          </Steps>
          <Terminal title="KumandrasEconomy / Database.yml" className="mt-5">
            <pre>
              <code className="text-[10px] md:text-sm" lang="yaml">
                <TerminalLabel accent="sky">[MYSQL DATABASE]</TerminalLabel>
                {`
EnableDatabase: false

# "jdbc:mysql://192.168.1.1:3307/" or
# "jdbc:mysql://sql6.freesqldatabase.com:3306/"
URL: "jdbc:mysql://localhost:3307/"
Database: "kumandra_database"
User: "root"
Password: ""
                `}
              </code>
            </pre>
          </Terminal>
        </Panel>
      </Section>

      <Section>
        <Note accent="emerald" icon="fa-solid fa-life-ring">
          If the database cannot be reached, the plugin logs the error, falls
          back to the local YAML files and carries on running. A database outage
          costs you a backup target, not your players&apos; balances. As of 2.0
          a save that fails reports the failure, so the fallback actually
          happens. Before that, a failed save could be reported as successful
          and the data went nowhere.
        </Note>
      </Section>

      <Section>
        <Note accent="amber" icon="fa-solid fa-screwdriver-wrench">
          It uses MySQL Connector/J 26.7.0, bundled in the jar and relocated
          into the plugin&apos;s own package, so there is no driver for you to
          install and it cannot collide with another plugin&apos;s copy of the
          connector. A local XAMPP or WAMP database is plenty for testing this
          before you point it at anything real.
        </Note>
      </Section>
    </div>
  );
}

export default KE_Database;
