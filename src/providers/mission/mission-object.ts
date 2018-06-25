export class Mission {
    id: number;
    type: string;
    loc: any;
    level: number;
    desc: string;
    time: string;
    isFixed: boolean;
    image: string;
    casualties: string;

    constructor(
        id: number,
        type: string,
        loc: any,
        level: number,
        desc: string,
        time: string,
        isFixed: boolean,
        image: string,
        casualties: string, ) {
        this.id = id;
        this.type = type;
        this.loc = loc;
        this.level = level;
        this.desc = desc;
        this.time = time;
        this.isFixed = isFixed;
        this.image = image;
        this.casualties = casualties;
    }
}
