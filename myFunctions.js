fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    handelDitels(data);
  });

function handelDitels(flats) {
  const flat = document.getElementById("flats");
  flats.forEach((myflat) => {
    let flat1 = creatrow(myflat);
    let flatDetal = addDetal(myflat);
    flat.appendChild(flat1);
    flat.appendChild(flatDetal);
  });
}

function creatrow(myflat) {
  const row = document.createElement("tr");
  for (let i = 0; i < 5; i++) {
    const cell = document.createElement("td");
    row.appendChild(cell);
  }
  row.children[4].textContent = `${myflat.cites}`;
  row.children[3].textContent = `${myflat.detales}`;
  row.children[2].textContent = `${myflat.prices}`;

  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  check.onclick = function () {
    check.parentElement.parentElement.nextElementSibling.classList.toggle(
      "hiding"
    );
  };
  row.children[1].appendChild(check);

  const radio = document.createElement("input");
  radio.setAttribute("type", "radio");
  radio.setAttribute("name", "selectedProperty");
  row.children[0].appendChild(radio);

  return row;
}

function addDetal(myflat) {
  const row = document.createElement("tr");
  row.classList.add("hiding");
  row.innerHTML = `
    <tr class="hiding">
      <td colspan="5">
        <div class="information">
          <ul class="texts">
            <li>المنطقة: ${myflat.aria}</li>
            <li>${myflat.garag} كراج</li>
            <li>الطابق: ${myflat.floor}</li>
            <li>الملكية: ${myflat.having}</li>
            <li><sup>2</sup>مساحة البلكون ${myflat.spouar}</li>
            <li>${myflat.basice}</li>
          </ul>
          <div class="dipartmentImges">
            <img src="${myflat.img1}" alt="">
            <img src="${myflat.img2}" alt="">
            <img src="${myflat.img3}" alt="">
          </div>
        </div>
      </td>
    </tr>`;
  return row;
}

document
  .getElementById("continueButton")
  .addEventListener("click", function () {
    const selectedProperty = document.querySelector(
      'input[name="selectedProperty"]:checked'
    );
    if (selectedProperty) {
      document.getElementById("overlay").style.display = "block";
      document.getElementById("applicationForm").style.display = "block";
    } else {
      alert("يرجى اختيار عقار قبل المتابعة.");
    }
  });

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  // التحقق من صحة المدخلات
  const fullName = document.getElementById("fullName").value;
  const nationalID = document.getElementById("nationalID").value;
  const dob = document.getElementById("dob").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;

  const nationalIDPattern = /^[0-9]{11}$/;
  const mobilePattern = /^09[0-9]{8}$/;

  if (!nationalIDPattern.test(nationalID)) {
    alert("الرقم الوطني غير صحيح.");
    return;
  }

  if (mobile && !mobilePattern.test(mobile)) {
    alert("رقم الموبايل غير صحيح.");
    return;
  }

  // التحقق من كابتشا (إضافة الكود حسب طريقة التحقق المستخدمة)

  alert("تم إرسال النموذج بنجاح.");

  // عرض معلومات العقار المختار
  const selectedRow = document.querySelector(
    'input[name="selectedProperty"]:checked'
  ).parentElement.parentElement;
  const propertyDetails = selectedRow.querySelectorAll("td");
  const propertyInfo = `
    المدينة: ${propertyDetails[4].textContent}
    التفاصيل: ${propertyDetails[3].textContent}
    الاجار الشهري: ${propertyDetails[2].textContent}
  `;

  document.getElementById("overlay").style.display = "none";
  document.getElementById("applicationForm").style.display = "none";

  alert(`تم اختيار العقار بنجاح:\n\n${propertyInfo}`);
});

function refreshCaptcha() {
  var newCaptcha = generateCaptcha();
  document.getElementById("captcha").innerText = newCaptcha;
}
function generateCaptcha() {
  var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var captcha = "";

  for (var i = 0; i < 6; i++) {
    captcha += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return captcha;
}
document.addEventListener("DOMContentLoaded", function () {
  refreshCaptcha();
});
