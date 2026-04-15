console.log("hello")

let currentAudio = null

async function getsongs() {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")
    let songs = []
    for (let index = 0; index < as.length; index++) {
        const element = as[index]
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href)   // ✅ store full URL
        }
    }
    return songs
}
const playMusic = (track) => {
    if (currentAudio) {
        currentAudio.pause()
    }

    currentAudio = new Audio(track)   // ✅ direct URL
    currentAudio.play()
}

async function main() {
    let songs = await getsongs()

    let songUL = document.querySelector(".songlist ul")

    for (let i = 0; i < songs.length; i++) {
        let song = songs[i]

 
        let songName = decodeURIComponent(song)
            .replace(/\\/g, "/")          // convert \ → /
            .replace(/.*songs\//, "")

        songUL.innerHTML += `
        <li data-index="${i}">
            <img class="invert" src="images/music.svg" alt="">
            <div class="info">
                <div>${songName.replace(".mp3", "")}</div>
                <div>Amaan</div>
            </div>
            <div class="playnow">
                <img width="20px" class="invert" src="images/play.svg" alt="play">
            </div>
        </li>`
    }

    // Add click listeners
    Array.from(document.querySelectorAll(".songlist li")).forEach((e) => {
        e.addEventListener("click", () => {
            let index = e.getAttribute("data-index")
            console.log(e.querySelector(".info div").innerText)
            playMusic(songs[index])   // ✅ correct track plays
        })
    })
}

main()