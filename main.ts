function ping(): string {
    return "mb2_serial:77"
}

// =============================================================================
// ELECFREAKS KIT
// =============================================================================
//////////////////// GPIO ////////////////
function write_digital(pin: number, value: number) {
    pins.digitalWritePin(pin, value)
    return 1
}

function read_analog(pin: number) {
    return pins.analogReadPin(pin)
}

function write_analog(pin: number, value: number) {
    pins.analogWritePin(pin, value)
    return 1
}

function read_digital(pin: number) {
    return pins.digitalReadPin(pin)
}

function set_analog_period(pin: number, period: number) {
    pins.analogSetPeriod(pin, period)
    return 1
}
///////////////////////////////////////////

//////////////////// built-in on board ////////////////
function read_temperature() {
    return input.temperature()
}

function read_accelerometer() {
    return "" + input.acceleration(Dimension.X) + "," + input.acceleration(Dimension.Y) + "," + input.acceleration(Dimension.Z)
}


function play_music(music_id: number) {
    if (music_id == 0) {
        music.stopAllSounds();
        return 0
    } else {
        music._playDefaultBackground(music.builtInPlayableMelody(melodiesMap[music_id]), music.PlaybackMode.InBackground)
        return 1
    }
}

function play_sound(sound_id: number) {
    if (sound_id == 0) {
        music.stopAllSounds();
        return 1
    } else {
        music.play(music.builtinPlayableSoundEffect(soundExpressionsMap[sound_id]), music.PlaybackMode.InBackground)
        return 1
    }
}

// function read_compass() {
//     return input.compassHeading()
// }

//////////////////// Gesture ////////////////
function enable_gesture(state: number) {
    enable.gesture = state === 1;
    return state === 1 ? "ready" : state === 0 ? "off" : state
}

input.onGesture(Gesture.EightG, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::EightG\n")
    }
})

input.onGesture(Gesture.FreeFall, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::FreeFall\n")
    }
})

input.onGesture(Gesture.LogoUp, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::LogoUp\n")
    }
})

input.onGesture(Gesture.TiltLeft, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::TiltLeft\n")
    }
})

input.onGesture(Gesture.SixG, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::SixG\n")
    }
})

input.onGesture(Gesture.ScreenUp, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::ScreenUp\n")
    }
})

input.onGesture(Gesture.ScreenDown, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::ScreenDown\n")
    }
})

input.onGesture(Gesture.Shake, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::Shake\n")
    }
})

input.onGesture(Gesture.TiltRight, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::TiltRight\n")
    }
})

input.onGesture(Gesture.LogoDown, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::LogoDown\n")
    }
})

input.onGesture(Gesture.ThreeG, function () {
    if (enable.gesture) {
        serial.writeString("" + commands.gesture + "::ThreeG\n")
    }
})
///////////////////////////////////////////

//////////////////// Button ////////////////
function enable_button_ab(state: number) {
    enable.button_ab = state === 1;
    return state === 1 ? "ready" : state === 0 ? "off" : state
}

input.onButtonPressed(Button.A, function () {
    if (enable.button_ab) {
        serial.writeString("" + commands.button_ab + "::a1\n")
    }
})

input.onButtonPressed(Button.B, function () {
    if (enable.button_ab) {
        serial.writeString("" + commands.button_ab + "::b1\n")
    }
})
///////////////////////////////////////////

//////////////////// Logo ////////////////
function enable_logo(state: number) {
    enable.logo = state === 1;
    return state === 1 ? "ready" : state === 0 ? "off" : state
}

input.onLogoEvent(TouchButtonEvent.Touched, function () {
    if (enable.logo) {
        serial.writeString("" + commands.logo + "::1\n")
    }
})

input.onLogoEvent(TouchButtonEvent.Released, function () {
    if (enable.logo) {
        serial.writeString("" + commands.logo + "::0\n")
    }
})
///////////////////////////////////////////

