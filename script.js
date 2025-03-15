
function getInput() {
    return document.getElementById("input").value
}

function setOuput(value) {
    document.getElementById("output").value = value
}

function printError() {
    const input = document.getElementById("input")

    // I hate CSS so much it's unreal
    // https://stackoverflow.com/a/45036752
    input.style.animation = null
    input.offsetHeight
    input.style.animation = "flash-invalid 0.5s ease-out 1"

    setOuput("Invalid input.")
}

function onClickDecode() {
    const result = translator.decode(getInput())
    if (result)
        setOuput(result)
    else
        printError()
}

function onClickEncode() {
    const result = translator.encode(getInput())
    if (result)
        setOuput(result)
    else
        printError()
}

function onClickCopyToClipboard() {
    var output = document.getElementById("output")

    // I hate CSS so much it's unreal
    // https://stackoverflow.com/a/45036752
    output.style.animation = null
    output.offsetHeight
    output.style.animation = "flash-copy 0.5s ease-out 1"

    navigator.clipboard.writeText(output.value)
}

let audioStopped = false
let audioStarted = false

function onClickAudio() {
    audioStopped = !audioStopped

    if (audioStopped) {
        audio.pause()
        audio.currentTime = 0
    } else {
        audio.play()
    }
}

const audio = document.getElementById("audio-player")
audio.volume = 0.2

document.addEventListener("visibilitychange", () => {
    if (audioStopped)
        return

    document.hidden ? audio.pause() : audio.play()
});

const tryToPlay = setInterval(() => {
    if (audioStopped)
        return

    if (!audioStarted) {
        if (navigator.userActivation.hasBeenActive) {
            audioStarted = true
            audio.play()
            clearInterval(tryToPlay)
        }
    }
}, 20)