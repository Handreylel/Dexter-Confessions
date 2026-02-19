import dotenv from "dotenv";
import { Client, Message } from "@projectdysnomia/dysnomia";
import { mathCommands } from "./commands/Math.js";
dotenv.config();

const prefix = "!!";

const dexter = new Client((process.env.discordAcess as string), {
    gateway: {
        intents: [
            "guildMembers",
            "guildMessages",
            "messageContent"
        ]
    }
});

dexter.on("ready", () => {
    console.log("Tudo ok");
});

dexter.on("error", (erro) => {
    console.error(erro);
});

dexter.on("messageCreate", (msg) => {
    if (!msg.content.startsWith(prefix)) return;
    const userMessage = msg.content.trim().slice(prefix.length).split(" ");
    const command = userMessage.shift()?.toLowerCase();

    if (!command) return;

    if (command in mathCommands) {
        mathCommands[command](msg as Message, dexter);
    } else {
        dexter.createMessage(msg.channel.id, "Comando não encontrado");
    }
});

dexter.connect();
