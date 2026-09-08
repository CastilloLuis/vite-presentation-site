import React from 'react'
import { X } from 'lucide-react'
import CollabCursor from '@/components/CollabCursor'
import useMediaQuery, { NARROW } from '@/lib/useMediaQuery'
import PanZoom from '@/components/PanZoom'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'

/**
 * A sheet of paper with the work sketched on it.
 *
 * Geometry is baked from a generator that draws every rectangle as four
 * slightly-off strokes and every connector as a hand-wobbled curve, so
 * nothing is machine-straight. Each stroke carries pathLength="1" and draws
 * with dashoffset 1 -> 0 on a shared stagger; labels fade in on the step
 * after the shape they belong to, so the page assembles in the order a
 * person would actually draw it.
 */
const STROKES = [
    { d: 'M56.02783415381696 140.3634542710676 L206.10577423631017 139.65121881999133 L205.07962963591777 196.57108640452898 L55.72556885521652 196.5787236579362 Z', seq: 1 },
    { d: 'M55.686439884098455 232.148870885977 L207.14484127866794 232.03615574891967 L205.81772313163043 288.44606785848555 L56.22314305369423 288.3618393428213 Z', seq: 4 },
    { d: 'M291.66723485031036 184.99284520155882 L451.37187359059317 186.4642898149855 L451.3052074196074 241.7899974320736 L291.9210261707525 243.11899584637442 Z', seq: 7 },
    { d: 'M212 168 Q249 168 286 204 M286 204 L276.61211704899057 200.55505389038572 M286 204 L282.29919253604646 194.71000408424493', seq: 10 },
    { d: 'M212 260 Q249 260 286 224 M286 224 L282.29919253604646 233.28999591575507 M286 224 L276.61211704899057 227.44494610961428', seq: 11 },
    { d: 'M556 139.88 C556 117.30799999999999 688 117.30799999999999 688 139.88 C688 152.948 556 152.948 556 139.88 M556 139.88 L555.7390844346671 172 C556 186.85 688 186.85 687.8231985094134 172 L688 139.88', seq: 12 },
    { d: 'M458 204 Q504 162 550 164 M550 164 L540.7006088880454 167.6771354267825 M550 164 L541.0548485330565 159.52962359152627', seq: 14 },
    { d: 'M556 242.8 C556 222.28 672 222.28 672 242.8 C672 254.68 556 254.68 556 242.8 M556 242.8 L555.5814764023672 272 C556 285.5 672 285.5 671.926735532529 272 L672 242.8', seq: 16 },
    { d: 'M458 224 Q504 265 550 262 M550 262 L541.153834100137 266.66319084663087 M550 262 L540.6231001295617 258.52526996447574', seq: 18 },
    { d: 'M291.5368394020418 317.9168690328798 L453.1030138145448 317.83803448723074 L451.98715405517123 369.2607182027822 L290.90811664762816 368.8661502335296 Z', seq: 20 },
    { d: 'M372 248 L372 312 M372 312 L367.9223954694043 302.8691105968769 M372 312 L376.0776045305957 302.8691105968769', seq: 22 },
    { d: 'M555.3519137526406 317.50611169070754 L703.5313744190528 317.8776556139009 L704.2714513427678 370.6895461210234 L555.6346552494842 369.4218872192185 Z', seq: 23 },
    { d: 'M458 344 L550 344 M550 344 L540.8691105968769 348.0776045305957 M550 344 L540.8691105968769 339.9223954694043', seq: 25 },
    { d: 'M772 330.26 C772 310.766 878 310.766 878 330.26 C878 341.546 772 341.546 772 330.26 M772 330.26 L771.887510729063 358 C772 370.825 878 370.825 877.9716597082893 358 L878 330.26', seq: 26 },
    { d: 'M710 344 L766 344 M766 344 L756.8691105968769 348.0776045305957 M766 344 L756.8691105968769 339.9223954694043', seq: 28 },
    { d: 'M55.5317867878274 584.1067834979187 L213.32197662613913 583.3356693121073 L214.13942849100076 654.0440960412817 L55.384972810994356 654.3678845621263 Z', seq: 31 },
    { d: 'M258.02655583674857 584.8912240633933 L429.71645232479386 584.1805174476143 L430.34723397563084 653.7212154034856 L257.9275982980978 655.0332214961682 Z', seq: 36 },
    { d: 'M220 619 L252 619 M252 619 L242.8691105968769 623.0776045305957 M252 619 L242.8691105968769 614.9223954694043', seq: 39 },
    { d: 'M473.4614088180528 509.1845349909433 L641.0699607710447 510.95903322794896 L640.4194859750427 564.9167944193198 L473.9159442791091 565.0196913958385 Z', seq: 41 },
    { d: 'M473.5160408946993 591.0018778687119 L639.8597850208216 590.7804292563957 L640.5984976180589 647.2257370835988 L473.5062402132229 645.8863304019144 Z', seq: 44 },
    { d: 'M474.70080461625514 671.2528604390113 L640.0993559932566 671.7987936501153 L639.3238676550211 728.0346686577353 L473.02584649332607 728.724745593348 Z', seq: 47 },
    { d: 'M436 610 Q452 550 468 538 M468 538 L463.141851195859 546.7406172663505 M468 538 L458.2487257591441 540.2164500173973', seq: 50 },
    { d: 'M436 619 L468 619 M468 619 L458.8691105968769 623.0776045305957 M468 619 L458.8691105968769 614.9223954694043', seq: 51 },
    { d: 'M436 628 Q452 688 468 700 M468 700 L458.2487257591441 697.7835499826027 M468 700 L463.141851195859 691.2593827336495', seq: 52 },
    { d: 'M683.5426638368017 584.1649831539555 L796.5824078329524 584.8801841506875 L795.0478125334707 653.8853708719068 L683.696076810754 653.4231972577857 Z', seq: 54 },
    { d: 'M646 538 Q662 594 678 610 M678 610 L668.660184370206 606.4267879993685 M678 610 L674.4267879993685 600.660184370206', seq: 56 },
    { d: 'M646 619 L678 619 M678 619 L668.8691105968769 623.0776045305957 M678 619 L668.8691105968769 614.9223954694043', seq: 57 },
    { d: 'M646 700 Q662 644 678 628 M678 628 L674.4267879993685 637.339815629794 M678 628 L668.660184370206 631.5732120006315', seq: 58 },
    { d: 'M840.714164865885 583.189570605913 L1030.7543774703072 584.989982272191 L1031.1428219329066 653.2046886922581 L841.0036343793168 652.9756296277632 Z', seq: 59 },
    { d: 'M802 619 L834 619 M834 619 L824.8691105968769 623.0776045305957 M834 619 L824.8691105968769 614.9223954694043', seq: 62 },
    { d: 'M1073.3457361551448 583.9951860612003 L1225.3575842859725 583.1822179527637 L1227.116800887448 654.263753152552 L1075.1314187298908 653.040706849187 Z', seq: 65 },
    { d: 'M1036 619 L1068 619 M1068 619 L1058.869110596877 623.0776045305957 M1068 619 L1058.869110596877 614.9223954694043', seq: 68 },
    { d: 'M1270.2557975745788 583.5592328909362 L1379.7890703563294 584.0046109085691 L1380.1060262089857 653.1397617222228 L1270.0914200877965 653.7446197990769 Z', seq: 71 },
    { d: 'M1232 619 L1264 619 M1264 619 L1254.869110596877 623.0776045305957 M1264 619 L1254.869110596877 614.9223954694043', seq: 73 },
    { d: 'M935 576 Q746 418 557 500 M557 500 L563.7535291502587 492.6250529482168 M557 500 L566.9994332332931 500.1064660176496', seq: 74 },
]

