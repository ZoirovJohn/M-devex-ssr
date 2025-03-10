function fitElementToParent(el, padding) {
  let timeout = null;
  function resize() {
    if (timeout) clearTimeout(timeout);
    anime.set(el, { scale: 1 });
    let pad = padding || 0,
      parentEl = el.parentNode,
      elOffsetWidth = el.offsetWidth - pad,
      parentOffsetWidth = parentEl.offsetWidth,
      ratio = parentOffsetWidth / elOffsetWidth;
    timeout = setTimeout(anime.set(el, { scale: ratio }), 10);
  }
  resize();
  window.addEventListener("resize", resize);
}

(function () {
  let transformEls = document.querySelectorAll(".transform-progress"),
    layeredAnimationEl = document.querySelector(".layered-animations"),
    shapeEls = layeredAnimationEl.querySelectorAll(".shape"),
    triangleEl = layeredAnimationEl.querySelector("polygon"),
    trianglePoints = triangleEl.getAttribute("points").split(" "),
    easings = ["easeInOutQuad", "easeInOutCirc", "easeInOutSine", "spring"];

  fitElementToParent(layeredAnimationEl);

  function createKeyframes(value) {
    let keyframes = [];
    for (var i = 0; i < 30; i++) keyframes.push({ value: value });
    return keyframes;
  }

  function animateShape(el) {
    let circleEl = el.querySelector("circle"),
      rectEl = el.querySelector("rect"),
      polyEl = el.querySelector("polygon");

    let animation = anime
      .timeline({
        targets: el,
        duration: function () {
          return anime.random(600, 2200);
        },
        easing: function () {
          return easings[anime.random(0, easings.length - 1)];
        },
        complete: function (anim) {
          animateShape(anim.animatables[0].target);
        },
      })
      .add(
        {
          translateX: createKeyframes(function (el) {
            return el.classList.contains("large")
              ? anime.random(-300, 300)
              : anime.random(-520, 520);
          }),
          translateY: createKeyframes(function (el) {
            return el.classList.contains("large")
              ? anime.random(-110, 110)
              : anime.random(-280, 280);
          }),
          rotate: createKeyframes(function () {
            return anime.random(-180, 180);
          }),
        },
        0
      );
    if (circleEl) {
      animation.add(
        {
          targets: circleEl,
          r: createKeyframes(function () {
            return anime.random(32, 72);
          }),
        },
        0
      );
    }
    if (rectEl) {
      animation.add(
        {
          targets: rectEl,
          width: createKeyframes(function () {
            return anime.random(64, 120);
          }),
          height: createKeyframes(function () {
            return anime.random(64, 120);
          }),
        },
        0
      );
    }
    if (polyEl) {
      animation.add(
        {
          targets: polyEl,
          points: createKeyframes(function () {
            var scale = anime.random(72, 180) / 100;
            return trianglePoints
              .map(function (p) {
                return p * scale;
              })
              .join(" ");
          }),
        },
        0
      );
    }
  }

  for (let i = 0; i < shapeEls.length; i++) {
    animateShape(shapeEls[i]);
  }
})();

function logout() {
  fetch("/member/logout", {
    method: "POST",
    credentials: "same-origin",
  })
    .then((response) => {
      if (response.ok) {
        alert("You have logged out successfully.");
        window.location.href = "/member";
      } else {
        console.log("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    });
}