//////////////////// LED Matrix ////////////////
function enable_led_matrix(state: number) {
    led.enable(state === 1)
    return state === 1 ? "ready" : state === 0 ? "off" : state
}

function write_led_matrix_text(text: string) {
    basic.showString(text);
    return text;
}

function write_led_matrix(pattern: number) {
    encode_led_matrix(pattern);
    return 1
}

function encode_led_matrix(hex: number) {
    let bit = 24;
    for (let r = 0; r < 5; r++) {
        for (let c = 0; c < 5; c++) {
            const on = (hex >> bit) & 1
            if (on) {
                led.plot(c, r);
            } else {
                led.unplot(c, r);
            }
            bit--;
        }
    }
    return 1
}
////////////// end built-in on board ////////////

//////////////////// iot kit ////////////////
let oledInited = false   // <-- flag

function add_text(text: string | number) {
    if (!oledInited) {          // if not init
        OLED.init(128, 64)
        oledInited = true
    }
    if (text==='$clear'){
        OLED.clear();
        return 1
    }
    OLED.clear()
    const lines = convertToText(text).split("*NL*")
    for (let i = 0; i < lines.length; i++) {
        OLED.writeStringNewLine(lines[i])
    }
    return 1
}

function read_light_intensity(light_intensity_pin: number) {
    return smarthome.ReadLightIntensity(light_intensity_pin)
}

function move_servo(pin: number, angle: number) {
    pins.servoWritePin(pin, angle)
    return 1
}

function read_soil_humidity(soil_moisture_pin: number) {
    return smarthome.ReadSoilHumidity(soil_moisture_pin)
}

function read_noise(noise_pin: number) {
    return smarthome.ReadNoise(noise_pin)
}

function read_pir(pin: number) {
    if (smarthome.PIR(pin)) {
        return 1
    } else {
        return 0
    }
}

// uv sensor
function uv_sensor(sensorPin: number): number {
    let uv = smarthome.UVLevel(sensorPin)
    return uv
}

//////////////////// Smart Agriculture Kit ////////////////

function read_dht11_sensor(sensorPin: number, mode: string): string {
    if (mode == "T") {
        // return `${Environment.dht11value(Environment.DHT11Type.DHT11_temperature_C, sensorPin)}`
        return `${smarthome.dht11Sensor(sensorPin, smarthome.DHT11_state.DHT11_temperature_C)}`
    } else if (mode == "H") {
        return `${smarthome.dht11Sensor(sensorPin, smarthome.DHT11_state.DHT11_humidity)}`
    } else {
        const T = smarthome.dht11Sensor(sensorPin, smarthome.DHT11_state.DHT11_temperature_C)
        const H = smarthome.dht11Sensor(sensorPin, smarthome.DHT11_state.DHT11_humidity)
        return `${H},${T}`
    }
}

/////// rainbow function helper ////////
function isDecimalStr(s: string): boolean {
    if (!s || s.length === 0) return false
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i)
        if (c < 48 || c > 57) return false // '0'..'9'
    }
    return true
}

function isHexStr(s: string): boolean {
    if (!s || s.length === 0) return false
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i)
        const isNum = (c >= 48 && c <= 57)        // 0-9
        const isUp = (c >= 65 && c <= 70)        // A-F
        const isLow = (c >= 97 && c <= 102)       // a-f
        if (!(isNum || isUp || isLow)) return false
    }
    return true
}

function padHex8Left(s: string): string {
    while (s.length < 8) s = "0" + s
    if (s.length > 8) s = s.substr(s.length - 8, 8)
    return s
}

function hexDigitToVal(ch: string): number {
    const c = ch.charCodeAt(0)
    if (c >= 48 && c <= 57) return c - 48        // '0'..'9'
    if (c >= 65 && c <= 70) return c - 65 + 10   // 'A'..'F'
    if (c >= 97 && c <= 102) return c - 97 + 10  // 'a'..'f'
    return -1
}