const LABELS = [
    { x: 56.0, y: 86.0, t: "a system, roughly", size: 22, anchor: 'start', seq: 0 },
    { x: 131.0, y: 163.2, t: "web", size: 22, anchor: 'middle', seq: 2 },
    { x: 131.0, y: 188.2, t: "Next.js", size: 22, anchor: 'middle', seq: 3 },
    { x: 131.0, y: 255.8, t: "mobile", size: 19, anchor: 'middle', seq: 5 },
    { x: 131.0, y: 277.5, t: "React Native", size: 19, anchor: 'middle', seq: 6 },
    { x: 372.0, y: 209.2, t: "API", size: 22, anchor: 'middle', seq: 8 },
    { x: 372.0, y: 234.2, t: "Go / Node", size: 22, anchor: 'middle', seq: 9 },
    { x: 622.0, y: 165.8, t: "Postgres", size: 21, anchor: 'middle', seq: 13 },
    { x: 700.0, y: 158.0, t: "source of truth", size: 19, anchor: 'start', seq: 15, muted: true },
    { x: 614.0, y: 266.4, t: "Redis", size: 21, anchor: 'middle', seq: 17 },
    { x: 686.0, y: 262.0, t: "cache", size: 19, anchor: 'start', seq: 19, muted: true },
    { x: 372.0, y: 351.8, t: "queue", size: 23, anchor: 'middle', seq: 21 },
    { x: 630.0, y: 351.8, t: "workers", size: 23, anchor: 'middle', seq: 24 },
    { x: 825.0, y: 352.7, t: "S3", size: 21, anchor: 'middle', seq: 27 },
    { x: 700.0, y: 404.0, t: "jobs, exports, thumbnails", size: 19, anchor: 'start', seq: 29, muted: true },
    { x: 56.0, y: 502.0, t: "how it gets built", size: 22, anchor: 'start', seq: 30 },
    { x: 135.0, y: 614.4, t: "spec +", size: 21, anchor: 'middle', seq: 32 },
    { x: 135.0, y: 638.3, t: "architecture", size: 21, anchor: 'middle', seq: 33 },
    { x: 56.0, y: 678.0, t: "skills + harness loaded", size: 19, anchor: 'start', seq: 34, muted: true },
    { x: 56.0, y: 702.0, t: "Claude Code · Codex", size: 19, anchor: 'start', seq: 35, muted: true },
    { x: 344.0, y: 614.2, t: "plan +", size: 22, anchor: 'middle', seq: 37 },
    { x: 344.0, y: 639.2, t: "direction", size: 22, anchor: 'middle', seq: 38 },
    { x: 312.0, y: 678.0, t: "before any code", size: 19, anchor: 'start', seq: 40, muted: true },
    { x: 557.0, y: 533.4, t: "agent", size: 21, anchor: 'middle', seq: 42 },
    { x: 557.0, y: 557.3, t: "build", size: 21, anchor: 'middle', seq: 43 },
    { x: 557.0, y: 614.4, t: "agent", size: 21, anchor: 'middle', seq: 45 },
    { x: 557.0, y: 638.3, t: "tests", size: 21, anchor: 'middle', seq: 46 },
    { x: 557.0, y: 695.4, t: "agent", size: 21, anchor: 'middle', seq: 48 },
    { x: 557.0, y: 719.3, t: "refactor", size: 21, anchor: 'middle', seq: 49 },
    { x: 474.0, y: 760.0, t: "in parallel", size: 19, anchor: 'start', seq: 53, muted: true },
    { x: 740.0, y: 627.5, t: "PR", size: 25, anchor: 'middle', seq: 55 },
    { x: 935.0, y: 614.6, t: "CI · tests", size: 20, anchor: 'middle', seq: 60 },
    { x: 935.0, y: 637.4, t: "review comments", size: 20, anchor: 'middle', seq: 61 },
    { x: 840.0, y: 690.0, t: "agent reads comments,", size: 19, anchor: 'start', seq: 63, muted: true },
    { x: 840.0, y: 714.0, t: "pushes the fixes", size: 19, anchor: 'start', seq: 64, muted: true },
    { x: 1150.0, y: 614.4, t: "me —", size: 21, anchor: 'middle', seq: 66 },
    { x: 1150.0, y: 638.3, t: "reviewing", size: 21, anchor: 'middle', seq: 67 },
    { x: 1325.0, y: 627.5, t: "ship", size: 25, anchor: 'middle', seq: 72 },
    { x: 760.0, y: 506.0, t: "iterate", size: 21, anchor: 'middle', seq: 75 },
]

