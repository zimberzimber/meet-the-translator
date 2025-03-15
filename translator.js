
const translator = (() => {
    const _dictionaryDecoder = {
        "!": "A",
        "#": "B",
        "$": "C",
        "?": "D",
        "&": "E",
        "@": "F",
        "(": "G",
        ")": "H",
        "*": "I",
        "+": "J",
        ",": "K",
        "-": "L",
        "/": "M",
        "0": "N",
        "1": "O",
        "2": "P",
        "3": "Q",
        "4": "R",
        "5": "S",
        "6": "T",
        "7": "U",
        "8": "V",
        "9": "W",
        "<": "X",
        "=": "Y",
        ">": "Z",

        " ": " ",
        "\n": "\n",
        "\r": "\r",
        "\t": "\t",
    }

    const _dictionaryEncoder = {}
    for (let k in _dictionaryDecoder)
        _dictionaryEncoder[_dictionaryDecoder[k]] = k

    function isValid(text, dictionary) {
        for (const char of text) {
            if (dictionary[char.toUpperCase()] === undefined)
                return false
        }

        return true
    }

    function translate(text, dictionary) {
        let result = ""
        for (const char of text)
            result += dictionary[char.toUpperCase()] ?? "-"
        return result
    }

    function decode(text) {
        if (!isValid(text, _dictionaryDecoder))
            return null
        return translate(text, _dictionaryDecoder)
    }

    function encode(text) {
        if (!isValid(text, _dictionaryEncoder))
            return null
        return translate(text, _dictionaryEncoder)
    }

    return { decode, encode }
})()