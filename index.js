const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;

const commands = [
  new SlashCommandBuilder()
    .setName('hola')
    .setDescription('Lunita te saluda!')
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);

(async () => {
  try {
    console.log('Registrando comandos slash...');
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: commands }
    );
    console.log('✅ Comando registrado.');
  } catch (error) {
    console.error('Error registrando comando:', error);
  }
})();

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;
  if (interaction.commandName === 'hola') {
    await interaction.reply('¡Hola! 🌙 Soy Lunita, tu bot.');
  }
});

client.once('ready', () => {
  console.log(`✅ Bot listo como ${client.user.tag}`);
});

client.login(TOKEN);