// Everything before this seq is the system sketch: it is already on the page
// when the board opens. Everything from here is the build loop, which draws
// itself.
const SPLIT = 30
const STEP = 0.1
const START = 0.2

// The system sketch sits small in the top-right; the build loop moves up
// into the space that frees.
const SYSTEM_TRANSFORM = 'translate(848 -3.4) scale(0.62)'
const LOOP_TRANSFORM = 'translate(0 -170)'

const isLoop = (item) => item.seq >= SPLIT

/* The band the drawing is actually made in — the build loop, which is what
   the animation traces. Fitting to this rather than the whole sheet keeps the
   phone view on the part that matters. */
const LOOP_REGION = { x: 30, y: 296, w: 1370, h: 320 }

export default function Whiteboard({ open, onOpenChange }) {
    const narrow = useMediaQuery(NARROW)
    const focus = narrow ? LOOP_REGION : undefined
    // Enough that the smallest hand-lettering lands near 13px.
    const minScale = narrow ? 0.62 : 0

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent showClose={false} overlayClassName="board-backdrop">
                <DialogTitle className="sr-only">How I work</DialogTitle>

                <div className="board">
                    <PanZoom width={1440} height={660} focus={focus} minScale={minScale}>
                    <svg
                        className="board__sheet"
                        viewBox="0 0 1440 660"
                        role="img"
                        aria-label="A sketch of a system — web and mobile clients, an API, Postgres, Redis, a queue, workers and object storage — and below it the build loop: spec and architecture, plan and direction, three agents in parallel, a PR, CI with tests and review comments that iterates back to the agents, a final human read, and ship."
                    >
                        {/* Already drawn: the system, small, top-right. */}
                        <g
                            transform={SYSTEM_TRANSFORM}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            {STROKES.filter((x) => !isLoop(x)).map((x) => (
                                <path key={x.seq} d={x.d} />
                            ))}
                            <g fill="currentColor" stroke="none">
                                {LABELS.filter((l) => !isLoop(l)).map((l) => (
                                    <text
                                        key={l.seq}
                                        className={l.muted ? 'board__label--note' : undefined}
                                        x={l.x}
                                        y={l.y}
                                        fontSize={l.size}
                                        textAnchor={l.anchor}
                                    >
                                        {l.t}
                                    </text>
                                ))}
                            </g>
                        </g>

                        {/* Drawn live: how the work actually gets done. */}
                        <g transform={LOOP_TRANSFORM}>
                            <g
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                {STROKES.filter(isLoop).map((x) => (
                                    <path
                                        key={x.seq}
                                        className="board__ink"
                                        pathLength="1"
                                        d={x.d}
                                        style={{ animationDelay: `${START + (x.seq - SPLIT) * STEP}s` }}
                                    />
                                ))}
                            </g>
                            <g fill="currentColor">
                                {LABELS.filter(isLoop).map((l) => (
                                    <text
                                        key={l.seq}
                                        className={l.muted ? 'board__label board__label--note' : 'board__label'}
                                        x={l.x}
                                        y={l.y}
                                        fontSize={l.size}
                                        textAnchor={l.anchor}
                                        style={{ animationDelay: `${START + (l.seq - SPLIT) * STEP}s` }}
                                    >
                                        {l.t}
                                    </text>
                                ))}
                            </g>
                        </g>
                    </svg>
                        <CollabCursor />
                    </PanZoom>

                    <button
                        type="button"
                        onClick={() => onOpenChange(false)}
                        className="board__close"
                        aria-label="Close"
                    >
                        <X className="size-4" />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
