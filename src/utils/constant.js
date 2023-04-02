import About from '../Components/views/HomePage/TabContent/About'
export const profileImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsyA44JdhHChP6kGqx36BolQq4Hn7z2yGekw&usqp=CAU'
export const baseUrl = process.env.REACT_APP_baseUrl

export const tabData = [
    {
        title: "Generate New",
        content: <div></div>
    },
    {
        title: "View All Hypnosis Scripts",
        content: <div></div>
    },
    {
        title: "View Generated archHypnosis",
        content: <div></div>
    },
    {
        title: "Story",
        content: <div></div>
    },
    {
        title: "Generate images",
        content: <div></div>
    },
    {
        title: "Generate Prompts",
        content: <div></div>
    },
    {
        title: "Fantasy Templates",
        content: <div></div>
    },
    {
        title: "About",
        content: <About />
    },
]
