// The Speaking Factory — small interaction layer.
// Mobile nav toggle + mailto-based enquiry form (no backend needed for GitHub Pages).

document.addEventListener("DOMContentLoaded", function () {
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

  var form = document.getElementById("enquiryForm");
  if (form) {
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
});
