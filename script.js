const UPI_ID = "9145033400@kotak";
const PAYEE_NAME = "Fitness Heaven Gym & Sports";

const planSelect = document.getElementById("plan");
const amountInput = document.getElementById("amount");
const upiQr = document.getElementById("upiQr");
const upiPayBtn = document.getElementById("upiPayBtn");

// Build UPI link
function buildUpiLink(amount, note) {
  const params = new URLSearchParams({
    pa: UPI_ID,
    pn: PAYEE_NAME,
    cu: "INR"
  });

  if (amount) params.set("am", amount);
  if (note) params.set("tn", note);

  return `upi://pay?${params.toString()}`;
}

// Generate QR
function buildQrUrl(upiLink) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;
}

// Update UI
function updatePaymentUI() {
  const selected = planSelect.selectedOptions[0];
  const amount = selected?.dataset?.amount || "";

  amountInput.value = amount ? `₹${amount}` : "";

  const note = selected?.value ? `Gym Fees - ${selected.value}` : "Gym Fees";
  const upiLink = buildUpiLink(amount, note);

  upiPayBtn.href = upiLink;
  upiQr.src = buildQrUrl(upiLink);
}

// Save data to backend
async function savePaymentData() {
  const data = {
    fullName: document.getElementById("fullName").value,
    mobile: document.getElementById("mobile").value,
    plan: planSelect.value,
    amount: amountInput.value.replace("₹", ""),
    notes: document.getElementById("notes").value
  };

  try {
    const res = await fetch("http://localhost:8000/save-payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    alert(result.message);
  } catch (err) {
    alert("Error saving data ❌");
  }
}

// Events
planSelect.addEventListener("change", updatePaymentUI);

upiPayBtn.addEventListener("click", () => {
  savePaymentData();
});

// Init
updatePaymentUI();

// Swiper Slider Logic for Facilities
const facilitiesSwiper = new Swiper('.facilities-swiper', {
  slidesPerView: 1, // Single photo presentation slide show
  spaceBetween: 20,
  loop: true,

  speed: 600,
  grabCursor: true,

  autoplay: {
    delay: 3500, // Move one by one, pausing to let people look at the whole photo
    disableOnInteraction: false,
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});