
//import GithubData from "./github-users-stats.json";
import GithubData from "./github-login-org.json";
import Buzzwords from "./buzzwords.json";
import Foswig from "foswig";

export class NameGen
{
    private static userNames:Foswig;
    private static projectNames:Foswig

    public static getUserName(minLength?: number, maxLength?: number)
    {
        if (!NameGen.userNames)
        {
            NameGen.userNames = new Foswig(3);
            GithubData.forEach((user:GithubPurgedUser) => {NameGen.userNames.addWordToChain(user.login)});
        }
        return NameGen.userNames.generateWord(minLength,maxLength,false,50);
    }

    public static getProjectName(minLength?: number, maxLength?: number)
    {
        if (!NameGen.projectNames)
        {
            NameGen.projectNames = new Foswig(3);
            new Set(GithubData.flatMap((user:GithubPurgedUser) => user.organizations)).forEach((org:string) => NameGen.projectNames.addWordToChain(org));
        }
        return NameGen.projectNames.generateWord(minLength,maxLength,false,50);
    }

    public static getFeatureName():string
    {
        return Buzzwords.ifys[Math.floor(Math.random() * Buzzwords.ifys.length)].trim() + " " + Buzzwords.buzzs[Math.floor(Math.random() * Buzzwords.buzzs.length)].trim()
    }
}

export interface GithubUser {
    name: string;
    login: string;
    location: string;
    language: string;
    gravatar: string;
    followers: number;
    organizations: string[];
    contributions: number;
}

export interface GithubPurgedUser {

    login: string;
    organizations: string[];
}