function hexByte2(chars: string): number {
    if (chars.length !== 2) return 0
    const hi = hexDigitToVal(chars.charAt(0))
    const lo = hexDigitToVal(chars.charAt(1))
    if (hi < 0 || lo < 0) return 0
    return (hi << 4) | lo
}

// ---------- decToHex8: decimal → hex 8 digit ----------
function decToHex8(n: number): string {
    let v = Math.floor(n % 0x100000000)
    if (v < 0) v += 0x100000000

    if (v === 0) return "00000000"

    let hex = ""
    while (v > 0) {
        const nibble = v & 0xF
        const ch = nibble < 10
            ? String.fromCharCode(48 + nibble)          // '0'+n
            : String.fromCharCode(55 + nibble)          // 'A'+(n-10)
        hex = ch + hex
        v = v >>> 4
    }
    return padHex8Left(hex)
}

// ---------- hexToRGBBr: Receiver number (decimal) or string (hex/dec) ----------
function hexToRGBBr(input: number | string): { r: number, g: number, b: number, br: number } {
    if (input === undefined || input === null) return { r: 0, g: 0, b: 0, br: 255 }

    let s: string
    if (typeof input === "number") {
        s = decToHex8(input) // ex 1694498941 → "6500007D"
    } else {
        s = ("" + input).toUpperCase()
        if (s.length >= 2 && s.substr(0, 2) == "0X") s = s.substr(2)

        if (isDecimalStr(s)) {
            const n = parseInt(s) // base 10
            s = decToHex8(n)
        }
    }

    if (s.length !== 8 || !isHexStr(s)) return { r: 0, g: 0, b: 0, br: 255 }

    const rr = s.substr(0, 2)
    const gg = s.substr(2, 2)
    const bb = s.substr(4, 2)
    const br = s.substr(6, 2)

    const r = hexByte2(rr)
    const g = hexByte2(gg)
    const b = hexByte2(bb)
    const brv = hexByte2(br)

    if ([r, g, b, brv].some(v => v < 0 || v > 255)) return { r: 0, g: 0, b: 0, br: 255 }
    return { r, g, b, br: brv }
}

// rainbow RGB LED
function rainbow(rbgPin: number, color: number | string): number {
    const v = hexToRGBBr(color)
    const strip = neopixel.create(rbgPin, 1, NeoPixelMode.RGB)
    strip.setBrightness(v.br)
    strip.showColor(neopixel.rgb(v.r, v.g, v.b))
    const label = (typeof color === "number") ? decToHex8(color) : ("" + color)
    return 1
}
////// END_smart agriculture kit ////////

//////////// END_ELECFREAKS //////////

//////// variables setup ///////////
const soundExpressionsMap: { [key: number]: SoundExpression } = {
    1: soundExpression.giggle,
    2: soundExpression.happy,
    3: soundExpression.hello,
    4: soundExpression.mysterious,
    5: soundExpression.sad,
    6: soundExpression.slide,
    7: soundExpression.soaring,
    8: soundExpression.spring,
    9: soundExpression.twinkle,
    10: soundExpression.yawn,
}

const melodiesMap: { [key: number]: Melodies } = {
    1: Melodies.BaDing,
    2: Melodies.Baddy,
    3: Melodies.Birthday,
    4: Melodies.Blues,
    5: Melodies.Chase,
    6: Melodies.Dadadadum,
    7: Melodies.Entertainer,
    8: Melodies.Funeral,
    9: Melodies.Funk,
    10: Melodies.JumpDown,
    11: Melodies.JumpUp,
    12: Melodies.Nyan,
    13: Melodies.Ode,
    14: Melodies.PowerDown,
    15: Melodies.PowerUp,
    16: Melodies.Prelude,
    17: Melodies.Punchline,
    18: Melodies.Ringtone,
    19: Melodies.Wawawawaa,
    20: Melodies.Wedding,
}


