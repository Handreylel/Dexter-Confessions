import { Message, Client } from "@projectdysnomia/dysnomia";

type MathCommandVoid = (msg: Message, client: Client) => void;

const mathCommands: Record<string, MathCommandVoid> = {
    somar: somarNumeros
}

function somarNumeros({ content, channel: { id } }: Message, client: Client): void {
    const separar: string[] = content.split(" ").filter((val, i, arr) => val !== arr[0]);
    const TotalSomado: number = separar.map(v => Number(v)).reduce((acc, v) => acc + v, 0);
    if (Number.isNaN(TotalSomado)) {
        client.createMessage(id, "Conta inválida");
        return;
    }
    client.createMessage(id, `Sua soma deu ${TotalSomado}`);
}

export { mathCommands };