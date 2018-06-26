import { Mission } from "./mission-object";

const loc_sydney = { lat: -33.8688, lng: 151.2093 }

function getRandomLoc(loc) {
    let randomLoc: any = { lat: null, lng: null };
    randomLoc.lat = Math.round((loc.lat + Math.random() / 5 - 0.1)*1000)/1000;
    randomLoc.lng = Math.round((loc.lng + Math.random() / 5 - 0.1)*1000)/1000;
    return randomLoc
}

export const MISSIONS_: Mission[] = [
    {
        id: 1,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        // loc: { lat: -33.8688, lng: 151.2093 },
        level: 1,
        desc: "变压器损坏",
        time: new Date().toISOString(),
        isFixed: true,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 2,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 2,
        desc: "电线暴露",
        time: new Date().toISOString(),
        isFixed: false,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 3,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 3,
        desc: "保险丝熔断",
        time: new Date().toISOString(),
        isFixed: true,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 4,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 1,
        desc: "变压器损坏",
        time: new Date().toISOString(),
        isFixed: false,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 5,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 2,
        desc: "电线暴露",
        time: new Date().toISOString(),
        isFixed: true,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 6,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 3,
        desc: "保险丝熔断",
        time: new Date().toISOString(),
        isFixed: true,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 7,
        type: "electric",
        loc: getRandomLoc(loc_sydney),
        level: 1,
        desc: "变压器损坏",
        time: new Date().toISOString(),
        isFixed: false,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 8,
        type: "firefighting",
        loc: getRandomLoc(loc_sydney),
        level: 1,
        desc: "石棉失火",
        time: new Date().toISOString(),
        isFixed: false,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
    {
        id: 9,
        type: "firstaid",
        loc: getRandomLoc(loc_sydney),
        level: 1,
        desc: "呼吸困难",
        time: new Date().toISOString(),
        isFixed: false,
        image: '/asset/imgs/view.jpg',
        casualties: "一人受伤，一人死亡",
    },
]

function randomChoice(arr) {
    return arr[Math.floor(arr.length * Math.random())];
}

export const MISSIONS: Mission[] = []

for (var i = 1; i < 20; i++) {
    let randomMission = new Mission(
        i,
        randomChoice(['electric', 'firstaid', 'firefighting']),
        getRandomLoc(loc_sydney),
        randomChoice([1, 2, 3]),
        randomChoice(["保险丝熔断", "变压器损坏", "电线暴露"]),
        new Date().toISOString(),
        randomChoice([true, false]),
        '/asset/imgs/view.jpg',
        null
    )
    MISSIONS.push(randomMission);
}