const pins_map: { [key: string]: number } = {
    'p0': 100,
    'p1': 101,
    'p2': 102,
    'p3': 103,
    'p4': 104,
    'p5': 105,
    'p6': 106,
    'p7': 107,
    'p8': 108,
    'p9': 109,
    'p10': 110,
    'p11': 111,
    'p12': 112,
    'p13': 113,
    'p14': 114,
    'p15': 115,
    'p16': 116,
    'p19': 119,
    'p20': 120
}

const functions: { [key: string]: Function } = {
    'ping': ping,

    'a': add_text,
    'f': read_light_intensity,
    'g': read_noise,
    'h': read_pir,
    'i': read_soil_humidity,
    'l': move_servo,
    'm': read_digital,
    'n': read_analog,
    'o': write_digital,
    'p': write_analog,
    'q': set_analog_period,
    'r': play_sound,
    's': play_music,
    'ee': rainbow,
    'ff': uv_sensor,

    'i0': enable_logo,
    'i1': enable_button_ab,
    'i2': enable_gesture,
    'i3': read_accelerometer,
    // 'i4': read_compass,
    'i5': read_temperature,

    'o0': play_sound,
    'o1': play_music,
    'o2': write_led_matrix,
    'o2a': enable_led_matrix,
    'o2t': write_led_matrix_text,

    'zr': read_dht11_sensor,
}

///////////// SETUP ////////////
let readyForNextCommand = true
let message = ""
let function_name = ""
let function_id = ""
let enable = {
    logo: false,
    button_ab: false,
    gesture: false,
}
let commands = {
    logo: "i0",
    button_ab: "i1",
    gesture: "i2"
}
serial.setTxBufferSize(96)
serial.setRxBufferSize(96)
serial.setBaudRate(BaudRate.BaudRate115200)

led.enable(false)
pins.setAudioPinEnabled(false)
OLED.clear()

///////////// END_SETUP ////////////

////////// SERIAL_COMM //////////
serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
    // exit if not ready
    if (!(readyForNextCommand)) {
        return;
    }
    message = serial.readUntil(serial.delimiters(Delimiters.NewLine))
    function_name = "exception"
    function_id = "exception"
    // set to false immediately after starting processing
    readyForNextCommand = false
    try {
        let parts = message.split(":");
        if (parts.length < 2) throw "Invalid data format";

        function_name = parts[0];
        function_id = parts[1];
        let args = parts.slice(2);

        let func = functions[function_name];
        if (!func) throw "Function not found";

        let parsed_args: any[] = [];
        for (let arg of args) {
            if (pins_map[arg] !== undefined) {
                parsed_args.push(pins_map[arg]);
            } else {
                let parsedInt = parseInt(arg);
                if (!isNaN(parsedInt)) {
                    parsed_args.push(parsedInt);
                } else {
                    parsed_args.push(arg);
                }
            }
        }

        let result;
        switch (parsed_args.length) {
            case 0:
                result = func();
                break;
            case 1:
                result = func(parsed_args[0]);
                break;
            case 2:
                result = func(parsed_args[0], parsed_args[1]);
                break;
            case 3:
                result = func(parsed_args[0], parsed_args[1], parsed_args[2]);
                break;
            case 4:
                result = func(parsed_args[0], parsed_args[1], parsed_args[2], parsed_args[3]);
                break;
            case 5:
                result = func(parsed_args[0], parsed_args[1], parsed_args[2], parsed_args[3], parsed_args[4]);
                break;
            case 6:
                result = func(parsed_args[0], parsed_args[1], parsed_args[2], parsed_args[3], parsed_args[4], parsed_args[5]);
                break;
            default:
                result = -1; // handle case when number of arguments exceed expectations
                break;
        }

        let response = function_name + ":" + function_id + ":" + result + "\n";
        serial.writeString(response);
    } catch (e) {
        let response_error = function_name + ":" + function_id + ":-1\n";
        serial.writeString(response_error);
    } finally {
        readyForNextCommand = true; // set to true once processing is done
        basic.pause(50); // 50ms delay to provide buffer
    }
})
////////// END_SERIAL_COM //////////