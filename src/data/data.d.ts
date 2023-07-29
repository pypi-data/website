// From https://stackoverflow.com/questions/42986950/how-to-define-import-variable-type

declare module "@/data/repositories_with_releases.json" {
    import {RepoData} from "@/app/repositories/page";
    const foo:RepoData[];
    export = foo;
}
