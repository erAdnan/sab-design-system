import * as React from "react"
import Svg, {
  SvgProps,
  G,
  Path,
  Defs,
  LinearGradient,
  Stop,
  ClipPath,
} from "react-native-svg"
const SvgComponent = (props: SvgProps) => (
  <Svg
   {...props}
    width={props.width || 32}
    height={props.height || 32}
    fill="none"
    viewBox="0 0 32 32"
    preserveAspectRatio="xMidYMid meet"
  >
    <G clipPath="url(#a)">
      <Path
        fill="url(#b)"
        d="M15.99 15.396a2.154 2.154 0 0 0-.238-.252h-.01l-4.64-3.906a1.132 1.132 0 0 1-.322-.794v-3.49a.071.071 0 0 1 .022-.052.07.07 0 0 1 .053-.02.073.073 0 0 1 .052.028l4.811 4.037c.206.208.322.489.323.782v3.145c0 .09 0 .178-.014.262-.014.084-.02.18-.037.26Z"
      />
      <Path
        fill="url(#c)"
        d="M15.969 28.668a.072.072 0 0 1-.051-.022l-.018-.015-4.797-4.03a1.124 1.124 0 0 1-.32-.781v-3.068c0-.115 0-.23.013-.34.006-.087.017-.174.033-.26.074.093.156.18.244.258l4.65 3.91c.206.208.322.489.324.782v3.49a.078.078 0 0 1-.048.07.073.073 0 0 1-.03.006Z"
      />
      <Path
        fill="url(#d)"
        d="M10.93 19.247c-.195.235-.062.524.093.723.067.084.142.162.223.233l1.45-1.218-.73-.608-1.035.87Z"
      />
      <Path
        fill="url(#e)"
        d="M15.834 16.356c.281-.245.129-.563-.037-.782a1.73 1.73 0 0 0-.217-.233l-1.197 1.005.73.612.72-.602Z"
      />
      <Path
        fill="url(#f)"
        d="M15.969 21.376a.078.078 0 0 1-.053-.024.116.116 0 0 0-.016-.015L11.103 17.3a1.128 1.128 0 0 1-.326-.792V13.83a.073.073 0 0 1 .02-.055.073.073 0 0 1 .105-.002l.017.016 4.8 4.033c.205.208.321.489.322.782v2.69a.076.076 0 0 1-.072.074v.008Z"
      />
      <Path
        fill="url(#g)"
        d="M16.2 18.068a1.4 1.4 0 0 0-.3-.444l-4.809-4.034a.322.322 0 0 0-.11-.075.326.326 0 0 0-.263 0l.1.249a.084.084 0 0 1 .033 0 .082.082 0 0 1 .031 0l.02.013 4.816 4.045c.103.105.185.228.24.364l.241-.118Z"
      />
      <Path
        fill="url(#h)"
        d="M16 21.36a.075.075 0 0 1-.031 0 .084.084 0 0 1-.034 0 .076.076 0 0 1-.02-.015L11.104 17.3a1.117 1.117 0 0 1-.239-.364l-.242.118c.071.165.172.316.3.444l4.808 4.036a.35.35 0 0 0 .11.075.36.36 0 0 0 .265 0L16 21.36Z"
      />
      <Path
        fill="#91160F"
        d="M15.959 18.186c.054.135.082.28.082.426v2.682a.075.075 0 0 1 0 .031.052.052 0 0 1-.016.02.087.087 0 0 1-.02.015l.102.248a.363.363 0 0 0 .182-.181.373.373 0 0 0 .025-.133v-2.682c0-.187-.037-.372-.11-.544l-.245.117Z"
      />
      <Path
        fill="#E74011"
        d="m10.817 13.764-.02.013a.107.107 0 0 0-.013.022.05.05 0 0 0 0 .031v2.678c0 .147.028.293.084.428l-.242.118a1.409 1.409 0 0 1-.11-.546V13.83a.336.336 0 0 1 .1-.24.318.318 0 0 1 .096-.075l.105.249Z"
      />
      <Path
        fill="url(#i)"
        d="M16.201 24.558a1.416 1.416 0 0 0-.3-.445l-4.661-3.91c-.016-.014-.047-.041-.084-.08a1.607 1.607 0 0 1-.133-.153.912.912 0 0 1-.186-.377.402.402 0 0 1 .15-.39.91.91 0 0 0-.275.365.586.586 0 0 0 .105.586c.05.063.1.117.141.16l.096.092 4.656 3.91c.104.104.186.228.24.364l.251-.122Z"
      />
      <Path
        fill="#E74011"
        d="M10.712 19.568a.587.587 0 0 0 .105.586c0 .04-.014.08-.02.125-.005.045-.01.088-.013.135-.004.047 0 .084 0 .13V23.803c0 .146.027.29.082.426l-.242.117a1.399 1.399 0 0 1-.108-.535v-3.286c0-.045 0-.094.01-.137.014-.283.077-.56.186-.821Z"
      />
      <Path
        fill="#91160F"
        d="M15.959 24.676c.055.136.084.281.084.428v3.49a.068.068 0 0 1 0 .03.102.102 0 0 1-.014.022.045.045 0 0 1-.022.014l.102.248a.316.316 0 0 0 .11-.072.343.343 0 0 0 .1-.243v-3.49c0-.186-.038-.372-.11-.545l-.25.118Z"
      />
      <Path
        fill="url(#j)"
        d="M10.618 24.355c.072.165.173.316.3.444l4.81 4.037c.03.031.067.056.108.072a.335.335 0 0 0 .266 0L16 28.66a.066.066 0 0 1-.031 0 .082.082 0 0 1-.032 0 .052.052 0 0 1-.02-.014l-4.814-4.044a1.115 1.115 0 0 1-.239-.364l-.246.117Z"
      />
      <Path
        fill="url(#k)"
        d="M10.618 10.99c.07.165.172.316.3.443l4.662 3.91c.013.014.045.041.084.082a1.9 1.9 0 0 1 .133.15c.094.11.16.241.193.382a.406.406 0 0 1-.148.391.957.957 0 0 0 .266-.373.586.586 0 0 0-.106-.587 2.137 2.137 0 0 0-.14-.16c-.042-.043-.079-.075-.099-.092l-4.66-3.898a1.161 1.161 0 0 1-.239-.364l-.246.116Z"
      />
      <Path
        fill="#91160F"
        d="M16.1 15.982a.585.585 0 0 0-.106-.586c0-.04.014-.08.02-.123s.01-.09.013-.137c.004-.047 0-.084 0-.129v-3.271c.001-.146-.027-.29-.082-.426l.24-.117c.073.172.11.357.11.543v3.423a2.54 2.54 0 0 1-.195.823Z"
      />
      <Path
        fill="#E74011"
        d="M10.86 10.874a1.103 1.103 0 0 1-.084-.43v-3.49a.054.054 0 0 1 0-.03.103.103 0 0 1 .022-.014l.02-.014-.106-.256a.366.366 0 0 0-.176.182.336.336 0 0 0-.028.133v3.49c0 .187.037.372.11.545l.242-.116Z"
      />
      <Path
        fill="url(#l)"
        d="M16.2 11.193a1.4 1.4 0 0 0-.3-.444l-4.809-4.035a.35.35 0 0 0-.24-.101.34.34 0 0 0-.135.027l.102.248a.084.084 0 0 1 .033 0 .08.08 0 0 1 .031 0l.025.022 4.811 4.037c.103.104.185.228.24.363l.241-.117Z"
      />
      <Path
        fill="url(#m)"
        d="M13.898 3.16v1.412l.77.633v1.732l-.533-.438v1.314l1.62 1.35V7.857l-.365-.31V5.822l.76.64v-1.42L13.899 3.16Z"
      />
      <Path fill="#91160F" d="M15.39 7.545V5.823l.16.346V7.47l-.16.074Z" />
      <Path
        fill="#E74011"
        d="M14.669 5.203v1.734l-.163-.342V5.279l.163-.076Z"
      />
      <Path
        fill="url(#n)"
        d="m16.148 5.043-2.25-1.883-.059-.144.024-.016a.108.108 0 0 1 .035 0 .17.17 0 0 1 .104.037l2.25 1.883a.145.145 0 0 1 .043.054l-.147.069Z"
      />
      <Path
        fill="url(#o)"
        d="m14.506 5.28-.712-.587a.173.173 0 0 1-.043-.057l.147-.072.77.631-.162.084Z"
      />
      <Path
        fill="url(#p)"
        d="m15.39 5.823.758.64.069.144a.097.097 0 0 1-.034.012h-.035a.18.18 0 0 1-.055-.01.14.14 0 0 1-.046-.028l-.497-.416-.16-.342Z"
      />
      <Path
        fill="#91160F"
        d="M15.753 9.162V7.856l.147-.067a.15.15 0 0 1 .016.067v1.306c0 .03-.01.06-.026.086a.149.149 0 0 1-.068.06l-.069-.146Z"
      />
      <Path
        fill="#E74011"
        d="M14.135 6.5v1.313l-.147.068a.158.158 0 0 1-.013-.068V6.499c0-.03.01-.06.025-.086a.163.163 0 0 1 .066-.058l.069.144Z"
      />
      <Path
        fill="url(#q)"
        d="M14.066 6.355a.114.114 0 0 1 .034-.012h.035a.17.17 0 0 1 .103.037l.268.219.162.342-.533-.442-.069-.144Z"
      />
      <Path
        fill="url(#r)"
        d="M15.822 9.308a.097.097 0 0 1-.033.012h-.035a.158.158 0 0 1-.053-.01.15.15 0 0 1-.05-.027l-1.616-1.347a.155.155 0 0 1-.045-.055l.147-.068 1.618 1.349.067.146Z"
      />
      <Path
        fill="url(#s)"
        d="m15.55 7.47.309.263a.169.169 0 0 1 .04.056l-.146.067-.363-.31.16-.075Z"
      />
      <Path
        fill="#91160F"
        d="M16.295 4.974c.01.022.015.045.016.069v1.42c0 .03-.01.06-.026.085a.145.145 0 0 1-.068.059l-.069-.145v-1.42l.147-.068Z"
      />
      <Path
        fill="#E74011"
        d="M13.898 3.16v1.404l-.146.066a.15.15 0 0 1-.016-.066V3.16c0-.03.009-.06.025-.086a.164.164 0 0 1 .078-.058l.06.144Z"
      />
      <Path fill="url(#t)" d="M17.777 24.035v-2.45l.938-.774v2.434l-.938.79Z" />
      <Path fill="url(#u)" d="M17.777 17.54v-2.017l.938-.78v2.01l-.938.788Z" />
      <Path
        fill="url(#v)"
        d="M22.814 23.804c.001.297-.116.582-.324.794l-4.82 4.048a.083.083 0 0 1-.054.022.082.082 0 0 1-.05-.022.078.078 0 0 1-.022-.053V25.09c.002-.292.117-.573.322-.782l4.018-3.372h.01a1.67 1.67 0 0 0 .486-1.173v-1.075a.603.603 0 0 0-1.03-.44l-3.68 3.09a.074.074 0 0 1-.054.022.072.072 0 0 1-.067-.046.075.075 0 0 1-.005-.028v-2.682a1.12 1.12 0 0 1 .322-.782l4.018-3.378h.01c.31-.311.486-.733.486-1.173v-.653a.605.605 0 0 0-1.03-.43l-3.68 3.083a.074.074 0 0 1-.054.021.074.074 0 0 1-.072-.072v-3.497c.002-.293.117-.574.322-.782l4.823-4.057a.065.065 0 0 1 .051-.021.074.074 0 0 1 .074.074v8.183c0 .5-.264.737-.518.991.512-.13.518.303.518.303v7.39Z"
      />
      <Path
        fill="url(#w)"
        d="M22.005 12.055a.614.614 0 0 0-.655.125l-3.68 3.09a.052.052 0 0 1-.02.015.06.06 0 0 1-.034 0 .057.057 0 0 1-.03 0l-.103.25a.365.365 0 0 0 .268 0 .365.365 0 0 0 .108-.075l3.671-3.077a.392.392 0 0 1 .11-.072.299.299 0 0 1 .132-.027c.045 0 .09.008.131.025l.102-.254Z"
      />
      <Path
        fill="url(#x)"
        d="M22.003 13.799c-.07.166-.173.318-.3.446l-4.018 3.37a1.418 1.418 0 0 0-.3.438l.243.117a1.12 1.12 0 0 1 .239-.364l4.017-3.362c.154-.155.277-.338.362-.54l-.243-.105Z"
      />
      <Path
        fill="url(#y)"
        d="M22.005 18.125a.623.623 0 0 0-.46-.004.613.613 0 0 0-.195.127l-3.68 3.09a.05.05 0 0 1-.02.014.06.06 0 0 1-.034 0 .055.055 0 0 1-.03 0l-.103.249a.342.342 0 0 0 .376-.073l3.671-3.084a.351.351 0 0 1 .241-.102c.046 0 .09.01.132.027l.102-.244Z"
      />
      <Path
        fill="url(#z)"
        d="M22.003 20.293c-.07.166-.173.317-.3.444l-4.018 3.376a1.39 1.39 0 0 0-.3.444l.243.115c.056-.135.137-.259.239-.364l4.017-3.372c.154-.156.277-.34.362-.541l-.243-.102Z"
      />
      <Path
        fill="url(#A)"
        d="M22.73 24.234c-.055.136-.137.26-.24.364l-4.82 4.048-.02.014a.085.085 0 0 1-.034 0 .082.082 0 0 1-.03 0l-.103.248a.34.34 0 0 0 .376-.072l4.813-4.04c.127-.129.23-.28.299-.447l-.24-.115Z"
      />
      <Path
        fill="url(#B)"
        d="M22.814 15.12c.005.208-.052.412-.164.587a2.474 2.474 0 0 1-.354.402l.24-.134c.127-.112.244-.235.35-.366a.937.937 0 0 0 .196-.586l-.268.097Z"
      />
      <Path
        fill="url(#C)"
        d="M17.628 11.296a1.12 1.12 0 0 1 .239-.363l4.822-4.049.02-.013a.074.074 0 0 1 .031 0 .092.092 0 0 1 .033 0l.1-.249a.336.336 0 0 0-.266 0 .367.367 0 0 0-.11.073l-4.812 4.04a1.411 1.411 0 0 0-.3.444l.243.117Z"
      />
      <Path
        fill="#91160F"
        d="M17.386 11.18a1.39 1.39 0 0 0-.11.543v3.497a.31.31 0 0 0 .028.133c.017.04.041.077.072.107a.366.366 0 0 0 .108.075l.101-.25a.053.053 0 0 1-.02-.014.086.086 0 0 1-.013-.02.078.078 0 0 1 0-.031v-3.497c0-.147.029-.291.084-.427l-.25-.117Z"
      />
      <Path
        fill="#E74011"
        d="M23.082 15.024V6.938c0-.046-.009-.09-.027-.133a.329.329 0 0 0-.182-.182l-.1.249.02.013.014.02a.084.084 0 0 1 0 .033v8.183l.275-.095Z"
      />
      <Path
        fill="url(#D)"
        d="M23.082 16.213a.341.341 0 0 0-.338-.3.374.374 0 0 0-.133.026.554.554 0 0 0-.074.036l-.24.134c.255-.064.39 0 .449.102a.39.39 0 0 1 .068.196l.268-.194Z"
      />
      <Path
        fill="#91160F"
        d="M22.003 20.293c.072-.173.11-.358.11-.545v-1.06a.336.336 0 0 0-.21-.315l.102-.248a.6.6 0 0 1 .196.131.588.588 0 0 1 .177.432v1.06c0 .219-.042.436-.125.639l-.25-.094ZM17.628 24.67a1.128 1.128 0 0 0-.074.42v3.497a.066.066 0 0 0 0 .032l.014.021.02.014-.102.248a.324.324 0 0 1-.18-.182.304.304 0 0 1-.028-.133V25.09c0-.186.038-.37.11-.541l.24.12ZM17.386 18.053c-.073.172-.11.356-.11.543v2.69a.295.295 0 0 0 .028.133c.016.041.04.079.072.11a.36.36 0 0 0 .108.072l.101-.248a.053.053 0 0 1-.02-.014.083.083 0 0 1-.013-.02.077.077 0 0 1 0-.033v-2.682c0-.146.029-.291.084-.426l-.25-.125ZM21.903 12.303a.35.35 0 0 1 .184.182.337.337 0 0 1 .026.133v.637c0 .187-.037.372-.11.544l.252.096c.083-.203.126-.42.125-.64v-.637a.588.588 0 0 0-.178-.43.585.585 0 0 0-.195-.133l-.104.248Z"
      />
      <Path
        fill="#E74011"
        d="M22.814 16.413v7.391c0 .147-.028.294-.084.43l.24.115c.075-.172.113-.358.112-.545v-7.59l-.268.199Z"
      />
      <Path
        fill="url(#E)"
        d="M19.665 7.623V6.302l-1.493 1.253V5.85l1.493-1.257V3.176L17.44 5.053v4.443l2.226-1.873Z"
      />
      <Path
        fill="#91160F"
        d="M18.334 5.925v1.284l-.163.346V5.85l.163.075ZM17.37 9.647a.158.158 0 0 1-.094-.147V5.053c0-.024.005-.048.016-.069l.147.069v4.443l-.069.15Z"
      />
      <Path
        fill="url(#F)"
        d="M19.814 4.664a.166.166 0 0 1-.044.054l-1.434 1.214-.163-.074 1.492-1.265.149.07Z"
      />
      <Path
        fill="url(#G)"
        d="M19.665 6.3 18.17 7.555l.165-.346 1.227-1.032a.163.163 0 0 1 .104-.04h.035l.035.012-.072.15Z"
      />
      <Path
        fill="url(#H)"
        d="m17.439 9.496 2.226-1.873.149.07a.194.194 0 0 1-.043.055l-2.229 1.873a.174.174 0 0 1-.104.037h-.035a.096.096 0 0 1-.033-.011l.069-.15Z"
      />
      <Path
        fill="url(#I)"
        d="M19.665 3.174 17.44 5.053l-.147-.069a.145.145 0 0 1 .043-.055l2.227-1.878a.161.161 0 0 1 .05-.028.124.124 0 0 1 .053-.011.102.102 0 0 1 .035 0l.036.01-.07.152Z"
      />
      <Path
        fill="#E74011"
        d="M19.665 4.593V3.174l.07-.147c.028.015.051.036.069.061a.164.164 0 0 1 .025.086v1.42a.166.166 0 0 1-.015.07l-.149-.07ZM19.735 6.153c.028.015.051.035.069.06a.162.162 0 0 1 .023.087v1.323a.168.168 0 0 1-.013.07l-.149-.07V6.3l.07-.147Z"
      />
    </G>
    <Defs>
      <LinearGradient
        id="b"
        x1={10.776}
        x2={16.041}
        y1={11.138}
        y2={11.138}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.31} stopColor="#E00713" />
        <Stop offset={0.54} stopColor="#D70B14" />
        <Stop offset={0.75} stopColor="#C71215" />
        <Stop offset={0.77} stopColor="#C51315" />
      </LinearGradient>
      <LinearGradient
        id="c"
        x1={10.778}
        x2={16.043}
        y1={24.41}
        y2={24.41}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.31} stopColor="#E00713" />
        <Stop offset={0.54} stopColor="#D70B14" />
        <Stop offset={0.75} stopColor="#C71215" />
        <Stop offset={0.77} stopColor="#C51315" />
      </LinearGradient>
      <LinearGradient
        id="d"
        x1={10.829}
        x2={12.696}
        y1={19.292}
        y2={19.292}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#91160F" />
        <Stop offset={0.51} stopColor="#B71918" />
        <Stop offset={0.78} stopColor="#A01712" />
        <Stop offset={1} stopColor="#91160F" />
      </LinearGradient>
      <LinearGradient
        id="e"
        x1={14.383}
        x2={15.99}
        y1={16.154}
        y2={16.154}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#91160F" />
        <Stop offset={0.51} stopColor="#B71918" />
        <Stop offset={0.78} stopColor="#A01712" />
        <Stop offset={1} stopColor="#91160F" />
      </LinearGradient>
      <LinearGradient
        id="f"
        x1={10.777}
        x2={16.041}
        y1={17.562}
        y2={17.562}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.31} stopColor="#E00713" />
        <Stop offset={0.54} stopColor="#D70B14" />
        <Stop offset={0.75} stopColor="#C71215" />
        <Stop offset={0.77} stopColor="#C51315" />
      </LinearGradient>
      <LinearGradient
        id="g"
        x1={10.718}
        x2={16.199}
        y1={15.836}
        y2={15.836}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.27} stopColor="#E00713" />
        <Stop offset={0.47} stopColor="#D70B14" />
        <Stop offset={0.65} stopColor="#C71216" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="h"
        x1={10.618}
        x2={16.102}
        y1={19.286}
        y2={19.286}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="i"
        x1={10.682}
        x2={16.201}
        y1={21.937}
        y2={21.937}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="j"
        x1={10.618}
        x2={16.102}
        y1={26.588}
        y2={26.588}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.27} stopColor="#E00713" />
        <Stop offset={0.47} stopColor="#D70B14" />
        <Stop offset={0.65} stopColor="#C71216" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="k"
        x1={10.618}
        x2={16.135}
        y1={13.615}
        y2={13.615}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="l"
        x1={10.716}
        x2={16.199}
        y1={8.962}
        y2={8.962}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.27} stopColor="#E00713" />
        <Stop offset={0.47} stopColor="#D70B14" />
        <Stop offset={0.65} stopColor="#C71216" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="m"
        x1={13.898}
        x2={16.151}
        y1={6.163}
        y2={6.163}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.31} stopColor="#E00713" />
        <Stop offset={0.54} stopColor="#D70B14" />
        <Stop offset={0.75} stopColor="#C71215" />
        <Stop offset={0.77} stopColor="#C51315" />
      </LinearGradient>
      <LinearGradient
        id="n"
        x1={13.83}
        x2={16.295}
        y1={4.02}
        y2={4.02}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.27} stopColor="#E00713" />
        <Stop offset={0.47} stopColor="#D70B14" />
        <Stop offset={0.65} stopColor="#C71216" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="o"
        x1={13.752}
        x2={14.668}
        y1={4.926}
        y2={4.926}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="p"
        x1={15.39}
        x2={16.217}
        y1={6.224}
        y2={6.224}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="q"
        x1={14.066}
        x2={14.668}
        y1={6.638}
        y2={6.638}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="r"
        x1={13.99}
        x2={15.822}
        y1={8.57}
        y2={8.57}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="s"
        x1={15.39}
        x2={15.9}
        y1={7.664}
        y2={7.664}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="t"
        x1={17.965}
        x2={16.765}
        y1={27.902}
        y2={26.459}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#91160F" />
        <Stop offset={0.51} stopColor="#B71918" />
        <Stop offset={0.78} stopColor="#A01712" />
        <Stop offset={1} stopColor="#91160F" />
      </LinearGradient>
      <LinearGradient
        id="u"
        x1={17.89}
        x2={16.9}
        y1={21.488}
        y2={20.297}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#91160F" />
        <Stop offset={0.51} stopColor="#B71918" />
        <Stop offset={0.78} stopColor="#A01712" />
        <Stop offset={1} stopColor="#91160F" />
      </LinearGradient>
      <LinearGradient
        id="v"
        x1={17.544}
        x2={22.814}
        y1={17.765}
        y2={17.765}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#C51315" />
        <Stop offset={0.25} stopColor="#C71215" />
        <Stop offset={0.46} stopColor="#D70B14" />
        <Stop offset={0.69} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="w"
        x1={17.483}
        x2={22.005}
        y1={13.785}
        y2={13.785}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.35} stopColor="#D20E15" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="x"
        x1={17.386}
        x2={22.255}
        y1={15.988}
        y2={15.988}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.35} stopColor="#C71216" />
        <Stop offset={0.53} stopColor="#D70B14" />
        <Stop offset={0.73} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="y"
        x1={17.483}
        x2={22.005}
        y1={19.853}
        y2={19.853}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.35} stopColor="#D20E15" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="z"
        x1={17.386}
        x2={22.255}
        y1={22.48}
        y2={22.48}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.35} stopColor="#D20E15" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="A"
        x1={17.483}
        x2={22.971}
        y1={26.584}
        y2={26.584}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.35} stopColor="#C71216" />
        <Stop offset={0.53} stopColor="#D70B14" />
        <Stop offset={0.73} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="B"
        x1={22.296}
        x2={23.082}
        y1={15.566}
        y2={15.566}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="C"
        x1={17.386}
        x2={22.873}
        y1={8.945}
        y2={8.945}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.35} stopColor="#C71216" />
        <Stop offset={0.53} stopColor="#D70B14" />
        <Stop offset={0.73} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="D"
        x1={22.296}
        x2={23.082}
        y1={16.162}
        y2={16.162}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="E"
        x1={17.439}
        x2={19.665}
        y1={6.335}
        y2={6.335}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#C51315" />
        <Stop offset={0.25} stopColor="#C71215" />
        <Stop offset={0.46} stopColor="#D70B14" />
        <Stop offset={0.69} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="F"
        x1={18.171}
        x2={19.814}
        y1={5.26}
        y2={5.26}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.35} stopColor="#D20E15" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="G"
        x1={18.171}
        x2={19.735}
        y1={6.847}
        y2={6.847}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.65} stopColor="#D20E15" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <LinearGradient
        id="H"
        x1={17.37}
        x2={19.814}
        y1={8.642}
        y2={8.642}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#E30613" />
        <Stop offset={0.35} stopColor="#D20E15" />
        <Stop offset={0.77} stopColor="#B71918" />
      </LinearGradient>
      <LinearGradient
        id="I"
        x1={17.292}
        x2={19.736}
        y1={4.032}
        y2={4.032}
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.23} stopColor="#B71918" />
        <Stop offset={0.35} stopColor="#C71216" />
        <Stop offset={0.53} stopColor="#D70B14" />
        <Stop offset={0.73} stopColor="#E00713" />
        <Stop offset={1} stopColor="#E30613" />
      </LinearGradient>
      <ClipPath id="a">
        <Path fill="#fff" d="M10.508 3H23.02v26H10.51z" />
      </ClipPath>
    </Defs>
  </Svg>
)
export default SvgComponent
