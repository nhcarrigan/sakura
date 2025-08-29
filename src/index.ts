/**
 * @copyright NHCarrigan
 * @license Naomi's Public License
 * @author Naomi Carrigan
 */

import { Client, GatewayIntentBits, Events, MessageFlags } from "discord.js";
import { logger } from "./utils/logger.js";

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

client.once(Events.ClientReady, async () => {
  await logger.log("debug", `Logged in as ${client.user?.username}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton()) {
    if (interaction.inCachedGuild() && interaction.customId.startsWith("rr-")) {
      const { member, customId } = interaction;
      await interaction.deferReply({
        flags: [ MessageFlags.Ephemeral ]
      });
      const roleId = customId.split("-")[1];
      if (!roleId) {
        await interaction.editReply({
          content: "There's no role on this button????? Naomi did a fucky wucky."
        });
        return;
      } 
      if (member.roles.cache.has(roleId)) {
        await member.roles.remove(roleId);
        await interaction.editReply({
          content: `I have removed the <@&${roleId}> role from you.`,
                  });
        return;
      }
      if (!member.roles.cache.has(roleId)) {
        await member.roles.add(roleId);
        await interaction.editReply({
          content: `I have added the <@&${roleId}> to you.`,
                 });
      }
    }
  }
})

await client.login(process.env.BOT_TOKEN);
