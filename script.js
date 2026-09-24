// ====== এখানে আপনার তথ্য বদলান ======
const wedding = {
  groom: "বরের নাম",
  bride: "কনের নাম",
  date: "2026-12-20T18:00:00",         // ফরম্যাট: বছর-মাস-দিনTঘণ্টা:মিনিট:সেকেন্ড
  venue: "ভেন্যুর নাম, এলাকা, শহর",
  mapQuery: "ভেন্যুর নাম, এলাকা, শহর"   // গুগল ম্যাপে যা সার্চ হবে
};
// =====================================

const $ = (id) => document.getElementById(id);
const toBn = (n) => String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);

// ---------- তথ্য বসানো ----------
const weddingDate = new Date(wedding.date);

$("groomName").textContent = wedding.groom;
$("brideName").textContent = wedding.bride;
$("venueName").textContent = wedding.venue;
$("mapBtn").href =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(wedding.mapQuery);

$("weddingDate").textContent =
  weddingDate.toLocaleDateString("bn-BD", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  }) + ", " +
  weddingDate.toLocaleTimeString("bn-BD", { hour: "numeric", minute: "2-digit" });

// ---------- কাউন্টডাউন ----------
function updateCountdown() {
  const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const days = Math.round((startOfDay(weddingDate) - startOfDay(new Date())) / 86400000);
  const el = $("countdown");

  if (days > 0) el.textContent = "আর মাত্র " + toBn(days) + " দিন বাকি";
  else if (days === 0) el.textContent = "আজই আমাদের বিয়ে!";
  else el.textContent = "আপনাদের দোয়া ও ভালোবাসার জন্য ধন্যবাদ";
}
updateCountdown();

// ---------- খাম খোলা ----------
const stage = $("stage");
const envelope = $("envelope");

function openEnvelope() {
  if (stage.classList.contains("opened")) return;
  stage.classList.add("opened");
}

envelope.addEventListener("click", openEnvelope);
envelope.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    openEnvelope();
  }
});

// ---------- মিউজিক টগল ----------
const music = $("bgMusic");
const musicBtn = $("musicBtn");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play()
      .then(() => musicBtn.classList.add("playing"))
      .catch(() => {});
  } else {
    music.pause();
    musicBtn.classList.remove("playing");
  }
});
