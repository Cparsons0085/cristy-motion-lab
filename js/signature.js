/* ========== LOGO ANIMATION ========== */


function animateCristy() {
    const svg = document.querySelector(".cristy-logo");
    if (!svg || typeof gsap === "undefined") return;

    const get = (sel) => svg.querySelector(sel);


    const c = get("#cristy-mask #s-c");
    const r = get("#cristy-mask #s-r");

    // const dot = get("#cristy-mask #dot-i");
    const dot = svg.querySelector("#dot-i");
    const dotPulse = svg.querySelector("#dot-pulse");

    // HARD RESET: dot must be invisible until we explicitly show it
    if (dot) {
        gsap.set(dot, {
            autoAlpha: 0,          // opacity:0 + visibility:hidden
            scaleX: 1,
            scaleY: 1,
            transformBox: "fill-box",
            transformOrigin: "50% 100%"
        });

        // also lock its starting cy (so it doesn't drift between refreshes)
        const baseCY = parseFloat(dot.getAttribute("cy")) || 26;
        gsap.set(dot, { attr: { cy: baseCY } });
    }

    // --- DOT: single source of truth ---
    // if (dot) {
    //     const cx = parseFloat(dot.getAttribute("cx")) || 0;
    //     const cy = parseFloat(dot.getAttribute("cy")) || 0;

    //     // lock transforms and origin to the dot’s actual center in SVG units
    //     gsap.set(dot, {
    //         x: 0,
    //         y: 0,
    //         scaleX: 1,
    //         scaleY: 1,
    //         transformBox: "fill-box",
    //         svgOrigin: `${cx} ${cy}`   // <-- the key
    //     });

    //     dot.setAttribute("fill", "#ff84a7");
    // }

    const dotMasked = svg.querySelector("#dot-i-masked"); // mask reveal


    // if (dot) dot.setAttribute("fill", "#ff84a7");
    if (dotMasked) dotMasked.setAttribute("fill", "lime");


    const iStroke = get("#cristy-mask #s-i");
    const t = get("#cristy-mask #s-t");
    const cross = get("#cristy-mask #s-cross");
    const y = get("#cristy-mask #s-y");

    const strokes = [c, r, iStroke, t, cross, y].filter(Boolean);

    // Prep strokes BEFORE revealing svg
    strokes.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
    });

    // Prep dot (no translate offsets — we animate cy instead)
    // if (dot) {
    //     gsap.set(dot, {
    //         opacity: 0,
    //         x: 0,
    //         y: 0,
    //         scaleX: 1,
    //         scaleY: 1,
    //         transformBox: "fill-box",
    //         transformOrigin: "50% 50%"
    //     });
    // }


    // Visible stroke copies (outside mask)
    const vC = svg.querySelector("#v-c");
    const vR = svg.querySelector("#v-r");
    const vI = svg.querySelector("#v-i");
    const vT = svg.querySelector("#v-t");
    const vCross = svg.querySelector("#v-cross");
    const vY = svg.querySelector("#v-y");

    const visibleStrokes = [vC, vR, vI, vT, vCross, vY].filter(Boolean);

    visibleStrokes.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
    });


    // Optional but recommended: hide svg in CSS initially (.cristy-logo{visibility:hidden})
    svg.style.visibility = "visible";

    gsap.registerPlugin(MotionPathPlugin);

    const tl = gsap.timeline({ defaults: { ease: "power1.out" } });

    function prepStroke(el) {
        if (!el) return;
        const len = el.getTotalLength();
        el.style.strokeDasharray = len;
        el.style.strokeDashoffset = len;
    }

    function drawPair(maskStroke, visibleStroke, dur, position) {
        if (!maskStroke && !visibleStroke) return;

        // ensure both are prepped
        prepStroke(maskStroke);
        prepStroke(visibleStroke);

        // draw them together
        tl.to([maskStroke, visibleStroke].filter(Boolean), {
            strokeDashoffset: 0,
            duration: dur
        }, position);
    }

    // const draw = (el, dur) => tl.to(el, { strokeDashoffset: 0, duration: dur });

    // if (c) draw(c, 0.55);
    // if (r) draw(r, 0.75);

    // draw BOTH: the mask stroke (reveals fill) + the visible 3D stroke (the thick shaded line)
    // const drawPair = (maskStroke, visibleStroke, dur, pos = ">") => {
    //     if (visibleStroke) tl.to(visibleStroke, { strokeDashoffset: 0, duration: dur }, pos);
    //     if (maskStroke) tl.to(maskStroke, { strokeDashoffset: 0, duration: dur }, "<");
    // };

    // replace your old draw(c...), draw(r...) calls with these:
    // drawPair(c, vC, 0.55);
    // drawPair(r, vR, 0.75);

    drawPair(c, vC, 0.45);
    drawPair(r, vR, 0.55, ">-=0.05");

    // ==========================================
    // CRISTY — i DOT BOUNCE + SQUISH
    // ==========================================
    if (dot) {
        gsap.killTweensOf(dot);

        const baseCY = parseFloat(dot.getAttribute("cy")) || 26;
        const landingCY = baseCY;
        const impactCY = 75;


        // Keep dot hidden until its turn
        gsap.set(dot, {
            autoAlpha: 0,
            x: 0,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            transformOrigin: "50% 100%",
            transformBox: "fill-box"
        });

        // Reveal after Cr finishes
        tl.set(dot, { autoAlpha: 1 });

        // Big jump
        tl.to(dot, {
            attr: { cy: landingCY - 38 },
            duration: 0.30,
            ease: "power4.out"
        });

        // Fall to the beginning of the i
        tl.to(dot, {
            attr: { cy: 30 },
            duration: 0.18,
            ease: "power3.in"
        });

        // Mark the exact moment the dot lands
        tl.addLabel("iImpact");

        // Squish when it reaches the bottom
        tl.to(dot, {
            scaleX: 1,
            scaleY: 0.28,
            duration: 0.16,
            ease: "power2.out"
        }, );

        // Briefly hold the compressed shape before rebounding
        tl.to(dot, {
            scaleY: 0.20,
            duration: 0.05
});
        // Recover and rebound
        tl.to(dot, {
            scaleX: 1,
            scaleY: 1,
            attr: { cy: landingCY - 16 },
            duration: 0.18,
            ease: "power2.out"
        });

        // Land
        tl.to(dot, {
            attr: { cy: landingCY },
            duration: 0.18,
            ease: "power2.in"
        });

        // Small final bounce
        tl.to(dot, {
            attr: { cy: landingCY - 6 },
            duration: 0.14,
            ease: "power2.out"
        });

        tl.to(dot, {
            attr: { cy: landingCY },
            duration: 0.14,
            ease: "power2.inOut"
        });

        // Elastic settle
        tl.to(dot, {
            scaleX: 1,
            scaleY: 1,
            duration: 0.35,
            ease: "elastic.out(1,0.5)"
        });
    }

    // if (dot) {
    //     tl.set(dot, { autoAlpha: 1 });

    //     const baseCY = parseFloat(dot.getAttribute("cy")) || 26;
    //     const bounceUp = 14;

    // IMPORTANT: kill any leftover transforms so we start clean
    // gsap.set(dot, { clearProps: "transform" });

    // up + down using cy (no drift)
    // tl.to(dot, { attr: { cy: baseCY - bounceUp }, duration: 0.22, ease: "power3.out" })
    //     .to(dot, { attr: { cy: baseCY }, duration: 0.16, ease: "power2.in" })

    // impact: push DOWN slightly + vertical squash (NO scaleX = no left jerk)
    // .to(dot, {
    //     attr: { cy: baseCY + 3 },
    //     scaleY: 0.72,
    //     transformOrigin: "50% 100%",
    //     duration: 0.08,
    //     ease: "power2.out"
    // }, "<")

    // rebound + settle
    //         .to(dot, { attr: { cy: baseCY - 5 }, scaleY: 1, duration: 0.12, ease: "power2.out" })
    //         .to(dot, { attr: { cy: baseCY }, duration: 0.12, ease: "power2.in" })
    //         .to(dot, { scaleY: 1, duration: 0.22, ease: "elastic.out(1,0.6)" });
    // }



    // dot bounce BEFORE i stroke
    // if (dot) {
    // show the masked half-dot first (optional)
    // if (dotMasked) tl.set(dotMasked, { autoAlpha: 1 });

    // swap RIGHT before the first movement
    // if (dotMasked) tl.set(dotMasked, { autoAlpha: 0 });
    // tl.set(dot, { autoAlpha: 1 });

    // tl.to(dot, { y: -90, duration: 0.30, ease: "power4.out" })
    //     .to(dot, { y: 0, duration: 0.22, ease: "power2.in" })
    //     .to(dot, { scaleX: 1.45, scaleY: 0.45, duration: 0.12, ease: "power2.out" }, "<")
    //     .to(dot, { y: -16, duration: 0.18, ease: "power2.out" })
    //     .to(dot, { y: 0, duration: 0.18, ease: "power2.inOut" })
    //     .to(dot, { y: -6, duration: 0.14, ease: "power2.out" })
    //     .to(dot, { y: 0, duration: 0.14, ease: "power2.inOut" })
    //     .to(dot, { scaleX: 1, scaleY: 1, duration: 0.35, ease: "elastic.out(1,0.5)" }, "<");
    // }

    // i stroke draw (no bounce now — just draw)
    // drawPair(iStroke, vI, 1.0, ">-=0.08");
    // drawPair(t, vT, 0.85, ">-=0.05");
    // drawPair(cross, vCross, 0.45, ">-=0.05");
    // drawPair(y, vY, 0.9, ">-=0.05");

    // The i begins writing exactly when the dot lands
    drawPair(iStroke, vI, 0.65, "iImpact");

    // Continue the lettering after the i
    drawPair(t, vT, 0.55, ">");
    drawPair(cross, vCross, 0.30, ">-=0.05");
    drawPair(y, vY, 0.50, ">-=0.05");

    // if (dot) {
    //     tl.to(dot, { opacity: 1, duration: 0.01 })

    //         // jump up (bigger)
    //         .to(dot, { y: -90, duration: 0.30, ease: "power4.out" })

    //         // fall + squash
    //         .to(dot, { y: 0, duration: 0.22, ease: "power2.in" })
    //         .to(dot, { scaleX: 1.45, scaleY: 0.45, duration: 0.12, ease: "power2.out" }, "<")

    //         .to(dot, { filter: "drop-shadow(0 0 6px rgba(188,133,255,0.9))", duration: 0.08 }, "<")
    //         .to(dot, { filter: "drop-shadow(0 0 0px rgba(188,133,255,0))", duration: 0.18 })


    //         // rebound
    //         .to(dot, { y: -16, duration: 0.18, ease: "power2.out" })
    //         .to(dot, { y: 0, duration: 0.18, ease: "power2.inOut" })


    //         // tiny final bounce
    //         .to(dot, { y: -6, duration: 0.14, ease: "power2.out" })
    //         .to(dot, { y: 0, duration: 0.14, ease: "power2.inOut" })

    //         // settle
    //         .to(dot, { scaleX: 1, scaleY: 1, duration: 0.35, ease: "elastic.out(1,0.5)" }, "<");
    // }

    // drawPair(iStroke, vI, 1.0, "-=0.08");  // preserves your overlap timing
    // drawPair(t, vT, 0.85);
    // drawPair(cross, vCross, 0.45);
    // drawPair(y, vY, 0.9);

    // i stroke draw
    // if (iStroke) tl.to(iStroke, { strokeDashoffset: 0, duration: 1.0, ease: "power1.out" }, "-=0.08");
    // if (iStroke) draw(iStroke, 1.0);
    // if (t) draw(t, 0.85);
    // if (cross) draw(cross, 0.45);
    // if (y) draw(y, 0.9);

    // EXPERIMENT 02 — Enable dot interaction after handwriting finishes

    // ==========================================
    // EXPERIMENT 02 — INTERACTIVE DOT
    // ==========================================

    if (dot) {
        const hitArea = svg.querySelector("#dot-hit-area");

        // Dot is inactive until the handwriting finishes.
        gsap.set(dot, { pointerEvents: "none" });

        if (hitArea) {
            gsap.set(hitArea, { pointerEvents: "none" });
        }

        tl.call(() => {
            if (!hitArea) return;

            // Enable interaction after the signature is complete.
            hitArea.setAttribute("tabindex", "0");
            gsap.set(hitArea, { pointerEvents: "auto" });

            // Keep the invisible target centered on the settled dot.
            gsap.set(hitArea, {
                attr: {
                    cx: dot.getAttribute("cx"),
                    cy: dot.getAttribute("cy")
                }
            });

            // Subtle pulsing ring.
            if (dotPulse) {
                gsap.set(dotPulse, {
                    attr: {
                        cx: dot.getAttribute("cx"),
                        cy: dot.getAttribute("cy"),
                        r: 8
                    },
                    opacity: 0
                });

                gsap.timeline({
                    repeat: -1,
                    repeatDelay: 1.2
                })
                .to(dotPulse, {
                    opacity: 0.65,
                    duration: 0.2
                })
                .to(dotPulse, {
                    attr: { r: 19 },
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            }

            // Soft glow on the dot.
            gsap.to(dot, {
                filter: "drop-shadow(0 0 7px #b99db7)",
                duration: 1,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });

            function launchDot() {
                const target = document.querySelector(
                    "#destination-target"
                );

                if (!target || hitArea.dataset.launched === "true") {
                    return;
                }

                hitArea.dataset.launched = "true";
                hitArea.setAttribute("tabindex", "-1");
                gsap.set(hitArea, { pointerEvents: "none" });

                // Locate the dot's actual screen position.
                const start = dot.getBoundingClientRect();

                const startX = start.left + start.width / 2;
                const startY = start.top + start.height / 2;

                const destination = target.getBoundingClientRect();

                const endX = destination.left + destination.width / 2;
                const endY = destination.top + destination.height / 2;

                // Create a separate traveling dot so the SVG
                // handwriting animation stays untouched.
                const traveler = document.createElement("div");
                traveler.className = "travel-dot";
                document.body.appendChild(traveler);

                gsap.set(traveler, {
                    left: startX,
                    top: startY
                });

                // Hide the original dot after creating the traveler.
                gsap.set(dot, { autoAlpha: 0 });

                if (dotPulse) {
                    gsap.killTweensOf(dotPulse);
                    gsap.set(dotPulse, { opacity: 0 });
                }

                // A curved flight path in screen coordinates.
                const controlX = (startX + endX) / 2 + 130;
                const controlY = Math.min(startY, endY) - 130;

                const flight = {
                    x: startX,
                    y: startY
                };

                let previousX = startX;
                let previousY = startY;
                let particleDistance = 0;

                const colors = [
                    "#b99db7",
                    "#c5b5d4",
                    "#bfa7bb",
                    "#eee8ec"
                ];

                function createParticle(x, y) {
                    const particle = document.createElement("span");
                    particle.className = "dot-particle";

                    const color = colors[
                        Math.floor(Math.random() * colors.length)
                    ];

                    particle.style.background = color;
                    document.body.appendChild(particle);

                    gsap.set(particle, {
                        left: x,
                        top: y,
                        opacity: 0.85,
                        scale: gsap.utils.random(0.5, 1.2)
                    });

                    gsap.to(particle, {
                        x: gsap.utils.random(-35, 35),
                        y: gsap.utils.random(-35, 35),
                        opacity: 0,
                        scale: 0,
                        duration: gsap.utils.random(0.45, 0.9),
                        ease: "power2.out",
                        onComplete: () => particle.remove()
                    });
                }

                gsap.to(flight, {
                    
                    duration: 1.6,
                    ease: "power2.inOut",

                    motionPath: {
                        path: [
                            { x: startX, y: startY },
                            { x: controlX, y: controlY },
                            { x: endX, y: endY }
                        ],
                        curviness: 1.5
                    },

                    onUpdate: () => {
                        gsap.set(traveler, {
                            left: flight.x,
                            top: flight.y
                        });

                        const dx = flight.x - previousX;
                        const dy = flight.y - previousY;

                        particleDistance += Math.hypot(dx, dy);

                        if (particleDistance > 11) {
                            createParticle(flight.x, flight.y);
                            particleDistance = 0;
                        }

                        previousX = flight.x;
                        previousY = flight.y;
                    },

                    onComplete: () => {
                        gsap.to(traveler, {
                            scale: 0,
                            opacity: 0,
                            duration: 0.25,
                            onComplete: () => traveler.remove()
                        });

                        gsap.fromTo(target,
                            {
                                scale: 1,
                                boxShadow: "0 0 0px #b99db7"
                            },
                            {
                                scale: 1.07,
                                boxShadow: "0 0 30px #b99db7",
                                duration: 0.3,
                                yoyo: true,
                                repeat: 1,
                                ease: "power2.out",
                                clearProps: "transform,boxShadow"
                            }
                        );
                    }
                });
            }

            // Mouse click.
            hitArea.addEventListener("click", launchDot);

            // Keyboard activation.
            hitArea.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    launchDot();
                }
            });

        });
    }
}
