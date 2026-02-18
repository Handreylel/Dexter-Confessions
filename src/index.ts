import dotenv from "dotenv";
import { Client } from "@projectdysnomia/dysnomia";
dotenv.config();

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
    console.log(msg.content);
    if (msg.content === "!intro") {
        dexter.createMessage(msg.channel.id, `Hello ${msg.author.username}!`);
    }
});

dexter.connect();
