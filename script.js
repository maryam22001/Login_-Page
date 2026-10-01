document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".switcher__tab");
  const indicator = document.querySelector(".switcher__indicator");
  const status = document.getElementById("form-status");

  const forms = {
    login: document.getElementById("login-form"),
    signup: document.getElementById("signup-form"),
  };

  function activate(target) {
    tabs.forEach((tab) => {
      const isActive = tab.dataset.target === target;
      tab.classList.toggle("is-active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    Object.entries(forms).forEach(([key, form]) => {
      form.classList.toggle("is-active", key === target);
    });

    const activeTab = document.querySelector(
      `.switcher__tab[data-target="${target}"]`
    );
    const index = Array.from(tabs).indexOf(activeTab);
    indicator.style.transform = `translateX(${index * -100}%)`;

    status.textContent = "";
  }

  // Any element with data-target switches the active form (tabs + inline links)
  document.querySelectorAll("[data-target]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      activate(el.dataset.target);
    });
  });

  // Demo-only submit handling (no backend wired up)
  forms.login.addEventListener("submit", (e) => {
    e.preventDefault();
    status.textContent = "تم تسجيل الدخول بنجاح (تجريبي).";
  });

  forms.signup.addEventListener("submit", (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    if (password.length < 8) {
      status.textContent = "كلمة المرور يجب ألا تقل عن 8 أحرف.";
      return;
    }

    status.textContent = "تم إنشاء الحساب بنجاح (تجريبي).";
  });

  activate("login");
});
