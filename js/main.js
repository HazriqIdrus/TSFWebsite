// The Speaking Factory — small interaction layer.
// Shared header/footer include + mobile nav toggle + mailto-based enquiry form.

async function includePartials() {
  const slots = document.querySelectorAll("[data-include]");
  await Promise.all(
    Array.from(slots).map(async (slot) => {
      const url = slot.getAttribute("data-include");
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.status);
        slot.outerHTML = await res.text();
      } catch (e) {
        console.error("Could not load partial:", url, e);
      }
    })
  );
}

function markActiveNavLink() {
  const current = document.body.getAttribute("data-page");
  if (!current) return;
  document.querySelectorAll(".nav-links a[data-page], .footer-links a[data-page]").forEach((a) => {
    if (a.getAttribute("data-page") === current) {
      a.setAttribute("aria-current", "page");
    }
  });
}

function wireNavToggle() {
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }
}

function wireEnquiryForm() {
  var form = document.getElementById("enquiryForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var org = form.org.value.trim();
    var email = form.email.value.trim();
    var phone = form.phone.value.trim();
    var message = form.message.value.trim();
    var interests = Array.from(form.querySelectorAll('input[name="interest"]:checked'))
      .map(function (i) { return i.value; })
      .join(", ");

    var subject = "Enquiry from " + name + (org ? " (" + org + ")" : "");
    var bodyLines = [
      "Name: " + name,
      "Organisation: " + org,
      "Email: " + email,
      "Contact Number: " + phone,
      "Interested in: " + (interests || "Not specified"),
      "",
      "Message:",
      message
    ];
    var body = bodyLines.join("\n");

    var mailto = "mailto:info@thespeakingfactory.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    window.location.href = mailto;
  });
}

document.addEventListener("DOMContentLoaded", function () {
  includePartials().then(function () {
    markActiveNavLink();
    wireNavToggle();
    wireEnquiryForm();
  });
});
